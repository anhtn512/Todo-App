import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoDataService } from './todo-data.service';
import { ToastrService } from 'ngx-toastr';
import { ON_OFF_TASK_TRANSITION } from './animations/taskanimation';
import { FirebaseDataService } from './firebase-data.service';
import { TodoUser } from './todouser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ON_OFF_TASK_TRANSITION]
})
export class AppComponent implements OnInit {

  newTodo: Todo = new Todo();
  todoUser: TodoUser;
  constructor(private todoDataService: TodoDataService,
              private firebaseDataServie: FirebaseDataService,
              private toastr: ToastrService) {  }

  ngOnInit() {
    this.firebaseDataServie.todoUser.subscribe(
      (updateTodos2) => {
        this.todoUser = updateTodos2;
        console.log(updateTodos2);
      }
    );
  }

  addTodo() {
    this.newTodo.title = this.newTodo.title.trim();
    if (this.newTodo.title.length >= 3) {
      this.todoDataService.addTodo(this.newTodo);
      this.newTodo = new Todo();
      this.toastr.success('add task into Todo success!', 'Success', {
        timeOut: 3000
      });
    } else {
      this.toastr.warning('Title of task must be at least 3 characters long!', 'Warning', {
        timeOut: 3000
      });
    }

  }

  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo);
    this.toastr.info('Change state of task done!', 'Info', {
      timeOut: 3000
    });
    // console.log(this.todos);
  }

  removeTodo(todo) {
    this.todoDataService.deleteTodo(todo.id);
    this.toastr.error('Have been removed task!', 'Delete', {
      timeOut: 3000
    });
  }

  removeTodosComplete() {
    this.todoDataService.deleteTodoComplete();
    this.toastr.error('Have removed all completed tasks!', 'Delete', {
      timeOut: 3000
    });
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
