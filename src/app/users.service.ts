import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from './users/user.interface';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users').pipe(
      map((data: User[]) => data  
    .map(user => ({ name: user.name, username: user.username, email: user.email, phone:user.phone,website:user.website || 'null' })))
    );  
  }

  

}
