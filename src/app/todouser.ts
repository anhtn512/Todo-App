import { Todo } from './todo';

export interface TodoUser {
    uid: string;
    email: string;
    todos: Todo[];
}
