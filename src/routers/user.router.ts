import { Elysia } from 'elysia';
import { UsersController } from "../controllers/user.controller";
export const UserRouter = (app: Elysia) => {
    return app.group('/api/user', (app: any) => UsersController(app))
}
