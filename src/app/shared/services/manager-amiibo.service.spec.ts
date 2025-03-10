import { TestBed } from '@angular/core/testing';

import { ManagerAmiiboService } from './manager-amiibo.service';

describe('ManagerAmiiboService', () => {
  let service: ManagerAmiiboService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerAmiiboService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
