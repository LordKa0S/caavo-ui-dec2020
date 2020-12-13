import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserGroupComponent } from './components/user-group/user-group.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'caavo-ui-dec2020';

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.openDialog();
  }

  openDialog(): void {
    this.dialog.open(UserGroupComponent, {
      width: '50%',
      height: '100%',
      disableClose: true,
    });
  }
}
