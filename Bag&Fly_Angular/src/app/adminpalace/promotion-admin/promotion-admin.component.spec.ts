import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionAdminComponent } from './promotion-admin.component';

describe('PromotionAdminComponent', () => {
  let component: PromotionAdminComponent;
  let fixture: ComponentFixture<PromotionAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromotionAdminComponent]
    });
    fixture = TestBed.createComponent(PromotionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
