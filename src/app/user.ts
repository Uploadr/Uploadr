export interface User {
    // in memory db service questionably requires all dbs to have 
    // their id field named id
    id : number; 

    username : string;
    password : string;
};
