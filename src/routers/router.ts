import { TableManagementRouter } from './tableManagement.router';
import { UserRouter } from './user.router'
import { Elysia } from 'elysia';

export const InitialRouter = (app: Elysia) => {
    UserRouter(app);
    TableManagementRouter(app);
}