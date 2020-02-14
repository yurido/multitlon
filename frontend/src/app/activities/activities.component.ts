import { Component, OnInit } from '@angular/core';
import {ExerciseService} from '../services/exercise.service';
import {ExerciseList} from '../models/exercise-list';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  sprintExercises: ExerciseList[];
  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.getExcercisesForCurrentSprint();
  }

  getExcercisesForCurrentSprint(): void {
    this.sprintExercises = this.exerciseService.getExcercisesForCurrentSprint();
    console.log('sprintExercises:' + this.sprintExercises);
  }
}
