import { AppService } from './app.service';
import { Hears, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { actionButtons } from './app.buttons';

const todos = [
  { id: 1, name: 'Record a video', isCompleted: false },
  { id: 2, name: 'Go to airport at 3:00 pm', isCompleted: false },
  { id: 3, name: 'Visit museum in Paris', isCompleted: true }
];

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: AppService
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Hi! Friend ✋');
    await ctx.reply('What do you want to do?', actionButtons());
  }

  @Hears('🗒 To-do list')
  async getAll(ctx: Context) {
    await ctx.reply(
      `Your to-do list: \n\n${todos.map((todo) => (todo.isCompleted ? '✅' : '◻') + ' ' + todo.name + '\n\n').join('')}`
    );
  }
}
