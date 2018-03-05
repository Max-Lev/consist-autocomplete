
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { User, IUser } from '../../../models/users';
import { environment } from '../../../../environments/environment';

@Injectable()
export class GetUsersService {

  private api = environment.api

  constructor(private httpClient: HttpClient) { };

  getUsers(): Observable<Array<User>> {

    const result$: Subject<Array<User>> = new Subject();

    this.httpClient.get(this.api).catch(err => { throw new Error(err); }).subscribe((users: [IUser]) => {
      const userslist: Array<User> = users.map(user => new User(user));
      result$.next(userslist);
    });
    
    return result$;
  };

}
