import { Authentication } from './interfaces/authentication';
import {TempPost} from './temp-post'
import axios, { AxiosResponse } from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockedResponse: AxiosResponse = {
  data: <Authentication>{Value:"r2vrt41UpV7iZvjRkhcb0GyH45yKvXtZhlT-GUXaAU0tqWGuZdkTBSFGvrNix9O2TQs-qKqxYbp8PbcrYFIs_6wTScnJlA36tOXtt0ORvfhvQFBkfwnyUP94jhVNE5y3VHPUyM-k1Hsm1l51N7ZN1rvIQhnE3xvV-mcroR-BmVYqO-ZT2c8AvvypXUQtfcN0QRG4p0xO_zj9ZIsRf7K6dZzbX-xa46J3P0eFQ0kLuhVHTRsjcmsyKsn-22bsv4AD5zARHTzG7BNml1U3ngF2NPeYBsk91VVJ4VECmF2zTeq4Pl9tet2K82kfxyDPHMaeHWvg--QVdIxcrmTluEAJtA"},
  status: 200,
  statusText: "OK",
  headers: {},
  config: {},
};

mockedAxios.post.mockResolvedValue(mockedResponse);

it('works with async/await', async () => {    
    const data = await new TempPost().testPost();
   const response = <Authentication>{Value:"r2vrt41UpV7iZvjRkhcb0GyH45yKvXtZhlT-GUXaAU0tqWGuZdkTBSFGvrNix9O2TQs-qKqxYbp8PbcrYFIs_6wTScnJlA36tOXtt0ORvfhvQFBkfwnyUP94jhVNE5y3VHPUyM-k1Hsm1l51N7ZN1rvIQhnE3xvV-mcroR-BmVYqO-ZT2c8AvvypXUQtfcN0QRG4p0xO_zj9ZIsRf7K6dZzbX-xa46J3P0eFQ0kLuhVHTRsjcmsyKsn-22bsv4AD5zARHTzG7BNml1U3ngF2NPeYBsk91VVJ4VECmF2zTeq4Pl9tet2K82kfxyDPHMaeHWvg--QVdIxcrmTluEAJtA"};
   expect(data).toStrictEqual(response);
  });