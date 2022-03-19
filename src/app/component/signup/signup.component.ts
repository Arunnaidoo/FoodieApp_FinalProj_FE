import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  registrationForm: FormGroup;
  user = new User();
  msg = '';
  selectedFile: any;
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.registrationForm = fb.group(
      {
        customerName: ['', Validators.required],
        emailId: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        phoneNo: [''],
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
    const userDetails = {
      customerName: this.registrationForm.get('customerName')?.value,
      emailId: this.registrationForm.get('emailId')?.value,
      password: this.registrationForm.get('password')?.value,
      phoneNo: this.registrationForm.get('phoneNo')?.value,
    };

    const stringUser = JSON.stringify(userDetails);
    formData.append('customerFile', stringUser);
    this.httpClient
      .post('http://localhost:8081/api/user/register', formData)
      .subscribe(
        (res) => {
          console.log(res);
          this.registered();
        },
        (err) => console.log('Error Occured duringng saving: ' + err)
      );
  }
  registered() {
    const formData = new FormData();
    formData.append('emailId', this.registrationForm.get('emailId')?.value);
    formData.append('roles', 'ROLE_USER');
    this.httpClient
      .post('http://localhost:8081/api/user/role/add-to-customer', formData)
      .subscribe((data) => {
        console.log(data);
      });
  }
  ngOnInit(): void {}
}
