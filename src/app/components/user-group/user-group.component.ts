import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { User } from '@models/user';
import { UserService } from '@services/user.service';

enum SortOrder {
  ascending,
  descending,
}

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {

  @ViewChild('groupImg') groupImg!: ElementRef<HTMLImageElement>;

  users: User[];
  sortOrder = SortOrder;

  constructor(
    private userService: UserService,
    private renderer: Renderer2,
  ) {
    this.users = [];
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (users) => this.users = users,
    );
  }

  displayGroupImage(
    uploadElement: HTMLInputElement,
  ) {
    if (uploadElement.files) {
      const file = uploadElement.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const src = event.target?.result;
        if (typeof src === 'string') {
          const groupImgElement = this.groupImg.nativeElement;
          this.renderer.setAttribute(groupImgElement, 'src', src);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  getUserSorter(
    ascending: boolean,
  ) {
    const multiplier = ascending ? 1 : -1;
    return (a: User, b: User) => {
      if (a.name > b.name) {
        return 1 * multiplier;
      } else if (a.name < b.name) {
        return -1 * multiplier;
      } else {
        return 0;
      }
    };
  }

  sortChanged(
    event: MatRadioChange,
  ) {
    let sorter = (_a: User, _b: User) => 0;
    if (event.value === SortOrder.ascending) {
      sorter = this.getUserSorter(true);
    } else if (event.value === SortOrder.descending) {
      sorter = this.getUserSorter(false);
    }
    this.users.sort(sorter);
  }
}
