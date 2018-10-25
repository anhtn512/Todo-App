import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Todo } from './todo';
import { TodoUser } from './todouser';
@Injectable({
  providedIn: 'root'
})

export class FirebaseDataService {

  private user: Observable<firebase.User>;
  userDetails: firebase.User = null;
  todoUserObs: Observable<TodoUser>;
  todoUser: TodoUser;
  constructor(private _firebaseAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.setKeepSession();
          this.userDetails = user;
          console.log(this.userDetails);
          this.afs.collection('todoapp', ref => ref.where('uid', '==', this.userDetails.uid)).snapshotChanges().subscribe(
            res => {
              if (!(res.length > 0)) {
                const newUser = this.afs.doc<TodoUser>(`todoapp/${this.userDetails.uid}`);
                const data: TodoUser = {
                  uid: this.userDetails.uid,
                  email: this.userDetails.email,
                  todos: []
                };
                newUser.set(data);
              }
            }
          );
        } else {
          this.userDetails = null;
        }
      }
    );
    this.todoUserObs = this._firebaseAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afs.doc<TodoUser>(`todoapp/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }));
    this.todoUserObs.subscribe(
      (updateTodoUser) => {
        this.todoUser = updateTodoUser;
      }
    );
  }

  setKeepSession() {
    localStorage.setItem('auth', 'true');
  }

  uhsetKeepSession() {
    localStorage.removeItem('auth');
  }

  checkKeepSession() {
    let check = (localStorage.getItem('auth') === 'true');
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  isLoggedIn() {
    if (this.userDetails == null ) {
      return false;
    } else {
      return true;
    }
  }
  logout() {
    this._firebaseAuth.auth.signOut();
  }



  addTodo(todo: Todo): void {
    if (!todo.id) {
      todo.id = new Date().getTime();
    }
    this.todoUser.todos.push(todo);
    this.afs.doc<TodoUser>(`todoapp/${this.userDetails.uid}`).update(this.todoUser);
  }

  deleteTodo(id: number): void {
    this.todoUser.todos = this.todoUser.todos.filter(todo => todo.id !== id);
    this.afs.doc<TodoUser>(`todoapp/${this.userDetails.uid}`).update(this.todoUser);
  }

  deleteTodoComplete(): void {
    this.todoUser.todos = this.todoUser.todos.filter(todo => !todo.complete);
    this.afs.doc<TodoUser>(`todoapp/${this.userDetails.uid}`).update(this.todoUser);
  }

  getTodoById(id: number): Todo {
    return this.todoUser.todos.filter(todo => todo.id === id).pop();
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
    return this.todoUser.todos;
  }

  toggleTodoComplete(todo: Todo): Todo {
    let updateTodo = this.updateTodoById(todo, {
      complete: !todo.complete
    });
    this.afs.doc<TodoUser>(`todoapp/${this.userDetails.uid}`).update(this.todoUser);
    return updateTodo;
  }

}
