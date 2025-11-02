
import { Injectable, Logger } from '@nestjs/common';
import { query } from '@anthropic-ai/claude-code';
import {
  BytebotAgentModel,
  BytebotAgentService,
  BytebotAgentResponse,
} from '../agent/agent.types';
import { AGENT_SYSTEM_PROMPT } from '../agent/agent.constants';
import { Role } from '@prisma/client';
import {
  MessageContentBlock,
  MessageContentType,
  TextContentBlock,
  ToolUseContentBlock,
  ThinkingContentBlock,
  RedactedThinkingContentBlock,
} from '@bytebot/shared';
import Anthropic from '@anthropic-ai/sdk';

@Injectable()
export class ClaudeCodeService implements BytebotAgentService {
  private readonly logger = new Logger(ClaudeCodeService.name);
  private readonly BYTEBOT_DESKTOP_BASE_URL = process.env
    .BYTEBOT_DESKTOP_BASE_URL as string;

  constructor() {
    this.logger.log('ClaudeCodeService initialized');
  }

  private formatAnthropicResponse(
    content: Anthropic.ContentBlock[],
  ): MessageContentBlock[] {
    // filter out tool_use blocks that aren't computer tool uses
    content = content.filter(
      (block) =>
        block.type !== 'tool_use' || block.name.startsWith('mcp__desktop__'),
    );
    return content.map((block) => {
      switch (block.type) {
        case 'text':
          return {
            type: MessageContentType.Text,
            text: block.text,
          } as TextContentBlock;
        case 'tool_use':
          return {
            type: MessageContentType.ToolUse,
            id: block.id,
            name: block.name.replace('mcp__desktop__', ''),
            input: block.input,
          } as ToolUseContentBlock;
        case 'thinking':
          return {
            type: MessageContentType.Thinking,
            thinking: block.thinking,
            signature: block.signature,
          } as ThinkingContentBlock;
        case 'redacted_thinking':
          return {
            type: MessageContentType.RedactedThinking,
            data: block.data,
          } as RedactedThinkingContentBlock;
      }
    });
  }

  async *generateMessage(
    systemPrompt: string,
    messages: any[],
    model: string,
    useTools: boolean,
    abortSignal: AbortSignal,
  ): AsyncGenerator<BytebotAgentResponse> {
    const lastMessage = messages[messages.length - 1];

    for await (const message of query({
      prompt: lastMessage.content[0].text,
      options: {
        abortController: new AbortController(),
        appendSystemPrompt: AGENT_SYSTEM_PROMPT,
        permissionMode: 'bypassPermissions',
        mcpServers: {
          desktop: {
            type: 'sse',
            url: `${this.BYTEBOT_DESKTOP_BASE_URL}/mcp`,
          },
        },
      },
    })) {
      let messageContentBlocks: MessageContentBlock[] = [];
      let role: Role = Role.ASSISTANT;
      switch (message.type) {
        case 'user': {
          if (Array.isArray(message.message.content)) {
            messageContentBlocks = message.message.content as MessageContentBlock[];
          } else if (typeof message.message.content === 'string') {
            messageContentBlocks = [
              {
                type: MessageContentType.Text,
                text: message.message.content,
              } as TextContentBlock,
            ];
          }

          role = Role.USER;
          break;
        }
        case 'assistant': {
          messageContentBlocks = this.formatAnthropicResponse(
            message.message.content,
          );
          break;
        }
        case 'system':
          break;
        case 'result': {
            yield {
                contentBlocks: [],
                tokenUsage: {
                    inputTokens: 0,
                    outputTokens: 0,
                    totalTokens: 0,
                },
                stopReason: message.subtype,
            }
          break;
        }
      }

      if (messageContentBlocks.length > 0) {
        yield {
          contentBlocks: messageContentBlocks,
          tokenUsage: {
            inputTokens: 0,
            outputTokens: 0,
            totalTokens: 0,
          },
          stopReason: 'tool_use',
        };
      }
    }
  }
}
