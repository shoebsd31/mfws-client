
import axios from 'axios';
import dotenv from 'dotenv';
import { Authentication } from '.';
import { PluginInfoConfiguration } from './interfaces/plugin-information-configuration';
import { Vault } from './interfaces/vault';


declare var process : {
  env: {
    URL: string
  }
}
export class MFWSClient{
  /**
   *
   */

  url:string;
  constructor() {
    dotenv.config();
    this.url = process.env.URL;
  }

  public async AuthenticateUsingCredentials(authentication:Authentication) {
    	// Sanity.
			if (authentication===null)
      return;
     
      const response = await axios.post(`${this.url}/REST/server/authenticationtokens`, authentication);
      console.log(<Authentication>response.data);
      return response.data;
    }

    public async AuthenticateUsingSingleSignOn(vaultGUID:string){
      	// Sanity.
			if (vaultGUID===null)
      return;

      const response = await axios.get(`${this.url}/WebServiceSSO.aspx?popup=1&vault=${vaultGUID}`);
      return response.data;
    }

    public async GetOnlineVaults():Promise<Vault[]>{
      const response = await axios.get<Vault[]>(`${this.url}/REST/server/vaults?online=true`);
      return response.data;
    }

    public async GetAuthenticationPlugins(vaultGUID:string):Promise<PluginInfoConfiguration[]>{
      let requestUrl=`${this.url}/REST/server/authenticationprotocols`;
    	// Sanity.
			if (vaultGUID!==null)
        requestUrl=`${requestUrl}?vault=${vaultGUID}`;

      const response = await axios.get<PluginInfoConfiguration[]>(requestUrl);
      return response.data;
    }

    public async Logout(){
    const response = await axios.delete(`${this.url}/REST/session.aspx`);
    return response.data;
  }
}



