import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SprintService} from '../services/sprint.service';
import {SprintExercise} from '../models/sprint.exercise';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {Exercise} from '../models/exercise';
import {environment} from '../../environments/environment';
import {SprintExerciseStatisticCalendar} from '../models/sprint.exercise.statistic.calendar';
import {ExerciseStatistic} from '../models/exercise.statistic';
import {ExerciseMetadataList} from '../models/exercise.metadata.list';
import {ExerciseMetadata} from '../models/exercise.metadata';
import {MultiTError} from '../models/multiterror';

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
  error: any;
  loading: boolean;
  month: string;
  sprintExerciseStatistic: ExerciseStatistic[];
  exerciseConfig: ExerciseMetadata[];

  constructor(private sprintService: SprintService, private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.loadExerciseMetadata();

    if (history.state.isExerciseModified !== undefined && history.state.isExerciseModified !== null && history.state.isExerciseModified) {
      this.loadExerciseStatistic(true);
      history.replaceState({state: {}}, 'nothing', '/sprint');
    } else {
      this.loadExerciseStatistic(false);
    }
    this.getSprintExcercises();

    const monthN = new Date().getMonth();
    const monthObj = environment.MONTHS.find(value => value.id === monthN);
    this.month = (monthObj !== undefined && monthObj !== null) ? monthObj.name : '';
  }

  private handleError(error: any): void {
    console.log('error here ', error);
    this.loading = false;
    this.error = error;
  }

  private getSprintExcercises(): void {
    this.sprintService.getSprintExerciseListObjectForCurrentSprint().subscribe(
        data => {
          console.log('SPRINT COMPONENT: getSprintExcercises=', data);
          this.sprintExercises = data;
          this.loading = false;
        },
        error => this.handleError(error)
      );
  }

  private loadExerciseMetadata(): void {
    this.sprintService.getExerciseMetadata().subscribe(
      data => {
        const metaData = new ExerciseMetadataList().deserialize(data);
        this.exerciseConfig = metaData.getExerciseMetadata();
        this.loading = false;
      },
      error => this.handleError(new MultiTError('Exercise metadata not loaded'))
    );
  }

  private loadExerciseStatistic(forceCallServer: boolean): void {
    this.sprintService.getExerciseStatisticsForCurrentSprint(forceCallServer)
      .subscribe(data => {
          const sprintExerciseStatisticCalendar = new SprintExerciseStatisticCalendar().deserialize(data);
          this.sprintExerciseStatistic = sprintExerciseStatisticCalendar.getExerciseStatistic();
          this.loading = false;
        },
        error => this.handleError(error)
      );
  }

  addExercise(): void {
    this.router.navigate(['/sprint/newExercise']);
  }

  openExercise(exercise: Exercise): void {
    const exerciseStatistic = this.sprintExerciseStatistic.find(ex => exercise.getSid() === ex.getSid());
    this.router.navigate(['/sprint/exercise'], {state: {ex: exercise, statistic: exerciseStatistic}});
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
