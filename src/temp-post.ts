
import axios from 'axios';
import dotenv from 'dotenv';
import { Authentication } from '.';


declare var process : {
  env: {
    URL: string
  }
}
export class TempPost{
  /**
   *
   */

  url:string;
  constructor() {
    dotenv.config();
    this.url = process.env.URL;

  }
  public async testPost() {   
    
            const body = {
                title: 'foo',
                body: 'bar',
                userId: 1,
              };
            const response = await axios.post(`${this.url}/posts`, body);
            console.log(<Authentication>response.data);
            return response.data;
            // return 'foo';
    }
}



