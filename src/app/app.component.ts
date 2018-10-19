import { Component } from '@angular/core';
import { Todo } from './todo';
import { TodoDataService } from './todo-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  newTodo: Todo = new Todo();

  constructor(private todoDataService: TodoDataService) {
  }

  addTodo() {
    this.newTodo.title = this.newTodo.title.trim();
    if (this.newTodo.title.length >= 3) {
      this.todoDataService.addTodo(this.newTodo);
      this.newTodo = new Todo();
    }
  }

  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo);
  }

  removeTodo(todo) {
    this.todoDataService.deleteTodo(todo.id);
  }

  removeTodosComplete() {
    this.todoDataService.deleteTodoComplete();
  }

  get todos() {
    return this.todoDataService.getAllTodos();
  }

  get todosComplete() {
    return this.todos.filter(todo => todo.complete);
  }

  get todosIncomplete() {
    return this.todos.filter(todo => !todo.complete);
  }
}
