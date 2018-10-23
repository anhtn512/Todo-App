import { Todo } from './todo';

export interface TodoUser {
    email: string;
    todos: Todo[];
}
