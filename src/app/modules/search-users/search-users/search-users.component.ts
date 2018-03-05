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

  // @ViewChild('auto') auto: MatAutocomplete;

  @ViewChild('searchinput') searchinput: MatInput;

  @ViewChild(MatAutocompleteTrigger) triggerAutoCompletePanel: MatAutocompleteTrigger;

  myControl: FormControl = new FormControl();

  // filteredOptions: Observable<string[]>;
  // filteredOptions: Observable<User[] | string[]>;
  filteredOptions: Array<User> | Array<string> | Array<any>;
  // filteredOptions: Observable<Array<User> | Array<string> | Array<any>>;

  // option: Array<User> | Array<string> | Array<any> = [];

  options = [];

  constructor(private getUsersService: GetUsersService, private ref: ChangeDetectorRef) { };

  ngOnInit() {
    // this.filteredOptions = this.myControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(val => this.filter(val))
    //   );
    this.myControl.valueChanges.subscribe((val) => {
      const usersList: Array<User> | Array<string> | Array<any> = this.filter(val);
      this.filteredOptions = [...usersList].map(item => item.FullName);
      this.ref.detectChanges();
    });
  };

  ngAfterViewInit(): void {
    this.getUsers();
  };

  filter(val: string): Array<User> | Array<string> | Array<any> {
    let filteredUsers: User[] = [];
    this.options.filter((item) => {
      const keys = Object.keys(item);
      return keys.find((key) => {
        if (item[key].toLowerCase().indexOf(val.toLocaleLowerCase()) === 0) {
          console.log(item);
          filteredUsers.push(item);
          return item;
        }
      });
    });
    return filteredUsers;
  };


  getUsers(): void {
    this.getUsersService.getUsers().subscribe((users: [User]) => {
      this.filteredOptions = users.map(item => item.FullName);
      this.options = users;
      this.ref.detectChanges();
    });
  };




}
