import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { combineLatest, Observable, pipe } from 'rxjs';
import { map, startWith, tap, withLatestFrom } from 'rxjs/operators';
import { UsersService } from '../users.service';
import { FilterOption } from './filter-option.interface';
import { User } from './user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  usersList: Array<User>;
  filterUsers: FormControl;
  columnFilter: FormControl;
  filteredUsers: User[];

  formGroup: FormGroup;

  constructor(private usersService: UsersService, private formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({ filterUsers: [''], columnFilter: [''] });

    this.filterUsers = new FormControl('');
    this.columnFilter = new FormControl('');

    this.getUsers();
    this.formGroup.valueChanges.subscribe(selectedValue => {
      this.filteredUsers = this.usersList.filter(user => {
        let selectedOptionValue = selectedValue.columnFilter === undefined || selectedValue.columnFilter === "" ? "name" : selectedValue.columnFilter;
        let filteredTextValue = selectedValue.filterUsers === undefined || selectedValue.filterUsers === "" ? "" : selectedValue.filterUsers.toLowerCase();
        return user[selectedOptionValue].toLowerCase().includes(filteredTextValue);
      })
    })
  }

  ngOnInit(): void {

  }

  private getUsers(): void {
    this.usersService.getAllUsers().subscribe(
      data => { this.usersList = data; this.filteredUsers = this.usersList; }
    );
  }

  options: FilterOption[] = [
    {
      value: 'name',
      text: 'Name'
    },
    {
      value: 'username',
      text: 'User Name'
    },
    {
      value: 'email',
      text: 'Email'
    },
    {
      value: 'phone',
      text: 'Phone'
    },
    {
      value: 'website',
      text: 'Website'
    }
  ];

}
