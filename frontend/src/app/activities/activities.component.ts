import { Component, OnInit } from '@angular/core';
import {ExerciseService} from '../services/exercise.service';
import {SprintExercises} from '../models/sprint-exercises';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  sprintExercises: SprintExercises[];
  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.getExcercisesForCurrentSprint();
  }

  getExcercisesForCurrentSprint(): void {
    this.sprintExercises = this.exerciseService.getExcercisesForCurrentSprint();
    console.log('sprintExercises:' + this.sprintExercises);
  }
}
