import { TestBed } from '@angular/core/testing';

import { CustomSnackbarService } from './custom-snackbar.service';

describe('CustomSnackbarService', () => {
  let service: CustomSnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomSnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
