import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { User, IUser } from '../../models/users';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, AfterViewInit, OnDestroy {

  subscription: Subscription;

  isActive: boolean = false;

  user: User;

  constructor(private sharedService: SharedService, private ref: ChangeDetectorRef) { }

  ngOnInit() { };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };

  ngAfterViewInit(): void {
    this.getUser$();
    this.isActive$();
  };

  getUser$() {
    this.subscription = this.sharedService.getSelectedUser().subscribe((user: User) => {
      console.log(user);
      this.user = user;
      this.ref.detectChanges();
    });
  };

  isActive$() {
    this.subscription = this.sharedService.isActive$.subscribe((state: boolean) => {
      this.isActive = state;
      this.ref.detectChanges();
    });
  };

}
