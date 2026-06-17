import { Component } from '@angular/core';
import { TitleComponent } from '../title/title.component';
@Component({
  selector: 'app-about',
  imports: [TitleComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {}
