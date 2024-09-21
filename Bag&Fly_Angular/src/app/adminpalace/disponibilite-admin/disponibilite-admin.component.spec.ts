import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibiliteAdminComponent } from './disponibilite-admin.component';

describe('DisponibiliteAdminComponent', () => {
  let component: DisponibiliteAdminComponent;
  let fixture: ComponentFixture<DisponibiliteAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisponibiliteAdminComponent]
    });
    fixture = TestBed.createComponent(DisponibiliteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
