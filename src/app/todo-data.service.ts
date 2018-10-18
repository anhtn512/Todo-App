import { Injectable } from '@angular/core';
import { TodoComponent } from './todo/todo.component';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  lastId: number = 0;

  todos: TodoComponent[] = [];

  addTodo(todo: TodoComponent): TodoDataService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
  }

  deleteTodo(id: number): TodoDataService {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  getTodoById(id: number): TodoComponent {
    return this.todos.filter(todo => todo.id === id).pop();
  }
  updateTodoById(id: number, value: Object = { }): TodoComponent {
    let todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, value);
  }

  getAllTodos(): TodoComponent[] {
    return this.todos;
  }

  toggleTodoComplete(todo: TodoComponent): TodoComponent {
    let updateTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    return updateTodo;
  }
  constructor() { }
}
