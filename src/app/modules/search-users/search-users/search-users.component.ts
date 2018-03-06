import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import { User } from '../../../models/users';
import { GetUsersService } from '../services/get-users.service';
import { FilterUsersService } from '../services/filter-users.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss']
})
export class SearchUsersComponent implements OnInit, AfterViewInit, OnDestroy {

  subscription: Subscription;

  displayProp: string = 'FullName';

  excludeProp: string = 'Title';

  @ViewChild('searchinput') searchinput: MatInput;

  @ViewChild(MatAutocompleteTrigger) triggerAutoCompletePanel: MatAutocompleteTrigger;

  usersControl: FormControl = new FormControl();

  filteredOptions: Array<string>;

  panelOptionsResults: Array<User> = [];

  constructor(private getUsersService: GetUsersService,
    private filterUsersService: FilterUsersService,
    private ref: ChangeDetectorRef) { };

  ngOnInit() {
    this.getUsers();
  };

  ngOnDestroy(): void { this.subscription.unsubscribe(); };

  ngAfterViewInit(): void {
    this.filteredUsers();
  };

  selectedOption(option: User) {
    console.log(option);
  };

  addUser() {

  };

  showPanelSearchOptions() {
    this.triggerAutoCompletePanel.openPanel();
    this.filteredOptions = this.filterUsersService.setPanelDisplayProp(this.panelOptionsResults, this.displayProp);
    this.ref.detectChanges();
  };

  filteredUsers() {
    this.subscription = this.usersControl.valueChanges.subscribe((val) => {
      const usersList: Array<User> = this.filterUsersService.filterUsersListByProps(val, this.panelOptionsResults, this.excludeProp);
      this.filteredOptions = this.filterUsersService.setPanelDisplayProp(usersList, this.displayProp);
      this.ref.detectChanges();
    });
  };

  getUsers(): void {
    this.subscription = this.getUsersService.getUsers().subscribe((users: [User]) => {
      this.filteredOptions = this.filterUsersService.setPanelDisplayProp(users, this.displayProp);
      this.panelOptionsResults = users;
      this.ref.detectChanges();
    });
  };




}
