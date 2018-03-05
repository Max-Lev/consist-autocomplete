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
export class SearchUsersComponent implements OnInit {

  // @ViewChild('auto') auto: MatAutocomplete;

  @ViewChild('searchinput') searchinput: MatInput;

  @ViewChild(MatAutocompleteTrigger) triggerAutoCompletePanel: MatAutocompleteTrigger;

  myControl: FormControl = new FormControl();

  filteredOptions: Array<User> = [];

  option: Array<User> = [];

  constructor(private getUsersService: GetUsersService, private ref: ChangeDetectorRef) { };

  ngOnInit(): void {

    //this.filteredOptions = 
    this.myControl.valueChanges.pipe(startWith(''), map((val) => {
      debugger;
      this.searchFilter(val)
    }));
  };

  ngAfterViewInit(): void {
    // this.searchDataChange();
    this.getUsers();
  };

  inputFocus() {

    // this.myControl.registerOnChange(() => { console.log('change'); });
    // this.myControl.statusChanges.subscribe((data) => { console.log(data); });
    this.triggerAutoCompletePanel.openPanel();
    this.ref.detectChanges();
  };

  getUsers() {
    this.getUsersService.getUsers().subscribe((users: [User]) => {
      console.log(users);
      this.filteredOptions = users;
      this.option = users;
      this.ref.detectChanges();
    });
  };

  // searchDataChange() {
  //   this.myControl.valueChanges.subscribe((data) => {
  //     console.log(data);
  //   });
  // };

  searchFilter(val: string): User[] {
    debugger;
    // const result = this.option.filter(option => option.FullName.toLowerCase().indexOf(val.toLowerCase()) === 0);
    const result = this.option.filter((option) => {
      debugger;
      option.FullName.toLowerCase().indexOf(val.toLowerCase()) === 0
    });
    debugger;
    return result;
  };
  // searchFilter(val: string): string[] {
  //   return this.options.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  // };


}
