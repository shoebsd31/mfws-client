
import axios from 'axios';
import dotenv from 'dotenv';
import { Authentication } from '.';


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
			if (null == authentication)
      return;

     
            const response = await axios.post(`${this.url}/REST/server/authenticationtokens`, authentication);
            console.log(<Authentication>response.data);
            return response.data;
            // return 'foo';
    }
}



