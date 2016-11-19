import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

import { UserService } from '../../core/services';

@Component({
  selector: 'mrs-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  form: FormGroup;
  username: AbstractControl;
  password: AbstractControl;
  errors: any = {
    username: null,
    password: null
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.form = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
  }

  onSubmit(): void {
    console.log(this.form.value);
    if (!this.form.valid) {
      this.validateFormControl('username');
      this.validateFormControl('password');
    } else {
      this.resetErrors();
      this.userService.login(this.form.value);
    }
  }

  resetErrors() {
    const keys = Object.keys(this.errors);
    keys.map(key => this.errors[key] = null);
  }

  validateFormControl(name: string) {
    const errors = this[name].errors;
    if (errors && errors['required']) {
      this.errors[name] = 'Field required';
    } else {
      this.errors[name] = null;
    }
  }

}
