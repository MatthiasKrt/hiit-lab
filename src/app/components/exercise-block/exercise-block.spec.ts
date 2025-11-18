import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseBlock } from './exercise-block';

describe('ExerciseBlock', () => {
  let component: ExerciseBlock;
  let fixture: ComponentFixture<ExerciseBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
