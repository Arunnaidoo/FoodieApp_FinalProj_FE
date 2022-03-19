import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '../../model/restaurant';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent implements OnInit {
  ngOnInit(): void {}
  title = 'ImrestaurantOwnerNameUploaderFrontEnd';
  restaurant = new Restaurant();
  public selectedFile: any;
  public event1: any;
  imgURL: any;
  receivedImrestaurantOwnerNameData: any;
  base64Data: any;
  convertedImrestaurantOwnerName: any;
  registrationForm: FormGroup;
  constructor(private httpClient: HttpClient) {
    this.registrationForm = new FormGroup({
      customerEmail: new FormControl(),
      restaurantName: new FormControl(),
      restaurantOwnerName: new FormControl(),
      restaurantOwnerPhoneNumber: new FormControl(),
      typeOfRestaurant: new FormControl(),
      restaurantAddress: new FormGroup({
        city: new FormControl(),
        state: new FormControl(),
        pinCode: new FormControl(),
      }),
    });
  }
  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }

  register() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    const restaurantDetails = {
      customerEmail: this.registrationForm.get('customerEmail')?.value,
      restaurantName: this.registrationForm.get('restaurantName')?.value,
      restaurantOwnerName: this.registrationForm.get('restaurantOwnerName')
        ?.value,
      restaurantOwnerPhoneNumber: this.registrationForm.get(
        'restaurantOwnerPhoneNumber'
      )?.value,
      typeOfRestaurant: this.registrationForm.get('typeOfRestaurant')?.value,
      restaurantAddress: {
        city: this.registrationForm.get('city')?.value,
        state: this.registrationForm.get('state')?.value,
        pinCode: this.registrationForm.get('pinCode')?.value,
      },
    };
    const stringRestaurants = JSON.stringify(restaurantDetails);
    formData.append('restaurantDetails', stringRestaurants);
    this.httpClient
      .post(
        'http://localhost:8084/api/restaurant-register/send-request',
        formData
      )
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => console.log('Error Occured duringng saving: ' + err)
      );
  }
}
