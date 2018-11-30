import { Component, OnInit } from '@angular/core';
import {HeloMultitlonService} from "../services/helo-multitlon.service";
import {Saying} from "../api/saying";

@Component({
  selector: 'app-saying',
  templateUrl: './saying.component.html',
  styleUrls: ['./saying.component.css']
})
export class SayingComponent implements OnInit {
  sayings: Saying[];

  constructor(private helloService: HeloMultitlonService) { }

  ngOnInit() {
    this.getSaying();
  }

  getSaying(): void {
    this.helloService.getSayings().subscribe(sayings => this.sayings = sayings);
  }

}
