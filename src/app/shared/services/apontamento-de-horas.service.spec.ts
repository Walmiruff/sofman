import { TestBed } from '@angular/core/testing';

import { ApontamentoDeHorasService } from './apontamento-de-horas.service';

describe('ApontamentoDeHorasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApontamentoDeHorasService = TestBed.get(ApontamentoDeHorasService);
    expect(service).toBeTruthy();
  });
});
