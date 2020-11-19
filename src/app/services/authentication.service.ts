import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
// import users from '../../assets/data/users.json';
import { UserResponse } from '../models/user-response';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(credentials: User): Observable<UserResponse> {
    // codul comentat e pentru obiect local
    // let result: UserResponse = {
    //   id: -1,
    //   role: ""
    // };

    // users.users.forEach(element => {
    //   if (element.user == credentials.email && element.password == credentials.password) {
    //     result = {
    //       id: element.id,
    //       role: element.role
    //     };
    //   }
    // })
    // return of(result);

    //"trimitem" un obiect (credentials) de tip User pt verificarea datelor
    return this.http.post<UserResponse>('http://127.0.0.1:12345/login', credentials);
  }

  axio(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:12345/axio');
  }
}
