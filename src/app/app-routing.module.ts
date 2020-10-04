import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'signup',
    component: AuthComponent,
    data: {
      isLoginMode: false,
    },
  },
  {
    path: 'signin',
    component: AuthComponent,
    data: {
      isLoginMode: true,
    },
  },
  {
    path: 'todos',
    component: TodoListComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
