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
import {ErrorService} from '../services/error.service';
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

  constructor(private sprintService: SprintService, private router: Router, private errorService: ErrorService) {
  }

  ngOnInit() {
    this.loading = true;
    this.errorService.onError().subscribe(
      data => this.error = data
    );
    this.loadExerciseMetadata();

    if (history.state.isExerciseModified !== undefined && history.state.isExerciseModified !== null && history.state.isExerciseModified) {
      this.loadExerciseStatistic(true);
      history.replaceState({state: {}}, 'nothing', '/sprint');
    } else {
      this.loadExerciseStatistic(false);
    }

    this.loadExercises();

    const monthObj = environment.MONTHS.find(value => value.id === new Date().getMonth());
    this.month = (monthObj !== undefined && monthObj !== null) ? monthObj.name : '';
  }

  private loadExercises(): void {
    this.sprintService.getExerciseListForCurrentSprintFromCache().subscribe(
      data => {
        if (data === undefined || data.length === 0) {
          const exerciseListObs = this.sprintService.getExerciseListForCurrentSprint();
          const daysOffObs = this.sprintService.getDaysOffForCurrentSprint();
          forkJoin([exerciseListObs, daysOffObs]).subscribe(
            result => {
              this.sprintExercises = this.sprintService.buildSprintExerciseList(result[0], result[1]);
            },
            error => this.handleError(error)
          );
        } else {
          this.sprintExercises = data;
        }
        this.loading = false;
      }
    );
  }

  private handleError(error: any): void {
    this.loading = false;
    this.errorService.handleError(error);
  }

  private loadExerciseMetadata(): void {
    this.sprintService.getExerciseMetadata().subscribe(
      data => {
        this.exerciseConfig = data;
        this.loading = false;
      },
      error => this.handleError(new MultiTError('Metadata not loaded!'))
    );
  }

  private loadExerciseStatistic(forceCallServer: boolean): void {
    this.sprintService.getExerciseStatisticsForCurrentSprint(forceCallServer)
      .subscribe(data => {
          this.sprintExerciseStatistic = data;
          this.loading = false;
        },
        error => this.handleError(error)
      );
  }

  addExercise(): void {
    this.router.navigate(['/sprint/newExercise']);
  }

  openExercise(exercise: Exercise): void {
    this.router.navigate(['/sprint/exercise'], {state: {ex: exercise}});
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

}
