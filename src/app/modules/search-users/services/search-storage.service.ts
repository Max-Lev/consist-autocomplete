import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators/map';
import { Injectable } from '@angular/core';
import { User } from '../../../models/users';

@Injectable()
export class SearchStorageService {

  listMap: Map<string, User> = new Map();

  list$: Subject<User> = new Subject();

  constructor() {
    this.get_LocalStorage();
  };

  get_LocalStorage() {
    if (localStorage.length > 0) {
      const keys = Object.keys(localStorage);
      keys.map(item => { this.listMap.set(item, JSON.parse(localStorage.getItem(item))); });
      setTimeout(() => { this.listMap.forEach(item => this.list$.next(item)); }, 1000);
    }
  };

  set_SelectedUser_Storage(selectedUser: User) {

    if (this.listMap.size < 5) {
      this._setInMemoryMap(selectedUser);
      localStorage.setItem(selectedUser.FullName, JSON.stringify(selectedUser))
    } else {
      const list: Array<User> = [];
      this.listMap.forEach(item => list.push(item));
      list[0].IsSelected = false;
      this.listMap.delete(list[0].FullName);
      this._setInMemoryMap(selectedUser);
      localStorage.clear();
      this.listMap.forEach(item => localStorage.setItem(item.FullName, JSON.stringify(item)));
      this.list$.next(selectedUser);
    }

  };

  _setInMemoryMap(selectedUser: User) {
    this.listMap.set(selectedUser.FullName, selectedUser);
  };


}
