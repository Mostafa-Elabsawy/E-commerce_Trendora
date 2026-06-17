import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/components/footer/footer/footer.component';
import { HeaderComponent } from '../../../shared/components/header/header/header.component';

@Component({
  selector: 'app-contact',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {}
