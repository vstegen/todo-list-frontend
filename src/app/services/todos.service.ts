import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '../models/user';
import { Subject, Subscription, throwError } from 'rxjs';
import { Todo } from '../models/todo';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { exhaustMap, catchError, tap, take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  user: User;
  userSub: Subscription;

  todos: Todo[] = [];
  todosChanged = new Subject<Todo[]>();

  constructor(private authService: AuthService, private http: HttpClient) {
    this.userSub = this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }

  fetchTodos() {
    return this.http.get<any>(environment.apiUrl + '/todos').pipe(
      catchError(this.handleError),
      tap((todos) => {
        this.todos = todos.map((todo) => {
          return new Todo(todo.description, todo.finished, todo._id);
        });
        this.todosChanged.next(this.todos.slice());
      })
    );
  }

  addTodo(description: string, finished: boolean) {
    this.http
      .post<any>(environment.apiUrl + '/todos', {
        description,
        finished,
      })
      .pipe(
        catchError(this.handleError),
        tap((todo) => {
          const newTodo = new Todo(description, finished, todo._id);
          this.todos.push(newTodo);
          this.todosChanged.next(this.todos.slice());
        })
      )
      .subscribe();
  }

  toggleTodo(todo: Todo) {
    this.http
      .patch<any>(environment.apiUrl + `/todos/${todo.getId()}`, {
        finished: !todo.finished,
      })
      .pipe(
        catchError(this.handleError),
        tap((todo) => {
          this.todos.map((currTodo) => {
            if (currTodo.getId() !== todo._id) {
              return currTodo;
            }

            currTodo.finished = !currTodo.finished;
            return currTodo;
          });

          this.todosChanged.next(this.todos.slice());
        })
      )
      .subscribe();
  }

  removeTodo(todo: Todo) {
    this.http
      .delete<any>(environment.apiUrl + `/todos/${todo.getId()}`)
      .pipe(
        catchError(this.handleError),
        tap((todo) => {
          this.todos = this.todos.filter((currTodo) => {
            return currTodo.getId() !== todo._id;
          });
          this.todosChanged.next(this.todos.slice());
        })
      )
      .subscribe();
  }

  private handleError(err: HttpErrorResponse) {
    let errMsg = 'An unknown error occurred!';
    if (!err.error || !err.error.error) {
      return throwError(errMsg);
    }

    return throwError(err.error.error);
  }
}
