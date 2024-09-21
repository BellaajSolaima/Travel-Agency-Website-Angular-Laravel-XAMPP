import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteAdminComponent } from './compte-admin.component';

describe('CompteAdminComponent', () => {
  let component: CompteAdminComponent;
  let fixture: ComponentFixture<CompteAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompteAdminComponent]
    });
    fixture = TestBed.createComponent(CompteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
