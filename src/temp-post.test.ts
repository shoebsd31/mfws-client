import {TempPost} from './temp-post'

it('works with async/await', async () => {    
    const data = await new TempPost().testPost();
   const response = `{body: 'bar', id: 101, title: 'foo', userId: 1}`;
    expect(data).not.toBe(null)
  });