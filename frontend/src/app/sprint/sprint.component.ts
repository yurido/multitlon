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
import {ExerciseMetadataList} from '../models/exercise.metadata.list';
import {ExerciseMetadata} from '../models/exercise.metadata';
import {MultiTError} from '../models/multiterror';

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
  exerciseConfig: ExerciseMetadata[];

  constructor(private sprintService: SprintService, private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.loadExerciseMetadata();

    if (isDefined(history.state.isDataChanged) && history.state.isDataChanged) {
      // TODO: update exercise in cache!
      console.log('ska uppdatera exercise ' + history.state.exercise + ' in cache');
      this.updateExerciseInCache(history.state.exercise);
      this.loadExerciseStatistic(true);
    } else {
      this.loadExerciseStatistic(false);
      this.getExcercises(false);
    }
  }

  private subscribeExercises(data: SprintCalendar): void {
    const sprintCalendar = new SprintCalendar().deserialize(data);
    this.sprintExercises = this.sprintService.sortSprintExercisesByDate(sprintCalendar.getSprintExercises());
    const monthN = new Date(this.sprintExercises[0].getSprintDay().getSprintDate()).getMonth();
    const monthObj = environment.MONTHS.find(value => value.id === monthN);
    this.month = isDefined(monthObj) ? monthObj.name : '';
    this.loading = false;
  }

  // TODO: check that exercise updated!
  private updateExerciseInCache(exercise: Exercise): void {
    this.sprintService.updateExerciseInCache(exercise).subscribe(
      data => this.subscribeExercises(data),
      error => {
        console.log('error here ', error);
        this.loading = false;
        this.error = error;
      }
    );
  }

  private getExcercises(forceCallServer: boolean): void {
    this.sprintService.getExercisesCurrentSprint('test', forceCallServer)
      .subscribe(data => this.subscribeExercises(data),
        error => {
          console.log('error here ', error);
          this.loading = false;
          this.error = error;
        });
  }

  private loadExerciseMetadata(): void {
    this.sprintService.getExerciseMetadata().subscribe(
      data => {
        const metaData = new ExerciseMetadataList().deserialize(data);
        this.exerciseConfig = metaData.getExerciseMetadata();
        this.loading = false;
      },
      error => {
        console.log('error here ', error);
        this.loading = false;
        this.error = new MultiTError('Exercise metadata not loaded');
      }
    );
  }

  private loadExerciseStatistic(forceCallServer: boolean): void {
    this.sprintService.getExerciseStatisticsForCurrentSprint('test', forceCallServer)
      .subscribe(data => {
          const sprintExerciseStatisticCalendar = new SprintExerciseStatisticCalendar().deserialize(data);
          this.sprintExerciseStatistic = sprintExerciseStatisticCalendar.getExerciseStatistic();
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
    const exerciseObj = this.exerciseConfig.find(value => value.getSid() === sid);
    return isDefined(exerciseObj) ? exerciseObj.getName() : '';
  }

  getExItem(sid: string): string {
    const exerciseObj = this.exerciseConfig.find(value => value.getSid() === sid);
    return isDefined(exerciseObj) ? exerciseObj.getItem() : '';
  }

  calcDayColor(isDayOff: boolean): string {
    return isDayOff ? 'sprint-day-dayoff' : 'sprint-day-training';
  }

}
