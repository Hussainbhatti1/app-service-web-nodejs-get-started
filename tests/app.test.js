const request = require('supertest');
const app = require('../server');

describe('FocusBoard endpoints', () => {
  test('GET /health returns healthy', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('healthy');
  });

  test('GET /api/info returns app info', async () => {
    const response = await request(app).get('/api/info');
    expect(response.statusCode).toBe(200);
    expect(response.body.app).toBe('FocusBoard');
  });

  test('GET /api/quote returns a quote', async () => {
    const response = await request(app).get('/api/quote');
    expect(response.statusCode).toBe(200);
    expect(response.body.quote).toBeDefined();
  });
});
