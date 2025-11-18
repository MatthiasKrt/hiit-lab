import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockDialog } from './block-dialog';

describe('BlockDialog', () => {
  let component: BlockDialog;
  let fixture: ComponentFixture<BlockDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
