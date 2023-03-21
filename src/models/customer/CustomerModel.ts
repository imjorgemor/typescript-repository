export interface CustomerModel {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    image: string;
}


//I. ejemplo si queremos crear otro modelo utilizando el modelo CustomerModel
export interface AdminModel extends CustomerModel {
    token: string
}


