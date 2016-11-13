import {
  Component,
  Output,
  EventEmitter,
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/core';

@Component({
  selector: 'mrs-connection-modal',
  templateUrl: './connection-modal.component.html',
  styleUrls: ['./connection-modal.component.scss'],
  host: {
    '[@componentAnimation]': 'true'
  },
  animations: [
    trigger('componentAnimation', [
      state('*', style({
        opacity: 1
      })),
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate('300ms ease-out')
      ]),
      transition('* => void', animate('300ms ease-out', 
        style({
          opacity: 0
        })
      ))
    ]),
    trigger('modalAnimation', [
      state('*', style({
        opacity: 1
      })),
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate('300ms 300ms ease-out')
      ])
    ])
  ]
})
export class ConnectionModalComponent {
  @Output() close = new EventEmitter<any>();

  onClose() {
    this.close.emit();
  }
}
