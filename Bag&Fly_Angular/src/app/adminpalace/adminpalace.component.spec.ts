import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpalaceComponent } from './adminpalace.component';

describe('AdminpalaceComponent', () => {
  let component: AdminpalaceComponent;
  let fixture: ComponentFixture<AdminpalaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminpalaceComponent]
    });
    fixture = TestBed.createComponent(AdminpalaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
