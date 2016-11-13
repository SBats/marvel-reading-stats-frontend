import {
  Component,
  trigger,
  transition,
  style,
  state,
  animate
} from '@angular/core';

@Component({
  selector: 'mrs-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  showConnectionModal: boolean = false;

  showModal(): void {
    this.showConnectionModal = true;
  }

  hideModal(): void {
    this.showConnectionModal = false;
  }
}
