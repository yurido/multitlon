import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProgressBarComponent implements OnInit {
  @Input() percent: number;
  @Input() striped: boolean;
  color: string;

  constructor() {
  }

  ngOnInit(): void {
    if (this.percent <= 25) {
      this.color = 'bg-danger';
    } else if (this.percent > 25 && this.percent <= 50) {
      this.color = 'bg-warning';
    } else if (this.percent > 50 && this.percent <= 75) {
      this.color = 'bg-info';
    } else {
      this.color = 'bg-success';
    }
  }

  calcClass(): string {
    return 'progress-bar ' + (this.striped ? 'progress-bar-striped ' : '') + this.color;
  }

}
