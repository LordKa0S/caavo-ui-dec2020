import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@models/user';
import { Observable } from 'rxjs';

const usersUrl = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(usersUrl);
  }
}
