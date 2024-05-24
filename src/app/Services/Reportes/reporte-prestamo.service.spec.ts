import { TestBed } from '@angular/core/testing';

import { ReportePrestamoService } from './reporte-prestamo.service';

describe('ReportePrestamoService', () => {
    let service: ReportePrestamoService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ReportePrestamoService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
