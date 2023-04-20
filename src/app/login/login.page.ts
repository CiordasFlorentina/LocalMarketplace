import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  mode = 'Login';
  registerForm: FormGroup;
  loginForm: FormGroup;
  customerCheck = new FormControl(false);
  farmerCheck = new FormControl(false);

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      farmer: [null, Validators.required]
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  switchMode(mode: string) {
    this.mode = mode;
    this.registerForm.reset();
    this.loginForm.reset();
  }

  hasError(): boolean {
    const errors = this.registerForm.get('email')?.errors || {};
    return errors['email'];
  }

  check(box: string) {
    if (box === 'customer') {
      this.registerForm.get('farmer')?.setValue(this.customerCheck.value ? null : false);
      this.farmerCheck.setValue(false);
    } else {
      this.registerForm.get('farmer')?.setValue(this.farmerCheck.value ? null : true);
      this.customerCheck.setValue(false);
    }

  }

  login() {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .pipe(first())
      .subscribe((user: User) => {
        this.authService.setUser(user);
        this.navigate(user.farmer);
        this.registerForm.reset();
        this.loginForm.reset();
      });
  }

  register() {
    this.authService.register({
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      farmer: this.registerForm.value.farmer,
    })
      .pipe(first())
      .subscribe((user: User) => {
        this.authService.setUser(user);
        this.navigate(user.farmer);
        this.registerForm.reset();
        this.loginForm.reset();
      });
  }

  private navigate(farmer: boolean): void {
    farmer ? this.router.navigate(['/farmer-products']) : this.router.navigate(['/products']);
  }
}
