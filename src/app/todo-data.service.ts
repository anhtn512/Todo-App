import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  lastId: number;

  todos: Todo[] = JSON.parse(localStorage.getItem('todos')) || [];

  updateToLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  addTodo(todo: Todo): void {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    this.updateToLocalStorage();
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.updateToLocalStorage();
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
    this.updateToLocalStorage();
  }

  getAllTodos(): Todo[] {
    return this.todos;
  }

  toggleTodoComplete(todo: Todo): Todo {
    let updateTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    this.updateToLocalStorage();
    return updateTodo;
  }
  constructor() {
    this.lastId = 0;
  }
}
