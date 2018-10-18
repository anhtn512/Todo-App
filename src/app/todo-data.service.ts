import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  lastId: number;

  todos: Todo[] = [];

  addTodo(todo: Todo): void {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  getTodoById(id: number): Todo {
    return this.todos.filter(todo => todo.id === id).pop();
  }
  updateTodoById(id: number, value: Object = { }): Todo {
    let todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, value);
  }

  getAllTodos(): Todo[] {
    return this.todos;
  }

  toggleTodoComplete(todo: Todo): Todo {
    let updateTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    return updateTodo;
  }
  constructor() {
    this.lastId = 0;
  }
}
