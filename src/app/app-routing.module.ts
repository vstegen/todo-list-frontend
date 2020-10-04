import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
