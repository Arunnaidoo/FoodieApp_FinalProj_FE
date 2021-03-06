import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { LoginComponent } from '../login/login.component';
import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  registrationForm: FormGroup;
  user: User = new User();
  msg = '';
  selectedFile: any;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<SignupComponent>,
    private dialog: MatDialog
  ) {
    this.registrationForm = fb.group(
      {
        customerName: ['', Validators.required],
        emailId: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        phoneNo: [
          '',
          [
            Validators.required,
            Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          ],
        ],
        customerImage: ['', [Validators.required]],
      },
      {
        validator: ConfirmedValidator('password', 'confirmPassword'),
      }
    );
  }
  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }
  onSignUp() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.user.customerName = this.registrationForm.get('customerName')?.value;
    this.user.emailId = this.registrationForm.get('emailId')?.value;
    this.user.phoneNo = this.registrationForm.get('phoneNo')?.value;
    this.user.password = this.registrationForm.get('password')?.value;

    const userDetails = {
      customerName: this.user.customerName,
      emailId: this.user.emailId,
      password: this.user.password,
      phoneNo: this.user.phoneNo,
    };

    const stringUser = JSON.stringify(userDetails);
    formData.append('customerFile', stringUser);
    this.userService.registerUser(formData).subscribe(
      (data) => {
        console.log('Data stored successfully ' + data);
        this.registered();
        this.onClose();
        this.onLogIn();
      },
      (error) => {
        console.log('Error please check' + error);
      }
    );
  }
  registered() {
    const formData = new FormData();
    formData.append('emailId', this.registrationForm.get('emailId')?.value);
    formData.append('roles', 'ROLE_USER');
    this.userService.addRoleToUser(formData).subscribe((data) => {
      console.log(data);
    });
  }
  onClose() {
    this.dialogRef.close();
  }
  onLogIn() {
    const dialogCong = new MatDialogConfig();
    dialogCong.disableClose = true;
    dialogCong.autoFocus = true;
    dialogCong.width = '35%';
    this.dialog.open(LoginComponent, dialogCong);
  }
  ngOnInit(): void {}
}
