import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/components/footer/footer/footer.component';
import { HeaderComponent } from '../../../shared/components/header/header/header.component';

@Component({
  selector: 'app-about',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {}
