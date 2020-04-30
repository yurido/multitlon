import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SprintService} from '../services/sprint.service';
import {SprintExercises} from '../models/sprintExercises';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {SprintCalendar} from '../models/sprintCalendar';
import {Router} from '@angular/router';
import {Exercise} from '../models/exercise';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SprintComponent implements OnInit {
  sprintExercises: SprintExercises[];
  faChevronLeft = faChevronLeft;
  faPlus = faPlus;
  faChevronRight = faChevronRight;
  error: any;
  loading: boolean;
  month: string;

  constructor(private sprintService: SprintService, private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.getExcercisesForCurrentSprint();
  }

  getExcercisesForCurrentSprint(): void {
    this.sprintService.getCurrentSprint()
      .subscribe(data => {
          const sprintCalendar = new SprintCalendar().deserialize(data);
          this.sprintExercises = this.sprintService.sortSprintExercisesByDate(sprintCalendar.getSprintExercises());
          this.loading = false;
          const monthN = new Date(this.sprintExercises[0].getSprintDay().getSprintDate()).getMonth();
          this.month = environment.MONTHS.find(value => value.id === monthN).name;
        },
        error => {
          console.log('error here ', error);
          this.loading = false;
          this.error = error;
        });
  }

  addExercise(): void {
  }

  openExercise(exercise: Exercise): void {
    this.router.navigate(['/sprint/exercise'], {state: {data: exercise}});
  }

  goBack(): void {
    this.router.navigate(['/main']);
  }

  getExName(sid: string): string {
    return environment.EXERCISES.find(value => value.sid === sid).name;
  }

  getExItem(sid: string): string {
    return environment.EXERCISES.find(value => value.sid === sid).item;
  }

  calcDayColor(isDayOff: boolean): string {
    return isDayOff ? 'sprint-day-dayoff' : 'sprint-day-training';
  }

}
