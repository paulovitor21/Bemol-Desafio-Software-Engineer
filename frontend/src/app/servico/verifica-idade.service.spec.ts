import { TestBed } from '@angular/core/testing';

import { VerificaIdadeService } from './verifica-idade.service';

describe('VerificaIdadeService', () => {
  let service: VerificaIdadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerificaIdadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
