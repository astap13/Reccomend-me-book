import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { fadeInAnimation } from '../animations/fade-in.animation';
import { GoogleBooksVolume } from '../models';
import { RecommendationService } from '../recommend/recommend.service';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.scss'],
  animations: [fadeInAnimation],
})
export class RecommendComponent implements OnInit {
  randomBook$!: Observable<GoogleBooksVolume>;

  loading$!: Observable<boolean>;

  constructor(private recommendationService: RecommendationService) {}

  ngOnInit(): void {
    this.fetchRandomBook();
  }

  fetchRandomBook() {
    this.randomBook$ = this.recommendationService.getRandomBook();
    this.loading$ = this.recommendationService.getLoadingStatus();
  }

  getRandomBook() {
    this.fetchRandomBook();
  }
}
