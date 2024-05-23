import { HttpClient } from '@angular/common/http';
import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';

import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
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
}
