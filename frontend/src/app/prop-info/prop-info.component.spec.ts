import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropInfoComponent } from './prop-info.component';

describe('PropInfoComponent', () => {
  let component: PropInfoComponent;
  let fixture: ComponentFixture<PropInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
