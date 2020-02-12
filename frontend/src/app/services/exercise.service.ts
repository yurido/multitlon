import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Exercise} from '../models/exercise';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient) { }

  getExcercisesForCurrentSprint(): Exercise[] {
    const excercises = [];
    excercises.push(this.addNewExcercise(1, 'Push-ups', 150, 20));
    excercises.push(this.addNewExcercise(2, 'Pull-ups', 6523, 5222));
    excercises.push(this.addNewExcercise(3, 'Bars', 2000, 1000));
    return excercises;
  }

  private addNewExcercise(id, name, rawPoints, totalPoints) {
    const excersise = new Exercise();
    excersise.id = id;
    excersise.name = name;
    excersise.rawPoints = rawPoints;
    excersise.totalPoints = totalPoints;
    return excersise;
  }
}
