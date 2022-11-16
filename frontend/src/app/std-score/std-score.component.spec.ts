import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdScoreComponent } from './std-score.component';

describe('StdScoreComponent', () => {
  let component: StdScoreComponent;
  let fixture: ComponentFixture<StdScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StdScoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StdScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
