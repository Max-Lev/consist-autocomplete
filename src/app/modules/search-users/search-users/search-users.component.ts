import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import { User } from '../../../models/users';
import { GetUsersService } from '../services/get-users.service';
@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss']
})
export class SearchUsersComponent implements OnInit, AfterViewInit {

  @ViewChild('searchinput') searchinput: MatInput;

  @ViewChild(MatAutocompleteTrigger) triggerAutoCompletePanel: MatAutocompleteTrigger;

  usersControl: FormControl = new FormControl();

  // filteredOptions: Array<string>;
  filteredOptions: Array<User>;

  panelOptionsResults = [];

  constructor(private getUsersService: GetUsersService, private ref: ChangeDetectorRef) { };

  ngOnInit() { };

  ngAfterViewInit(): void {
    this.getUsers();
    //this.filteredUsers();
  };

  filteredUsers() {
    this.usersControl.valueChanges.subscribe((val) => {
      const usersList: Array<User> = this.filterUsersListByProps(val);
      // this.filteredOptions = usersList.map(item => item.FullName);
      this.filteredOptions = usersList.map(item => item);
      this.ref.detectChanges();
    });
  };

  filterUsersListByProps(val: string): Array<User> {
    let filteredUsers: User[] = [];
    this.panelOptionsResults.filter((item) => {

      const keys = Object.keys(item);
      return keys.find((key) => {
        if (item[key].toLowerCase().indexOf(val.toLocaleLowerCase()) === 0) {
          // if (item[key].toLowerCase().indexOf(val[0].toLocaleLowerCase()) === 0) {
          // debugger;
          console.log(item);
          filteredUsers.push(item);
          return item;
        }
      });
    });
    return filteredUsers;
  };

  selectedOption(option: User) {
    debugger;
    console.log(option);
    this.usersControl.setValue(option.FullName);
    this.triggerAutoCompletePanel.openPanel();
  };

  getUsers(): void {
    this.getUsersService.getUsers().subscribe((users: [User]) => {
      // this.filteredOptions = users.map(item => item.FullName);
      this.filteredOptions = users.map(item => item);
      this.panelOptionsResults = users;
      this.ref.detectChanges();
    });
  };




}
