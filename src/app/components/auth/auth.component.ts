import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = false;
  isLoading: boolean = false;
  error: string = null;

  paramsSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.paramsSub = this.route.data.subscribe((data) => {
      this.isLoginMode = data.isLoginMode;
    });
  }

  onSubmit(form: NgForm) {
    console.log(form);
    let authObservable: Observable<any>;

    this.isLoading = true;

    authObservable = this.authService.signup(
      form.value.name,
      form.value.email,
      form.value.password
    );

    // TODO: enable navigation to /todos after signup
    authObservable.subscribe(
      (res) => {
        this.isLoading = false;
        this.router.navigate(['/todos']);
      },
      (errorMsg) => {
        this.isLoading = false;
        this.error = errorMsg;
      }
    );
  }
}
