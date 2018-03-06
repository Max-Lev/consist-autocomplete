import { TestBed, inject } from '@angular/core/testing';

import { FilterUsersService } from './filter-users.service';

describe('FilterUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterUsersService]
    });
  });

  it('should be created', inject([FilterUsersService], (service: FilterUsersService) => {
    expect(service).toBeTruthy();
  }));
});
