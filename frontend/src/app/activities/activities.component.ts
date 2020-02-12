import { Component, OnInit } from '@angular/core';
import {Exercise} from '../models/exercise';
import {ExerciseService} from '../services/exercise.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  exercises: Exercise[];
  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.getExcercisesForCurrentSprint();
  }

  getExcercisesForCurrentSprint(): void {
    this.exercises = this.exerciseService.getExcercisesForCurrentSprint();
  }
}
