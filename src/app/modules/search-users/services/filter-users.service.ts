import { Injectable } from '@angular/core';
import { User } from '../../../models/users';

@Injectable()
export class FilterUsersService {

  constructor() { };

  filterUsersListByProps(searchVal: string, searchList: Array<any>, excludeProp: string): Array<User> {
    let filteredUsers: User[] = [];
    searchList.filter((item) => {
      const keys = Object.keys(item).filter(prop => prop !== excludeProp);;
      keys.find((key) => {
        if (item[key].toLowerCase().indexOf(searchVal.toLocaleLowerCase()) === 0) {
          filteredUsers.push(item);
          return item;
        }
      });
    });
    return filteredUsers;
  };


  setPanelDisplayProp(users: Array<User>, prop: string): Array<string> {
    return users.map(item => item[prop]);
  };

}
