import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SprintService} from '../services/sprint.service';
import {SprintExercises} from '../models/sprintExercises';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {SprintCalendar} from '../models/sprintCalendar';
import {isUndefined} from 'util';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ActivitiesComponent implements OnInit {
  sprintExercises: SprintExercises[];
  faChevronLeft = faChevronLeft;
  faPlus = faPlus;
  faChevronRight = faChevronRight;
  error: any;

  constructor(private sprintService: SprintService) {
  }

  ngOnInit() {
    this.getExcercisesForCurrentSprint();
  }

  getExcercisesForCurrentSprint(): void {
    this.sprintService.getCurrentSprint()
      .subscribe(data => {
        if (isUndefined(data)) {
          // TODO: check error!
          this.error = this.sprintService.getError();
          return;
        }

        const sprintCalendar = new SprintCalendar().deserialize(data);
        this.sprintExercises = this.sprintService.sortSprintExercisesByDate(sprintCalendar.getSprintExercises());
      });
  }

  addExercise(): void {
    console.log('add exercise click!');
  }

  openExercise(): void {
    console.log('open exercise click!');
  }

  goBack(): void {
    console.log('goBack click!');
  }
}
