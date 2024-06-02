export interface UsuarioPostModel {
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    telefono: string;
    email: string;
    es_activo: boolean;
    id_bibliotecario: number;
}

export interface UsuarioResponsePostModel {
    id_usuario: number;
    fecha_creacion: string;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    telefono: string;
    email: string;
    es_activo: boolean;
    id_bibliotecario: number;
}
