export interface ProveedorModelList {
    count: number;
    next: string;
    previous: string;
    results: ProveedorModelListResult[];
}

export interface ProveedorModelListResult {
    id_proveedor: number;
    nombre: string;
    email: string;
}

export interface ProveedorModel {
    id_proveedor: number;
    nombre: string;
    email: string;
    telefono: string;
}
