import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { LatestCollectionsComponent } from '../latestCollections/latest-collections/latest-collections.component';
import { BestSellersComponent } from "../best-sellers/best-sellers.component";
import { OurPolicyComponent } from "../our-policy/our-policy.component";
import { NewsLetterBoxComponent } from "../news-letter-box/news-letter-box.component";

@Component({
  selector: 'app-home',
  imports: [HeroComponent, LatestCollectionsComponent, BestSellersComponent, OurPolicyComponent, NewsLetterBoxComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
