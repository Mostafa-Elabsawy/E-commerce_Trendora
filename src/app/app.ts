import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponentComponent } from "../core/layouts/login-component/login-component.component";

@Component({
  selector: 'app-root',
  imports: [ LoginComponentComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecommerce');
}
