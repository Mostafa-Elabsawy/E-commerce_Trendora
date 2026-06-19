import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-admin-main',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent,NavbarComponent],
  templateUrl: './admin-main.component.html',
})
export class AdminMainComponent {
  isSidebarOpen = signal<boolean>(true);

  toggleSidebar() {
    this.isSidebarOpen.update(curr => !curr);
  }
}