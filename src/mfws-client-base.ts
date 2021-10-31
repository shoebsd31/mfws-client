
import dotenv from 'dotenv';
import { MFWSVaultObjectSearchOperations } from './vault/object-search-operations';

declare var process : {
    env: {
      URL: string
    }
  }
export abstract class MFWSClientBase{
    readonly ObjectSearchOperations:MFWSVaultObjectSearchOperations;  

    url:string;
    constructor() {
        dotenv.config();
        this.url = process.env.URL;
        this.ObjectSearchOperations=new
         MFWSVaultObjectSearchOperations(this);
    }

} 