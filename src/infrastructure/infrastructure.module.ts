import { Global, Module } from '@nestjs/common';
import { OpenAIModule } from './openai/openai.module';
import { OpenAIService } from './openai/openai.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

@Global()
@Module({
  imports: [PrismaModule, OpenAIModule],
  providers: [PrismaService, OpenAIService],
  exports: [PrismaService, OpenAIService],
})
export class InfrastructureModule {}
