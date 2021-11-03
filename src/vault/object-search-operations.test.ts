import axios, { AxiosResponse } from 'axios'
import { MFWSClient } from '../mfws-client'
import { ObjectVersion } from '../types/object-version'


jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

it('search for object by string', async () => {
    const responseData = [new ObjectVersion()];
    const mockedResponse: AxiosResponse = {
      data: responseData,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    }
  
    mockedAxios.get.mockResolvedValue(mockedResponse);
  
    const data = await new MFWSClient().ObjectSearchOperations.SearchForObjectsByString("hello world")
    const response = responseData
    expect(data).toStrictEqual(response)
  })