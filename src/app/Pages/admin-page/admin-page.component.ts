import { HttpClient } from '@angular/common/http';
import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
} from '@angular/core';

import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit, AfterViewInit {
    pageSizeForm: FormGroup<any>;
    currentPage = 1;
    pageSize = 1;
    totalItems: number;
    items: any[];

    pages: any[] = []; // para mostrar las paginas

    totalPages: number;

    constructor(
        private http: HttpClient,
        private fb: FormBuilder
    ) {
        this.pageSizeForm = this.fb.group({
            pageSize: new FormControl('1'),
        });
    }

    fetchData(page: number, size: number) {
        const url = `http://localhost:8000/api/v0/usuario/?page=${page}&page_size=${size}`;
        this.http.get(url).subscribe(
            (response: any) => {
                this.items = response.results;
                this.totalItems = response.count;
                this.totalPages = Math.ceil(this.totalItems / this.pageSize);
                this.createPagination(this.totalPages, this.currentPage);
            },
            error => {
                console.error('Error fetching data:', error);
            }
        );
    }

    changePageSize() {
        this.currentPage = 1;
        this.pageSize = parseInt(this.pageSizeForm.value.pageSize);
        this.fetchData(this.currentPage, this.pageSize);
    }
    ngOnInit() {
        this.fetchData(this.currentPage, this.pageSize);
    }

    createPagination(totalPages: number, page: number) {
        let pages = [];
        let beforePage = page - 1;
        let afterPage = page + 1;

        if (page > 1) {
            pages.push({ type: 'prev', number: page - 1 });
        }

        if (page > 2) {
            pages.push({ type: 'page', number: 1 });
            if (page > 3) {
                pages.push({ type: 'dots' });
            }
        }

        if (page === totalPages) {
            beforePage = beforePage - 2;
        } else if (page === totalPages - 1) {
            beforePage = beforePage - 1;
        }

        if (page === 1) {
            afterPage = afterPage + 2;
        } else if (page === 2) {
            afterPage = afterPage + 1;
        }

        for (let i = beforePage; i <= afterPage; i++) {
            if (i > 0 && i <= totalPages) {
                pages.push({ type: 'page', number: i });
            }
        }

        if (page < totalPages - 1) {
            if (page < totalPages - 2) {
                pages.push({ type: 'dots' });
            }
            pages.push({ type: 'page', number: totalPages });
        }

        if (page < totalPages) {
            pages.push({ type: 'next', number: page + 1 });
        }

        this.pages = pages;
    }

    changePage(page: number) {
        this.currentPage = page;
        this.createPagination(this.totalPages, this.currentPage);
        this.fetchData(this.currentPage, this.pageSize);
    }

    //para el stteper
    /* El fragmento de código que proporcionó está relacionado con la gestión de la paginación y la
   visualización de páginas en un componente Angular. Analicemos la funcionalidad: */
    @ViewChildren('page') Page: QueryList<ElementRef>;

    currentPageIndex: number = 0;

    ngAfterViewInit(): void {
        this.showPage(this.currentPageIndex);
        this.attachButtonListeners();
    }

    /**
     * La función `showPage` itera a través de una matriz de elementos y muestra el elemento en el
     * índice especificado mientras oculta el resto.
     * @param {number} index - El parámetro `index` en el método `showPage` se utiliza para especificar
     * qué página mostrar. El método recorre cada elemento de la página en la matriz `Page` y establece
     * el estilo de visualización en 'bloque' para la página en el índice especificado, mientras
     * establece el estilo de visualización en 'ninguno'.
     */
    showPage(index: number): void {
        this.Page.forEach((data, idx) => {
            let page = data.nativeElement as HTMLElement;
            if (idx === index) {
                page.style.display = 'block';
            } else {
                page.style.display = 'none';
            }
        });
    }

    /**
     * La función `attachButtonListeners` itera sobre cada elemento de la página y adjunta detectores
     * de eventos de clic a los botones siguiente y anterior para navegar por las páginas.
     */
    attachButtonListeners(): void {
        this.Page.forEach((data, index) => {
            let page = data.nativeElement as HTMLElement;
            let nextButton = page.querySelector('.next');
            let prevButton = page.querySelector('.prev');

            /* Este fragmento de código verifica si hay un elemento `nextButton` presente en la página
            actual que se está iterando. Si existe un elemento "nextButton", se le adjunta un
            detector de eventos para el evento "clic". Cuando se hace clic en el "botón siguiente",
            se realizan las siguientes acciones:
            1. El comportamiento predeterminado del evento de clic se evita usando
            `event.preventDefault()`.
            2. Comprueba si el "índice" actual es menor que la longitud total de la matriz "Página"
            menos 1. Esta condición garantiza que el índice no exceda el índice máximo de la matriz
            de páginas.
            3. Si se cumple la condición, `currentPageIndex` se incrementa en 1 y se llama a la
            función `showPage` con el `currentPageIndex` actualizado. Esta acción muestra
            efectivamente la página siguiente en la secuencia de paginación cambiando el estilo de
            visualización de las páginas actual y siguiente. */
            if (nextButton) {
                nextButton.addEventListener('click', event => {
                    event.preventDefault();
                    if (index < this.Page.length - 1) {
                        this.currentPageIndex++;
                        this.showPage(this.currentPageIndex);
                    }
                });
            }

            /* El fragmento de código que proporcionó maneja la funcionalidad del botón "anterior" en
            el componente de paginación. Analicemos lo que hace este código: */
            if (prevButton) {
                prevButton.addEventListener('click', event => {
                    event.preventDefault();
                    if (index > 0) {
                        this.currentPageIndex--;
                        this.showPage(this.currentPageIndex);
                    }
                });
            }
        });
    }
}
