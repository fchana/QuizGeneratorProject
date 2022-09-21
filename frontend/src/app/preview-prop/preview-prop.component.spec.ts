import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPropComponent } from './preview-prop.component';

describe('PreviewPropComponent', () => {
  let component: PreviewPropComponent;
  let fixture: ComponentFixture<PreviewPropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewPropComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewPropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
