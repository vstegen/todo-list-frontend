import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodosService } from '../../services/todos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  todosSub: Subscription;
  fetchSub: Subscription;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    // this.todos.push(new Todo('finish project', false, '12345'));
    // this.todos.push(new Todo('finish CV', true, '54321'));
    this.todosSub = this.todosService.todosChanged.subscribe((todos) => {
      this.todos = todos;
    });
    this.fetchSub = this.todosService.fetchTodos().subscribe();
  }

  onRemove(todo: Todo) {
    this.todosService.removeTodo(todo);
  }

  onToggleCompletion(todo: Todo) {
    this.todosService.toggleTodo(todo);
  }

  onAdd(e) {
    this.todosService.addTodo(e.description, e.finished);
  }

  ngOnDestroy() {
    this.todosSub.unsubscribe();
    this.fetchSub.unsubscribe();
  }
}
