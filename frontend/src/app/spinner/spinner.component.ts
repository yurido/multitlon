import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent implements OnInit {
  @Input() loading: boolean;
  faSpinner = faSpinner;

  constructor() { }

  ngOnInit(): void {
  }

}
