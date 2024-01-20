export const showList = (todos) =>
  `Your to-do list: \n\n${todos.map((todo) => (todo.isCompleted ? '✅' : '◻') + ' ' + todo.name + '\n\n').join('')}`;
