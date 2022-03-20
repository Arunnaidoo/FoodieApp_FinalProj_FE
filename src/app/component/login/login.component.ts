import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = new User();
  loginForm: FormGroup;
  ngOnInit(): void {}
  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private userService: UserService
  ) {
    this.loginForm = new FormGroup({
      emailId: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onLogIn() {
    (this.user.emailId = this.loginForm.get('emailId')?.value),
      (this.user.password = this.loginForm.get('password')?.value);
    this.userService.loginUser(this.user).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        err;
      }
    );
  }
  onClose() {
    this.dialogRef.close();
  }
}
