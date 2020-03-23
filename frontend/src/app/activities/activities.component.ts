import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SprintService} from '../services/sprint.service';
import {SprintExercises} from '../models/sprintExercises';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {SprintCalendar} from '../models/sprintCalendar';
import {isUndefined} from 'util';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

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
  faSpinner = faSpinner;
  error: any;
  loaded: boolean;

  constructor(private sprintService: SprintService) {
  }

  ngOnInit() {
    this.getExcercisesForCurrentSprint();
    this.loaded = false;
  }

  getExcercisesForCurrentSprint(): void {
    this.sprintService.getCurrentSprint()
      .subscribe(data => {
        if (isUndefined(data)) {
          this.error = this.sprintService.getError();
          this.loaded = true;
          return;
        }

        const sprintCalendar = new SprintCalendar().deserialize(data);
        this.sprintExercises = this.sprintService.sortSprintExercisesByDate(sprintCalendar.getSprintExercises());
        this.loaded = true;
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
