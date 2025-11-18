import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseLibrary } from './exercise-library';

describe('ExerciseLibrary', () => {
  let component: ExerciseLibrary;
  let fixture: ComponentFixture<ExerciseLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseLibrary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseLibrary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
