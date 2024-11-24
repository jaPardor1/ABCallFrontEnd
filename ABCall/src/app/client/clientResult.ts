export enum DocumentType {
    cedula = "cedula",
    registro_civil = "registro_civil",
    passport = "passport",
    cedula_extranjeria = "cedula_extranjeria",
    NIT = "NIT"
}

export enum PlanType {
    emprendedor = "emprendedor",
    empresario = "empresario",
    empresario_plus = "empresario_plus"
}

export interface ClientResultDTO {
    id: number;
    perfil: string;
    id_type: DocumentType;
    legal_name: string;
    id_number: string;
    address: string;
    type_document_rep: DocumentType;
    id_rep_lega: string;
    name_rep: string;
    last_name_rep: string;
    email_rep: string;
    plan_type: PlanType;
    cellphone?: string;
}
