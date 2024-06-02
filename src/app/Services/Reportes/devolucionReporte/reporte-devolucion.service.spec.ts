import { TestBed } from '@angular/core/testing';

import { ReporteDevolucionService } from './reporte-devolucion.service';

describe('ReporteDevolucionService', () => {
  let service: ReporteDevolucionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteDevolucionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
