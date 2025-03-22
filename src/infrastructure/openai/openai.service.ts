import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { ChatCompletionCreateParams } from 'openai/resources';
import {
  OpenAIJsonParseException,
  OpenAIRequestException,
} from './openai.exceptions';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;
  private defaultModel: string;
  private defaultResponseFormat: ChatCompletionCreateParams['response_format'];

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    const baseURL = this.configService.get<string>('OPENAI_BASE_URL');
    this.defaultModel = this.configService.get<string>('OPENAI_MODEL')!;
    this.defaultResponseFormat = { type: 'json_object' };

    this.openai = new OpenAI({ apiKey, baseURL });
  }

  async createChatCompletion<T>(
    prompt: string,
    params?: Pick<ChatCompletionCreateParams, 'response_format' | 'model'>,
  ) {
    const model = params?.model || this.defaultModel;
    const response_format =
      params?.response_format || this.defaultResponseFormat;

    try {
      const completion = await this.openai.chat.completions.create({
        model,
        response_format,
        messages: [{ role: 'user', content: prompt }],
      });

      if (!completion.choices[0].message.content) {
        console.error('Empty response content from OpenAI');
        throw new OpenAIRequestException('Empty response content from OpenAI');
      }

      try {
        const jsonResponse = JSON.parse(
          completion.choices[0].message.content,
        ) as T;
        return jsonResponse;
      } catch (jsonError) {
        console.error('Error parsing JSON response from OpenAI', jsonError);
        console.debug('Raw response from OpenAI (non-JSON):', completion);
        throw new OpenAIJsonParseException(
          'Error parsing JSON response from OpenAI',
          jsonError,
        );
      }
    } catch (error) {
      console.error('Error creating chat completion:', error);
      if (
        error instanceof OpenAIRequestException ||
        error instanceof OpenAIJsonParseException
      ) {
        throw error; // Re-throw the error for NestJS error handling
      } else {
        throw new OpenAIRequestException(
          'Error creating chat completion',
          error,
        );
      }
    }
  }
}
