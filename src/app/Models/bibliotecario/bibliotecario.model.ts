export interface BibliotecarioModel {
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    full_name: string;
    email: string;
    is_active: boolean;
}

export interface BibliotecariosModelList {
    count: number;
    next: null;
    previous: null;
    results: BibliotecarioModel[];
}

export interface BibliotecarioParams {
    page: number;
    page_size: number;
}
