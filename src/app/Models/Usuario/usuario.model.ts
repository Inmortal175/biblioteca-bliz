export interface UsuarioModel {
    count: number;
    next: string;
    previous: string;
    results: UsuarioResult[];
}

export interface UsuarioResult {
    id_usuario: number;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    telefono: string;
    email: string;
    es_activo: boolean;
    bibliotecario: string;
}
