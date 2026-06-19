import { Component } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { NewsLetterBoxComponent } from "../news-letter-box/news-letter-box.component";
@Component({
  selector: 'app-about',
  imports: [TitleComponent, NewsLetterBoxComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
}
