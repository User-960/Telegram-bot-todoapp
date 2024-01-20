import { ITodo } from 'src/interfaces/todo.interface';

export const showList = (todos: ITodo[]) =>
  `Your to-do list: \n\n${todos.map((todo) => (todo.isCompleted ? '✅' : '◻') + ' ' + todo.name + '\n\n').join('')}`;
