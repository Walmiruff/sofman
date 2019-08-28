import { TestBed } from '@angular/core/testing';

import { ApontamentoDeMateriaisService } from './apontamento-de-materiais.service';

describe('ApontamentoDeMateriaisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApontamentoDeMateriaisService = TestBed.get(ApontamentoDeMateriaisService);
    expect(service).toBeTruthy();
  });
});
