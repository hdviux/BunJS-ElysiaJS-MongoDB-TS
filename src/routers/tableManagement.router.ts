import { Elysia } from 'elysia';
import { TableManagementController } from '../controllers/tableManagement.controller';
export const TableManagementRouter = (app: Elysia) => {
    return app.group('/api/tableManagement', (app: any) => TableManagementController(app)).onBeforeHandle(() => {
        console.log('1')
    })
}
