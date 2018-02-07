import { TestBed, inject } from '@angular/core/testing';

import { QuestsService } from './quests.service';

describe('QuestsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestsService]
    });
  });

  it('should be created', inject([QuestsService], (service: QuestsService) => {
    expect(service).toBeTruthy();
  }));
});
