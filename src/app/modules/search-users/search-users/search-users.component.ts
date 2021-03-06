import { IUser } from './../../../models/users';
import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, OnDestroy, AfterContentInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import { User } from '../../../models/users';
import { GetUsersService } from '../services/get-users.service';
import { FilterUsersService } from '../services/filter-users.service';
import { Subscription } from 'rxjs/Subscription';
import { SearchStorageService } from '../services/search-storage.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss']
})
export class SearchUsersComponent implements OnInit, AfterViewInit, OnDestroy, AfterContentInit {

  subscription: Subscription;

  displayProp: string = 'FullName';

  excludeProp: string = 'Title';

  @ViewChild('searchinput') searchinput: MatInput;

  @ViewChild(MatAutocompleteTrigger) triggerAutoCompletePanel: MatAutocompleteTrigger;

  usersControl: FormControl = new FormControl(null, { validators: [Validators.required] });

  filteredOptions: Array<User | string>;

  panelOptionsResults: Array<User> = [];

  favoriteUsers: Array<User> = [];

  selectedUser: User;

  constructor(private getUsersService: GetUsersService,
    private sharedService: SharedService,
    private searchStorageService: SearchStorageService,
    private filterUsersService: FilterUsersService, public dialog: MatDialog,
    private ref: ChangeDetectorRef) {
  };

  ngOnInit() { };

  ngOnDestroy(): void { this.subscription.unsubscribe(); };

  ngAfterContentInit(): void { };

  ngAfterViewInit(): void {
    this.getUsers();
    this.filteredUsers();
  };

  submit(adduser?: boolean) {

    if (this.usersControl.valid) {

      if (this.usersControl.value.hasOwnProperty(this.displayProp)) {
        this.selectedUser = this.usersControl.value;

        this.sharedService.setSelectedUser(this.selectedUser);
        this.sharedService.isActive$.next(true);

        if (!this.selectedUser.IsSelected) {
          this.selectedUser.IsSelected = true;
          this.searchStorageService.set_SelectedUser_Storage(this.selectedUser);
          this.ref.detectChanges();
        }
      } else { this.openDialog(); }
      this.ref.detectChanges();
    }
    else { this.openDialog(); }
  };

  showPanelSearchOptions() {
    this.triggerAutoCompletePanel.openPanel();
    this.filteredOptions = this.panelOptionsResults;
    this.ref.detectChanges();
  };

  filteredUsers() {
    this.subscription = this.usersControl.valueChanges.subscribe((val) => {
      let usersList: Array<User> = [];

      if (val[this.displayProp] !== undefined) {
        this.searchinput['nativeElement'].value = val[this.displayProp];
        usersList = this.filterUsersService.filterUsersListByProps(val[this.displayProp], this.panelOptionsResults, this.excludeProp);
        this.filteredOptions = usersList;
        this.ref.detectChanges();
      }
      else {
        this.searchinput['nativeElement'].value = val;
        usersList = this.filterUsersService.filterUsersListByProps(val, this.panelOptionsResults, this.excludeProp);
        this.filteredOptions = usersList;
        this.ref.detectChanges();
      }
    });
    // this.usersControl.statusChanges.subscribe((data) => {
    //   console.log(data);
    // });
  };

  setSelectedUsers() {
    this.subscription = this.searchStorageService.list$.subscribe((savedlist) => {
      this._resetSelectedUI();
      this._setSelectedUI();
      this._orderSelectedUI();
    });
  };

  _resetSelectedUI() {
    this.panelOptionsResults.map(item => item.IsSelected = false);
  };

  _setSelectedUI() {
    this.searchStorageService.listMap.forEach((option) => {
      this.panelOptionsResults.map((item) => {
        if (option.FullName === item.FullName) { item.IsSelected = true; return item; }
      });
    });
    this.ref.detectChanges();
  };

  _orderSelectedUI() {
    this.panelOptionsResults.sort((a, b) => { return (a.IsSelected > b.IsSelected) ? -1 : 1; });
    this.ref.detectChanges();
  };

  getUsers(): void {
    this.subscription = this.getUsersService.getUsers().subscribe((users: [User]) => {
      this.filteredOptions = users;
      this.panelOptionsResults = users;
      this.setSelectedUsers();
      this.ref.detectChanges();
    });
  };

  openDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        title: 'Please select user from the list'
      }
    });
    this.sharedService.isActive$.next(false);
  };



}
