
   export interface AuthResponseDto{
    token: string;
    email: string;
    roles: string[];
    expiration: Date;
    fullName: string;
   }