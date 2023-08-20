import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): { status: string } {
    Logger.log('Hello World!');

    return { status: 'ok' };
  }
}
