import { Component, OnInit, ViewEncapsulation, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import {SprintService} from '../services/sprint.service';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {Exercise} from '../models/exercise';
import {Reps} from '../models/reps';
import {ExerciseMetadata} from '../models/exercise.metadata';
import {RepsView} from '../models/reps.view';

@Component({
  selector: 'app-exercise-reps',
  templateUrl: './exercise-reps.component.html',
  styleUrls: ['./exercise-reps.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ExerciseRepsComponent implements OnInit {
  @Input() exercise: Exercise;
  @Input() loading: boolean;
  @Input() exerciseMetadata: ExerciseMetadata;
  @Output() onExerciseChanged = new EventEmitter<Exercise>();
  faTrash = faTrash;
  faPlus = faPlus;
  rawPoints: string = '';
  reps: RepsView[] = [new RepsView('','')];

  constructor(private sprintService: SprintService) { }

  ngOnInit(): void {
    console.log('ngOnInit(), meta=',this.exerciseMetadata,',ex=', this.exercise);
    if(this.exerciseMetadata === undefined || this.exercise === undefined) {
      return;
    }
    if(this.exerciseMetadata.isWithReps() && this.exercise.getReps().length > 0) {
      this.reps = [];
      this.exercise.getReps().forEach(value => {
        this.reps.push(new RepsView(''+value.getWeight(), ''+value.getReps()));
      });
      this.rawPoints = ''+this.exercise.getRawPoints();
      return;
    }
    this.rawPoints = ''+this.exercise.getRawPoints();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges() ', changes);
    if(changes.exerciseMetadata !== undefined &&
      changes.exerciseMetadata.previousValue !== undefined &&
      changes.exerciseMetadata.currentValue !== undefined &&
      changes.exerciseMetadata.currentValue.sid != changes.exerciseMetadata.previousValue.sid) {
        this.reps = [new RepsView('','')];
        this.rawPoints = '';
    }
  }

  changeWeight(index: number, $event: any): void {
    this.reps[index].setWeight(this.changeFieldFloatValue($event));
    this.fillAndEmitExercise();
  }

  changeReps(index: number, $event: any): void {
    const newNumberValue = this.sprintService.getNumberFromString($event.target.value);
    const newStringValue = (newNumberValue === 0 ? '' : '' + newNumberValue);
    this.reps[index].setReps(newStringValue);
    $event.target.value = newStringValue;
    this.fillAndEmitExercise();
  }

  deleteReps(index: number): void {
    if (this.reps.length === 1) {
      this.reps = [new RepsView('', '')];
    } else {
      this.reps.splice(index, 1);
    }
    this.fillAndEmitExercise();
  }

  noEmptyReps(): boolean {
    const emptyElements = this.reps.findIndex(
      element => element.getWeight() === '' || element.getReps() === '' ||
      this.sprintService.getFloatFromString(element.getWeight()) === 0 || this.sprintService.getNumberFromString(element.getReps()) === 0);
    return emptyElements === -1;
  }

  addReps(): void {
    this.reps.push(new RepsView('',''));
    this.fillAndEmitExercise();
  }

  changeRawPoints($event: any): void {
    this.rawPoints = this.changeFieldFloatValue($event);
    this.fillAndEmitExercise();
  }

  private changeFieldFloatValue($event: any): string {
    const str = $event.target.value.toString();
    if (str === '' || str == undefined) {
      return '';
    }
    if (str.endsWith('.')) {
      return str;
    }
    $event.target.value = this.sprintService.getFloatFromString($event.target.value);
    return $event.target.value;
  }

  private fillAndEmitExercise(): void {
    const ex = new Exercise();
    ex.setSid(this.exerciseMetadata.getSid());

    if(this.exerciseMetadata.isWithReps()) {
      this.reps.forEach(rep => {
        const newRep = new Reps();
        newRep.setWeight(this.sprintService.getFloatFromString(rep.getWeight()));
        newRep.setReps(this.sprintService.getNumberFromString(rep.getReps()));
        ex.getReps().push(newRep);
      });
      this.rawPoints === undefined ? ex.setRawPoints(0): ex.setRawPoints(this.sprintService.getFloatFromString(this.rawPoints));
    } else {
      ex.setRawPoints(this.sprintService.getFloatFromString(this.rawPoints));
    }
    this.onExerciseChanged.emit(ex);
  }

}
