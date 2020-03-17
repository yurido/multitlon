import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ActivitiesComponent} from './activities.component';
import {SprintService} from '../services/sprint.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('ActivitiesComponent', () => {
  let component: ActivitiesComponent;
  let fixture: ComponentFixture<ActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivitiesComponent],
      providers: [SprintService, HttpClient, HttpHandler]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
