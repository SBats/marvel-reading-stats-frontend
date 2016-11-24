import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'mrs-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  @Input() links: any[];
}
