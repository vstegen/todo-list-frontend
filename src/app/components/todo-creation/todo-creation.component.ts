import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todo-creation',
  templateUrl: './todo-creation.component.html',
  styleUrls: ['./todo-creation.component.scss'],
})
export class TodoCreationComponent implements OnInit {
  todoDescription: string = '';
  @Output() onAdd = new EventEmitter<{
    description: string;
    finished: boolean;
  }>();

  constructor() {}

  ngOnInit(): void {}

  // TODO: connect to service to create todo in backend
  addTodo() {
    if (this.todoDescription === '') {
      return;
    }

    const todoInfo = {
      description: this.todoDescription,
      finished: false,
    };
    this.todoDescription = '';
    this.onAdd.emit(todoInfo);
  }
}
