
export class User{
    id! :number; 
    username!: string;
    password!: string;
    roleRequest!: RoleRequest;
    roles!: roles[];
}

export class RoleRequest{
    roleListName!: String[];
}

export class roles{
    roleEnum!: String;
}

export class userResponse{
    success!: boolean;
    message!: string ; 
}
