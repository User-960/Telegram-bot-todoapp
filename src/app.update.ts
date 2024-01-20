import { AppService } from './app.service';
import {
  Ctx,
  Hears,
  InjectBot,
  Message,
  On,
  Start,
  Update
} from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { actionButtons } from './app.buttons';
import { IContext } from './interfaces/contenxt.interface';
import { showList } from './utils/showList';

const todos = [
  { id: 1, name: 'Record a video', isCompleted: false },
  { id: 2, name: 'Go to airport at 3:00 pm', isCompleted: false },
  { id: 3, name: 'Visit museum in Paris', isCompleted: true }
];

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<IContext>,
    private readonly appService: AppService
  ) {}

  @Start()
  async startCommand(ctx: IContext) {
    await ctx.reply('Hi! Friend ✋');
    await ctx.reply('What do you want to do?', actionButtons());
  }

  @Hears('🗒 To-do list')
  async getList(ctx: IContext) {
    await ctx.reply(showList(todos));
  }

  @Hears('✅ Complete')
  async completeTask(ctx: IContext) {
    ctx.session.type = 'done';
    await ctx.reply('Write the task ID: ');
  }

  @Hears('✍ Edit')
  async editTask(ctx: IContext) {
    ctx.session.type = 'edit';
    await ctx.deleteMessage();
    await ctx.replyWithHTML(
      'Write the task ID and new name of task: \n\n' +
        'Format - <b>1 | New name</b>'
    );
  }

  @Hears('❌ Delete')
  async deleteTask(ctx: IContext) {
    ctx.session.type = 'remove';
    await ctx.reply('Write the task ID: ');
  }

  @On('text')
  async getMessage(@Message('text') message: string, @Ctx() ctx: IContext) {
    if (!ctx.session.type) return;

    if (ctx.session.type === 'done') {
      const todo = todos.find((todo) => todo.id === Number(message));

      if (!todo) {
        await ctx.deleteMessage();
        await ctx.reply('Task with this ID not found!');
        return;
      }

      todo.isCompleted = !todo.isCompleted;
      await ctx.reply(showList(todos));
    }

    if (ctx.session.type === 'edit') {
      const [taskId, newTaskName] = message.split(' | ');
      const todo = todos.find((todo) => todo.id === Number(taskId));

      if (!todo) {
        await ctx.deleteMessage();
        await ctx.reply('Task with this ID not found!');
        return;
      }

      todo.name = newTaskName;
      await ctx.reply(showList(todos));
    }

    if (ctx.session.type === 'remove') {
      const todo = todos.find((todo) => todo.id === Number(message));

      if (!todo) {
        await ctx.deleteMessage();
        await ctx.reply('Task with this ID not found!');
        return;
      }

      await ctx.reply(
        showList(todos.filter((todo) => todo.id !== Number(message)))
      );
    }
  }
}
