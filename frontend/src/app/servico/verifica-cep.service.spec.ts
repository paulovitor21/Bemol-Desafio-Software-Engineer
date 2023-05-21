import { TestBed } from '@angular/core/testing';

import { VerificaCepService } from './verifica-cep.service';

describe('VerificaCepService', () => {
  let service: VerificaCepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerificaCepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
