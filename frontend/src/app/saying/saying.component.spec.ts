import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SayingComponent } from './saying.component';

describe('SayingComponent', () => {
  let component: SayingComponent;
  let fixture: ComponentFixture<SayingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SayingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SayingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
