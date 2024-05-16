import {
    AfterViewInit,
    Component,
    OnInit,
    QueryList,
    Renderer2,
    ViewChildren,
} from '@angular/core';

// importar los modulos para el uso de pdfMake
// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';

// pdfMake.vfs = pdfFonts.pdfMake.vfs;
//PdfMake end

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit, AfterViewInit {
    constructor(private render: Renderer2) {}
    ngOnInit(): void {
        console.log();
    }

    // funcion que crea el pdf
    // createPdf() {
    //     let docDefinition = {
    //         content: 'This is an sample PDF printed with pdfMake',
    //     };
    //     pdfMake.createPdf(docDefinition).open();
    // }
    //end pdfMake

    @ViewChildren('item') Items!: QueryList<any>;
    ngAfterViewInit(): void {
        const RENDER = this.render;
        let Items = this.Items;

        // funcion para eliminar la clase 'active' donde lo ubique
        function deleteActive() {
            Items.forEach(item => {
                const ITEM: HTMLLIElement = item.nativeElement;
                RENDER.removeClass(ITEM, 'active');
            });
        }

        // asigna un evento a cada Item para añadir la clase 'active'
        this.Items.forEach(item => {
            const ITEM: HTMLLIElement = item.nativeElement;
            ITEM.addEventListener('click', () => {
                deleteActive();
                RENDER.addClass(ITEM, 'active');
            });
        });
    }
}
