import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createClient } from './api';

describe('createClient', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);

    mock.onPost('/users').reply(200, {
      id: 153,
      name: 'John Doe',
      companyValuation: 1000000,
      salary: 50000,
      createdAt: "2024-12-01T05:22:47.179Z",
      updatedAt: "2024-12-01T05:22:47.179Z",
    });
  });

  afterEach(() => {
    mock.restore();
  });

  it('deve criar um cliente com sucesso', async () => {
    const clientData = { name: 'Vanessa 193', companyValuation: 1000000, salary: 50000 };

    const result = await createClient(clientData);
    console.log(result);
    expect(result).toEqual({
      id: expect.any(Number),
      name: clientData.name,
      companyValuation: clientData.companyValuation,
      salary: clientData.salary,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

     expect(mock.history.post.length).toBe(0);
    //  expect(mock.history.post[0].url).toBe('/users');
     console.log(mock)
  });
});
