import { Module } from '@nestjs/common';
import { AppUpdate } from './app.update';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';
import { ConfigModule } from '@nestjs/config';
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
  controllers: [],
  providers: [AppService, AppUpdate]
})
export class AppModule {}
