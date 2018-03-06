import { TestBed, inject } from '@angular/core/testing';

import { SearchStorageService } from './search-storage.service';

describe('SearchStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchStorageService]
    });
  });

  it('should be created', inject([SearchStorageService], (service: SearchStorageService) => {
    expect(service).toBeTruthy();
  }));
});
