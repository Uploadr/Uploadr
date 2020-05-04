export interface Image{
    id: number;
    name: string; //user should probably give the image a name
    user: string; //automatically grab the user and push it as a field
    url: string;
    tags : string[];
}