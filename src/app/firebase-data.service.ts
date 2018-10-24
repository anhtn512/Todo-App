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

  todoCol: AngularFirestoreCollection<Todo>;
  todoUser: Observable<TodoUser>;
  constructor(private _firebaseAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          console.log(this.userDetails);
          this.afs.collection('todoapp', ref => ref.where('email', '==', this.userDetails.email)).snapshotChanges().subscribe(
            res => {
              if (!(res.length > 0)) {
                const newUser = this.afs.doc<TodoUser>(`todoapp/${this.userDetails.email}`);
                const data: TodoUser = {
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
    this.todoUser = this._firebaseAuth.authState.pipe(switchMap(user => {
      if (user) {
        this.userDetails = user;
        return this.afs.doc<TodoUser>(`todoapp/${user.email}`).valueChanges();
      } else {
        return of(null);
      }
    }));
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

}
