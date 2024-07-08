import { TestBed } from '@angular/core/testing';

import { PartypropsService } from './partyprops.service';

describe('PartypropsService', () => {
  let service: PartypropsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartypropsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
