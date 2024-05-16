import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
    declarations: [],
    exports: [
        CommonModule,
        [SweetAlert2Module.forRoot()],
        [SweetAlert2Module.forChild()],
    ],
})
export class SweetAlertModule {}
