import { Component } from '@angular/core';
import { TitleComponent } from "../title/title.component";
import { NewsLetterBoxComponent } from "../news-letter-box/news-letter-box.component";
@Component({
  selector: 'app-contact',
  imports: [TitleComponent, NewsLetterBoxComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {}
