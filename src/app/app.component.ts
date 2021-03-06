import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { TodosService } from './services/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'todo-list-frontend';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogin();
  }
}
