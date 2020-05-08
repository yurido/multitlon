import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SprintService} from '../services/sprint.service';
import {SprintExercises} from '../models/sprint.exercises';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {SprintCalendar} from '../models/sprint.calendar';
import {Router} from '@angular/router';
import {Exercise} from '../models/exercise';
import {environment} from '../../environments/environment';
import {isDefined} from '@angular/compiler/src/util';
import {SprintExerciseStatisticCalendar} from '../models/sprint.exercise.statistic.calendar';
import {ExerciseStatistic} from '../models/exercise.statistic';

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
  sprintExerciseStatistic: ExerciseStatistic[];

  constructor(private sprintService: SprintService, private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    // TODO: redoing of cache
    /*
    if (isDefined(history.state.isDataChanged) && !history.state.isDataChanged) {
      this.loadExercisesFromCash();
      this.loadExerciseStatisticFromCache();
      // TODO: update day; reread exercise stratistics from backend!
      this.loading = false;
    } else {
      // TODO: update day; reread exercise stratistics from backend!
      this.getExcercises();
    } */

    this.getExcercises();
  }

  private getExcercises(): void {
    this.sprintService.getExercisesCurrentSprint('test')
      .subscribe(data => {
          const sprintCalendar = new SprintCalendar().deserialize(data);
          this.sprintExercises = this.sprintService.sortSprintExercisesByDate(sprintCalendar.getSprintExercises());
          const monthN = new Date(this.sprintExercises[0].getSprintDay().getSprintDate()).getMonth();
          const monthObj = environment.MONTHS.find(value => value.id === monthN);
          this.month = isDefined(monthObj) ? monthObj.name : '';
          this.sprintService.setSprintCache(this.sprintExercises);
          this.getStatistic();
        },
        error => {
          console.log('error here ', error);
          this.loading = false;
          this.error = error;
        });
  }

  private getStatistic(): void {
    this.sprintService.getExerciseStatisticsForCurrentSprint('test')
      .subscribe(data => {
          const sprintExerciseStatisticCalendar = new SprintExerciseStatisticCalendar().deserialize(data);
          this.sprintExerciseStatistic = sprintExerciseStatisticCalendar.getExerciseStatistic();
          this.sprintService.setSprintExerciseStatisticCache(this.sprintExerciseStatistic);
          this.loading = false;
        },
        error => {
          console.log('error here ', error);
          this.error = error;
          this.loading = false;
        });
  }

  addExercise(): void {
    // TODO: implement
  }

  openExercise(exercise: Exercise): void {
    const exerciseStatistic = this.sprintExerciseStatistic.find(ex => exercise.getSid() === ex.getSid());
    this.router.navigate(['/sprint/exercise'], {state: {ex: exercise, statistic: exerciseStatistic}});
  }

  goBack(): void {
    this.router.navigate(['/main']);
  }

  getExName(sid: string): string {
    const exerciseObj = environment.EXERCISES.find(value => value.sid === sid);
    return isDefined(exerciseObj) ? exerciseObj.name : '';
  }

  getExItem(sid: string): string {
    return environment.EXERCISES.find(value => value.sid === sid).item;
  }

  calcDayColor(isDayOff: boolean): string {
    return isDayOff ? 'sprint-day-dayoff' : 'sprint-day-training';
  }

  // TODO: redo!
  private loadExercisesFromCash(): void {
    this.sprintExercises = this.sprintService.getSprintCache();
    console.log('got sprint exercises from cache');
  }

  // TODO: redo!
  private loadExerciseStatisticFromCache(): void {
    this.sprintExerciseStatistic = this.sprintService.getSprintExerciseStatisticCache();
    console.log('got sprint exercise statistic from cache');
  }
}
