import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { MarvelService } from '../../core';
import '../../rxjs-operators';

@Component({
  selector: 'mrs-comic-popup',
  templateUrl: './comic-popup.component.html',
  styleUrls: ['./comic-popup.component.scss']
})
export class ComicPopupComponent implements OnInit, OnDestroy {

  comic: any = null;
  loading: boolean = false;
  @Input() comicId: number;
  @Output() close: EventEmitter<any>;

  private subscribers: any[] = [false];

  constructor(
    private marvelService: MarvelService
  ) {
    this.close = new EventEmitter();
  }

  ngOnInit() {
    console.log(this.comicId);
    this.loadComic();
  }

  ngOnDestroy() {
    this.subscribers.map(sb => sb.unsubscribe());
  }

  closePopup(ev) {
    ev.preventDefault();
    this.close.emit();
  }

  loadComic() {
    this.loading = true;

    if (this.subscribers[0] && this.subscribers[0].unsubscribe) {
      this.subscribers[0].unsubscribe();
    }

    this.subscribers[0] = this.marvelService.getComicDetail(
      this.comicId
    ).subscribe((res: any[]) => {
      console.log(res);
      this.comic = res;
      this.loading = false;
    });
  }

}
