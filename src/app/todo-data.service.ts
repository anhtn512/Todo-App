import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  todos: Todo[];

  updateToLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  addTodo(todo: Todo): void {
    if (!todo.id) {
      todo.id = new Date().getTime();
    }
    this.todos.push(todo);
    this.updateToLocalStorage();
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.updateToLocalStorage();
  }

  deleteTodoComplete(): void {
    this.todos = this.todos.filter(todo => !todo.complete);
    this.updateToLocalStorage();
  }

  getTodoById(id: number): Todo {
    return this.todos.filter(todo => todo.id === id).pop();
  }

  updateTodoById(todo: Todo, value: Object = { }): Todo {
    let updateTodo = this.getTodoById(todo.id);
    if (!todo) {
      return null;
    }
    Object.assign(updateTodo, value);
    return updateTodo;
  }

  getAllTodos(): Todo[] {
    return this.todos;
  }

  toggleTodoComplete(todo: Todo): Todo {
    let updateTodo = this.updateTodoById(todo, {
      complete: !todo.complete
    });
    this.updateToLocalStorage();
    return updateTodo;
  }
  constructor() {
    let temp = JSON.parse(localStorage.getItem('todos'));
    if (temp != null) {
      this.todos = temp.map(item => new Todo(item));
      // console.log(temp.map(item => new Todo(item)));
    } else {
      this.todos = [];
    }
    window.addEventListener('storage', this.syncLocalstorage);
  }

  syncLocalstorage = (event: StorageEvent): void => {
    let temp = JSON.parse(localStorage.getItem('todos'));
    if (temp != null) {
      this.todos = temp.map(item => new Todo(item));
      // console.log(temp.map(item => new Todo(item)));
    } else {
      this.todos = [];
      this.updateToLocalStorage();
    }
  }
}
