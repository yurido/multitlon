import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
  title = 'multitlon';
  username: string;
  password: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login(): void {
    this.router.navigate(['/sprint']);
  }
}
