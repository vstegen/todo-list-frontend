import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input('todo') todo: Todo;
  @Output() onToggleCompletion = new EventEmitter<Todo>();
  @Output() onRemove = new EventEmitter<Todo>();

  constructor() {}

  ngOnInit(): void {}

  onToggleTodoCompletion(todo: Todo) {
    this.onToggleCompletion.emit(todo);
  }

  onRemoveTodo(todo: Todo) {
    this.onRemove.emit(todo);
  }
}
