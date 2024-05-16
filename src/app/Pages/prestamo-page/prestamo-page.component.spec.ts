import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamoPageComponent } from './prestamo-page.component';

describe('PrestamoPageComponent', () => {
    let component: PrestamoPageComponent;
    let fixture: ComponentFixture<PrestamoPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PrestamoPageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PrestamoPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
