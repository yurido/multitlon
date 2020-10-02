import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SprintService} from '../services/sprint.service';
import {SprintExercise} from '../models/sprint.exercise';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {Exercise} from '../models/exercise';
import {environment} from '../../environments/environment';
import {ExerciseStatistic} from '../models/exercise.statistic';
import {ExerciseMetadata} from '../models/exercise.metadata';
import {MultiTError} from '../models/multiterror';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SprintComponent implements OnInit {
  sprintExercises: SprintExercise[];
  faChevronLeft = faChevronLeft;
  faPlus = faPlus;
  faChevronRight = faChevronRight;
  loading: boolean;
  month: string;
  sprintExerciseStatistic: ExerciseStatistic[];
  exerciseConfig: ExerciseMetadata[];
  error: any;

  constructor(private sprintService: SprintService, private router: Router) {
  }

  ngOnInit() {
    this.loading = true;

    const metadata = this.sprintService.getExerciseMetadata();
    const exStatistic = this.sprintService.getExerciseStatisticsForCurrentSprint(this.sprintService.isSprintModified());

    forkJoin([metadata, exStatistic]).subscribe(
      result => {
        if(result[0] === undefined || result[1] === undefined) {
          this.handleError(new MultiTError('Some sprint data isn\'t loaded'));
          return;
        }
        this.exerciseConfig = result[0];
        this.sprintExerciseStatistic = result[1];
        this.loadExercises();
      },
        error => this.handleError(error)
    );
    const monthObj = environment.MONTHS.find(value => value.id === new Date().getMonth());
    this.month = (monthObj !== undefined && monthObj !== null) ? monthObj.name : '';
  }

  addExercise(): void {
    this.router.navigate(['/sprint/newExercise']);
  }

  openExercise(exercise: Exercise): void {
    this.sprintService.cacheExercise(exercise);
    this.router.navigate(['/sprint/editExercise']);
  }

  goBack(): void {
    // this.router.navigate(['/main']);
  }

  getExName(sid: string): string {
    const exerciseObj = this.exerciseConfig.find(value => value.getSid() === sid);
    return (exerciseObj !== undefined && exerciseObj !== null) ? exerciseObj.getName() : '';
  }

  getExItem(sid: string): string {
    const exerciseObj = this.exerciseConfig.find(value => value.getSid() === sid);
    return (exerciseObj !== undefined && exerciseObj !== null) ? exerciseObj.getItem() : '';
  }

  calcDayColor(isDayOff: boolean): string {
    return isDayOff ? 'sprint-day-dayoff' : 'sprint-day-training';
  }

  /************************* PRIVATE METHODS ***********************/
  private loadExercises(): void {
    this.sprintService.getExerciseListForCurrentSprintFromCache().subscribe(
      data => {
        if (data === undefined || data.length === 0) {
          const exerciseListObs = this.sprintService.getExerciseListForCurrentSprint();
          const daysOffObs = this.sprintService.getDaysOffForCurrentSprint();
          forkJoin([exerciseListObs, daysOffObs]).subscribe(
            result => {
              this.sprintExercises = this.sprintService.buildSprintExerciseList(result[0], result[1]);
              this.loading = false;
            },
            error => this.handleError(error)
          );
        } else {
          this.sprintExercises = data;
          this.loading = false;
        }
      }
    );
  }

  private handleError(error: any): void {
    this.error = error;
  }
}
