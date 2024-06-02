import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//importar modelos
import { AutorModel } from 'src/app/Models/Autor/autor.model';
import { base_url } from 'src/app/Models/Url/urls.model';

@Injectable({
    providedIn: 'root',
})
export class AutorService {
    constructor(private http: HttpClient) {}
}
