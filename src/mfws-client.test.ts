import { Authentication } from './interfaces/authentication';
import {MFWSClient} from './mfws-client'
import axios, { AxiosResponse } from "axios";
import { Vault } from './interfaces/vault';
import { PluginInfoConfiguration } from './interfaces/plugin-information-configuration';

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;


it('authentication using credentials', async () => {    
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

   const data = await new MFWSClient().AuthenticateUsingCredentials(body);
   const response = responseData;
   expect(data).toStrictEqual(response);
  });



it('authentication using single sign on', async () => {    
  const responseData={Value:"r2vrt41UpV7iZvjRkhcb0GyH45yKvXtZhlT-GUXaAU0tqWGuZdkTBSFGvrNix9O2TQs-qKqxYbp8PbcrYFIs_6wTScnJlA36tOXtt0ORvfhvQFBkfwnyUP94jhVNE5y3VHPUyM-k1Hsm1l51N7ZN1rvIQhnE3xvV-mcroR-BmVYqO-ZT2c8AvvypXUQtfcN0QRG4p0xO_zj9ZIsRf7K6dZzbX-xa46J3P0eFQ0kLuhVHTRsjcmsyKsn-22bsv4AD5zARHTzG7BNml1U3ngF2NPeYBsk91VVJ4VECmF2zTeq4Pl9tet2K82kfxyDPHMaeHWvg--QVdIxcrmTluEAJtA"};
  const mockedResponse: AxiosResponse = {
    data: responseData,
    status: 200,
    statusText: "OK",
    headers: {},
    config: {},
  };

   mockedAxios.get.mockResolvedValue(mockedResponse);  
   const vaultGUID = "abc46169-67e7-46da-9079-2f1108da0670";

   const data = await new MFWSClient().AuthenticateUsingSingleSignOn(vaultGUID);
   const response = responseData;
   expect(data).toStrictEqual(response);
  });


  it('get online vaults', async () => {    
    const responseData:Vault[]=[
      {Authentication:"1",GUID:"abc46169-67e7-46da-9079-2f1108da0670",Name:"V1"},
    {Authentication:"1",GUID:"abc46169-67e7-46da-9079-2f1108da0671",Name:"V2"}]
    const mockedResponse: AxiosResponse = {
      data: responseData,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    };
  
     mockedAxios.get.mockResolvedValue(mockedResponse);  
  
     const data = await new MFWSClient().GetOnlineVaults();
     const response = responseData;
     expect(data).toStrictEqual(response);
    });

    it('get authentication plugin configuration', async () => {    
      const responseData:PluginInfoConfiguration[]=[
        {VaultGuid:"abc46169-67e7-46da-9079-2f1108da0620",
        AssemblyName:"1",
        BridgeClassName:"test-bridge",
        Protocol:"V1",
        IsDefault:false,
        Configuration:{"aa":"ff"},
        ConfigurationSource:{"ab":"cd"},
        IsScopeIndependent:false,
        Name:"test"
      },
      {VaultGuid:"aac46169-67e7-46da-9079-2f1108da0620",
      AssemblyName:"2",
      BridgeClassName:"test-bridge2",
      Protocol:"V2",
      IsDefault:false,
      Configuration:{"xx":"yy"},
      ConfigurationSource:{"hh":"ii"},
      IsScopeIndependent:false,
      Name:"test2"
    }]
      const mockedResponse: AxiosResponse = {
        data: responseData,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      };
      const vaultGUID = "abc46169-67e7-46da-9079-1f1108da0670";
       mockedAxios.get.mockResolvedValue(mockedResponse);  
    
       const data = await new MFWSClient().GetAuthenticationPlugins(vaultGUID);
       const response = responseData;
       expect(data).toStrictEqual(response);
      });

      
it('logout', async () => {    
  const mockedResponse: AxiosResponse = {
    data:{},
    status: 200,
    statusText: "OK",
    headers: {},
    config: {},
  };

   mockedAxios.delete.mockResolvedValue(mockedResponse);  

   const data = await new MFWSClient().Logout();
   const response = {};
   expect(data).toStrictEqual(response);
  });
