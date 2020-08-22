import 'reflect-metadata';
import express from 'express';

const app = express();
app.get(`/health`, (_, res: any): void => {
  res.send({ running: true });
});

export default app;
