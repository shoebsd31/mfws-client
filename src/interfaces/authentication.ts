export interface Authentication{
    Username:string;
    Password:string;
    SessionID:string
    Expiration:Date;
    VaultGuid:string;
}