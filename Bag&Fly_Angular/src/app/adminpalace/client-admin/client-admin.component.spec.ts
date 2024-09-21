import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAdminComponent } from './client-admin.component';

describe('ClientAdminComponent', () => {
  let component: ClientAdminComponent;
  let fixture: ComponentFixture<ClientAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientAdminComponent]
    });
    fixture = TestBed.createComponent(ClientAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
