export interface UsuariosModel {
    count: number;
    next: string;
    previous: string;
    results: Result[];
}

export interface Result {
    id_usuario: number;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    telefono: string;
    email: string;
    es_activo: boolean;
    bibliotecario: string;
}
