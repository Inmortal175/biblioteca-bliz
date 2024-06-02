export interface Proveedor {
    id_proveedor: number;
    nombre: string;
    email: string;
    telefono: string;
}

export interface ProveedorModel {
    count: number;
    next: string;
    previous: string;
    results: Proveedor[];
}
