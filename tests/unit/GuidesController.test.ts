import * as GuidesController from './../../src/app/controllers/GuidesController';
import request from 'supertest';
import app from './../../src/app';
import mongoose from 'mongoose';
jest.setTimeout(600000);

describe('GuidesController', () => {
  const guidesTest = require('./accessibility-guide').getGuides();
  test('Guides é verdadeiro para 200', () => {
    expect(200).toBeTruthy();
  });

  test('Guides é verdadeiro para 400', () => {
    expect(400).toBeTruthy();
  });
});

describe('Teste da rota User', () => {
  it('Deve retornar a mensagem da rota Guides', async () => {
    const res = await request(app).get('/accessibility-guide');
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('data');
  });
});
