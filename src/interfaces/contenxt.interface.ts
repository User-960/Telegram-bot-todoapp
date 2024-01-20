import { Context as ContextTelegraf } from 'telegraf';

export interface IContext extends ContextTelegraf {
  session: {
    type?: 'done' | 'edit' | 'remove' | 'create';
  };
}
