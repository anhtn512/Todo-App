import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
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

  newTodo: Todo = <Todo>{title: '', complete: false};
  todoUser: TodoUser;

  constructor(public firebaseDataServie: FirebaseDataService,
              private toastr: ToastrService) {  }

  ngOnInit() {
    this.firebaseDataServie.todoUserObs.subscribe(
      (updateTodoUser) => {
        this.todoUser = updateTodoUser;
        console.log(this.todoUser);
      }
    );
  }

  addTodoForUser() {
    this.newTodo.title = this.newTodo.title.trim();
    if (this.newTodo.title.length >= 3) {
      this.firebaseDataServie.addTodo(this.newTodo);
      this.newTodo = <Todo>{title: '', complete: false};
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
    this.firebaseDataServie.toggleTodoComplete(todo);
    this.toastr.info('Change state of task done!', 'Info', {
      timeOut: 3000
    });
  }

  removeTodo(todo) {
    this.firebaseDataServie.deleteTodo(todo.id);
    this.toastr.error('Have been removed task!', 'Delete', {
      timeOut: 3000
    });
  }

  removeTodosComplete() {
    this.firebaseDataServie.deleteTodoComplete();
    this.toastr.error('Have removed all completed tasks!', 'Delete', {
      timeOut: 3000
    });
  }


  get todos() {
    if (this.todoUser) {
      return this.firebaseDataServie.getAllTodos();
    } else {
      return [];
    }

  }

  get todosComplete() {
    return this.todos.filter(todo => todo.complete);
  }

  get todosIncomplete() {
    return this.todos.filter(todo => !todo.complete);
  }
}
