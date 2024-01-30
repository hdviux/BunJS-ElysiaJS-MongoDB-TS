import { cors } from '@elysiajs/cors';
import * as db from "./configs/db.config";
import { Elysia } from 'elysia';
import { InitialRouter } from './routers/router';
import { jwt } from '@elysiajs/jwt';
import { logger } from '@grotto/logysia';
import config from './configs';

const startServer = async () => {
  try {
    console.info("Starting up...");
    await db.connect();
    await db.createAdmin();
  } catch (error) {
    console.error(error);
  } finally {
    const app = new Elysia();
    app.use(logger());
    app.use(cors({
      origin: "*",
      credentials: true,
    }));
    app.use(
      jwt({
        name: 'jwt',
        secret: String(process.env.TOKEN_SECRET),
        exp: '7y',
      })
    )
    InitialRouter(app);
    const PORT: number = config.PORT;
    app.listen(PORT)
    console.log(
      `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
    );
  }
}

startServer();

