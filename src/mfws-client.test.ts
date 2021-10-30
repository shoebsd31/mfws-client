import { Authentication } from './interfaces/authentication';
import {MFWSClient} from './mfws-client'
import axios, { AxiosResponse } from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const responseData={Value:"r2vrt41UpV7iZvjRkhcb0GyH45yKvXtZhlT-GUXaAU0tqWGuZdkTBSFGvrNix9O2TQs-qKqxYbp8PbcrYFIs_6wTScnJlA36tOXtt0ORvfhvQFBkfwnyUP94jhVNE5y3VHPUyM-k1Hsm1l51N7ZN1rvIQhnE3xvV-mcroR-BmVYqO-ZT2c8AvvypXUQtfcN0QRG4p0xO_zj9ZIsRf7K6dZzbX-xa46J3P0eFQ0kLuhVHTRsjcmsyKsn-22bsv4AD5zARHTzG7BNml1U3ngF2NPeYBsk91VVJ4VECmF2zTeq4Pl9tet2K82kfxyDPHMaeHWvg--QVdIxcrmTluEAJtA"};
const mockedResponse: AxiosResponse = {
  data: responseData,
  status: 200,
  statusText: "OK",
  headers: {},
  config: {},
};

mockedAxios.post.mockResolvedValue(mockedResponse);

var body = <Authentication>
{
  VaultGuid : "abc46169-67e7-46da-9079-2f1108da0670",
  Username : "my username",
  Password : "my password",
  SessionID : "mySessionId",
  Expiration : new Date()
};


it('authentication using credentials', async () => {    
    const data = await new MFWSClient().AuthenticateUsingCredentials(body);
   const response = responseData;
   expect(data).toStrictEqual(response);
  });