import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TViewAnsComponent } from './t-view-ans.component';

describe('TViewAnsComponent', () => {
  let component: TViewAnsComponent;
  let fixture: ComponentFixture<TViewAnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TViewAnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TViewAnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
