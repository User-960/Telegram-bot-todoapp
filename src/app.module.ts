import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';
import LocalSession from 'telegraf-session-local';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configurations from './configurations';

const sessions = new LocalSession({ database: 'session_db.json' });

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configurations] }),
    TelegrafModule.forRoot({
      middlewares: [sessions.middleware()],
      token: ''
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
