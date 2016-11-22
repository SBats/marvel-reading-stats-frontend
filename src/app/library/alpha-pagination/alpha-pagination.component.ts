import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'mrs-alpha-pagination',
  templateUrl: './alpha-pagination.component.html',
  styleUrls: ['./alpha-pagination.component.scss']
})
export class AlphaPaginationComponent {
  queryFiltersList: string[] = [
    '#', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q',
    'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ];
  @Input() current: string;
  @Output() select = new EventEmitter<any>();

  selectLetter(ev, letter) {
    ev.preventDefault();
    this.select.emit(letter);
  }

}
