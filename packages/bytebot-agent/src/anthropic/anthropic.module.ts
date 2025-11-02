import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AnthropicService } from './anthropic.service';
import { ClaudeCodeService } from './claude-code.service';

@Module({
  imports: [ConfigModule],
  providers: [AnthropicService, ClaudeCodeService],
  exports: [AnthropicService, ClaudeCodeService],
})
export class AnthropicModule {}
