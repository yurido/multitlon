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
  @Input() disable: boolean;
  color: string;
  ariaWidth: number;

  constructor() {
  }

  ngOnInit(): void {
    this.calcColor();
  }

  calcClass(): string {
    if (this.disable) {
      return '';
    } else {
      this.calcColor();
    }
    return 'progress-bar ' + (this.striped ? 'progress-bar-striped ' : '') + this.color;
  }

  private calcColor(): void {
    if (this.percent <= 25) {
      this.color = 'bg-danger';
      this.ariaWidth = this.percent;
      if (this.percent < 10) {
        this.ariaWidth = 10;
      }
    } else if (this.percent > 25 && this.percent <= 50) {
      this.color = 'bg-warning';
      this.ariaWidth = this.percent;
    } else if (this.percent > 50 && this.percent <= 75) {
      this.color = 'bg-info';
      this.ariaWidth = this.percent;
    } else {
      this.color = 'bg-success';
      this.ariaWidth = this.percent;
      if (this.percent > 100) {
        this.ariaWidth = 100;
      }
    }
  }
}
