import { Injectable } from '@angular/core';
import { User, IUser } from '../models/users';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SharedService {

  user$: Subject<User> = new Subject();

  isActive$: Subject<boolean> = new Subject();

  constructor() { };

  setSelectedUser(user: User) {
    this.user$.next(user);
  };

  getSelectedUser(): Observable<User> {
    return this.user$;
  };

}
