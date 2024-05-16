import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosPageComponent } from './libros-page.component';

describe('LibrosPageComponent', () => {
    let component: LibrosPageComponent;
    let fixture: ComponentFixture<LibrosPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LibrosPageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LibrosPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
