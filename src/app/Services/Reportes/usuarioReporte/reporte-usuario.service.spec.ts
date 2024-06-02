import { TestBed } from '@angular/core/testing';

import { ReporteUsuarioService } from './reporte-usuario.service';

describe('ReporteUsuarioService', () => {
  let service: ReporteUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
