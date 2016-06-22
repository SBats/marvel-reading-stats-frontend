import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../../shared';

@Component({
  selector: 'mrs-comics-list',
  template: require('./comics-list.component.html'),
  styles: [require('./comics-list.component.scss')]
})
export class ComicsList implements OnInit {
  comics: any[];

  constructor(public marvelService: MarvelService) {}

  ngOnInit(): void {
    this.marvelService.getComicsList()
      .subscribe((res: any) => {
        this.comics = res.results;
      });
  }
}
