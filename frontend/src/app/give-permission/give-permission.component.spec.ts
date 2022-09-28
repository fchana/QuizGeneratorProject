import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GivePermissionComponent } from './give-permission.component';

describe('GivePermissionComponent', () => {
  let component: GivePermissionComponent;
  let fixture: ComponentFixture<GivePermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GivePermissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GivePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
