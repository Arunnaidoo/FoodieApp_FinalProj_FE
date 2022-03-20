import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersUrl: string;
  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:9000/api/user';
  }

  public registerUser(user: FormData): Observable<User> {
    return this.http.post<User>(this.usersUrl + '/register', user);
  }
  public addRoleToUser(user: FormData): Observable<User> {
    return this.http.post<User>(this.usersUrl + '/role/add-to-customer', user);
  }
  public loginUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl + '/login', user);
  }
}
