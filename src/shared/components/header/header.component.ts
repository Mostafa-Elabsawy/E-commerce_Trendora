import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MegaMenuComponent } from "../mega-menu/mega-menu.component";

@Component({
  selector: 'app-header',
  imports: [RouterLink, MegaMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
    isMenuOpen = false;
}
