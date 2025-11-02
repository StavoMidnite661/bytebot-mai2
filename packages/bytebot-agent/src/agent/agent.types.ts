import { Message } from '@prisma/client';
import { MessageContentBlock } from '@bytebot/shared';

export interface BytebotAgentResponse {
  contentBlocks: MessageContentBlock[];
  tokenUsage: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
  };
  stopReason?: string | null;
}

export interface BytebotAgentService {
  generateMessage(
    systemPrompt: string,
    messages: Message[],
    model: string,
    useTools: boolean,
    signal?: AbortSignal,
  ): AsyncGenerator<BytebotAgentResponse>;
}

export interface BytebotAgentModel {
  provider: 'anthropic' | 'openai' | 'google' | 'proxy' | 'claude-code';
  name: string;
  title: string;
  contextWindow?: number;
}

export class BytebotAgentInterrupt extends Error {
  constructor() {
    super('BytebotAgentInterrupt');
    this.name = 'BytebotAgentInterrupt';
  }
}
