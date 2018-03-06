import { map } from 'rxjs/operators/map';
import { Injectable } from '@angular/core';
import { User } from '../../../models/users';

@Injectable()
export class SearchStorageService {

  listMap: Map<string, User> = new Map();

  constructor() {
    this.setStorage();
  };

  setStorage() {
    if (localStorage.length > 0) {
      const keys = Object.keys(localStorage);
      const items = keys.map(item => { this.listMap.set(item, JSON.parse(localStorage.getItem(item))); });
    }
  };

  setSelectedUserStore(selectedUser: User) {

    if (this.listMap.size < 5) {
      this._setInMemoryMap(selectedUser);
      localStorage.setItem(selectedUser.FullName, JSON.stringify(selectedUser))
    } else {
      const list: Array<User> = [];
      this.listMap.forEach(item => list.push(item));
      this.listMap.delete(list[0].FullName);
      this._setInMemoryMap(selectedUser);
      localStorage.clear();
      this.listMap.forEach(item => localStorage.setItem(item.FullName, JSON.stringify(item)));
    }

  };

  _setInMemoryMap(selectedUser: User) {
    this.listMap.set(selectedUser.FullName, selectedUser);
  };


}
