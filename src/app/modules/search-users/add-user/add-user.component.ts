import { EventEmitter, Component, OnInit, Input, Output } from '@angular/core';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  @Input() title: string;

  @Input() type: string;

  @Output() add: EventEmitter<boolean> = new EventEmitter();

  constructor() { };

  ngOnInit() { };

  addUser() { this.add.emit(true); };

}
