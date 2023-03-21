
export interface ProjectType {
    created: string;
    id: number;
    description: string;
    name: string;
    languages: [
        {
            id: number;
            name: string;
            percentage: string;
            iso: string;
            locale: string
        }
    ];
}


type languages = ProjectType["languages"]




