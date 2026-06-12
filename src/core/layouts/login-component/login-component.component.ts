import { Component } from '@angular/core';
import { HeaderComponent } from "../../../shared/components/header/header/header.component";
import { FooterComponent } from "../../../shared/components/footer/footer/footer.component";
import { HeroComponent } from '../../../features/hero/hero.component';

@Component({
  selector: 'app-login-component',
  imports: [HeaderComponent, FooterComponent,HeroComponent],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css',
})
export class LoginComponentComponent {}
