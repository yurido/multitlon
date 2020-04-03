import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SprintService} from '../services/sprint.service';
import {SprintExercises} from '../models/sprintExercises';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {SprintCalendar} from '../models/sprintCalendar';
import {Router} from '@angular/router';
import {Exercise} from '../models/exercise';

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
  loading: boolean;

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
        },
        error => {
          console.log('error here ', error);
          this.loading = false;
          this.error = error;
        });
  }

  addExercise(): void {
    console.log('add exercise click!');
  }

  openExercise(exercise: Exercise): void {
    console.log('open exercise click!');
    this.router.navigate(['/exercise'], {state: {data: exercise}});
  }

  goBack(): void {
    console.log('goBack click!');
    this.router.navigate(['/main']);
  }

}
