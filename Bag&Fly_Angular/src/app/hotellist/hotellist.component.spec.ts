import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotellistComponent } from './hotellist.component';

describe('HotellistComponent', () => {
  let component: HotellistComponent;
  let fixture: ComponentFixture<HotellistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotellistComponent]
    });
    fixture = TestBed.createComponent(HotellistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
