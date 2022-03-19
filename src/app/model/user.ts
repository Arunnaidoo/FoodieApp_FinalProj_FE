export class User {
  customerName: string;
  emailId: string;
  phoneNo: number;
  customerImage!: FormData;
  active: boolean = false;
  password: string;
  roles: string = '';
  constructor(
    customerName: string,
    emailId: string,
    phoneNo: number,
    password: string
  ) {
    this.customerName = customerName;
    this.emailId = emailId;
    this.phoneNo = phoneNo;
    this.password = password;
  }
}
