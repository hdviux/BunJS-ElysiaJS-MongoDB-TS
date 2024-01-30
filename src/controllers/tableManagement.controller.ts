import * as Srv from "../services/tableManagement.service";
import { Elysia, t } from 'elysia';
import { TypeTableManagement } from "../models/tableManagement.model";

export const TableManagementController = (app: Elysia) => {
    return app
        .post('/create', async ({ body }: { body: TypeTableManagement }) => {
            try {
                const rs = await Srv.CreateTable(body)
                if (rs.status) {
                    return { status: true, data: rs.data };
                } else {
                    return { status: false, message: rs.message };
                }
            } catch (error) {
                return { status: false, message: (error as Error).message }
            }
        }, {
            body: t.Object({
                tableName: t.String(),
                minimumPoints: t.Number(),
                goldCoins: t.Number(),
                rakePercent: t.Number(),
                variation: t.String()
            }),
            error({ error }) {
                const errorMessage = JSON.parse((error as Error).message)
                return { status: false, message: { type: errorMessage.type, at: errorMessage.at } }
            },
        }
        )
        .put('/update/:id', async ({ params: { id }, body }: { params: { id: string }, body: TypeTableManagement }) => {
            try {
                const rs = await Srv.UpdateTable(id, body)
                if (rs.status) {
                    return { status: true, data: rs.data };
                } else {
                    return { status: false, message: rs.message };
                }
            } catch (error) {
                return { status: false, message: (error as Error).message }
            }
        }, {
            body: t.Object({
                tableName: t.String(),
                minimumPoints: t.Number(),
                goldCoins: t.Number(),
                rakePercent: t.Number(),
                variation: t.String()
            }),
            error({ error }) {
                const errorMessage = JSON.parse((error as Error).message)
                return { status: false, message: { type: errorMessage.type, at: errorMessage.at } }
            }

        })
        .delete('/delete/:id', async ({ params: { id } }: { params: { id: string } }) => {
            try {
                const rs = await Srv.DeleteTable(id);
                if (rs.status) {
                    return { status: true, message: rs.message };
                } else {
                    return { status: false, message: rs.message };
                }
            } catch (error) {
                return { status: false, message: (error as Error).message }
            }
        }, {
            error({ error }) {
                const errorMessage = JSON.parse((error as Error).message)
                return { status: false, message: { type: errorMessage.type, at: errorMessage.at } }
            }

        })
        .get('/:id', async ({ params: { id } }: { params: { id: string } }) => {
            try {
                const rs = await Srv.FindOneTable(id);
                if (rs.status) {
                    return { status: true, data: rs.data };
                } else {
                    return { status: false, message: rs.message };
                }
            } catch (error) {
                return { status: false, message: (error as Error).message }
            }
        }, {
            error({ error }) {
                const errorMessage = JSON.parse((error as Error).message)
                return { status: false, message: { type: errorMessage.type, at: errorMessage.at } }
            }

        })
        .post('/list', async ({ query, body }) => {
            try {
                const filter = {
                    tableName: body.tableName,
                    variation: body.variation
                }
                const page: any = query.page;
                const limit: any = query.limit;
                const rs = await Srv.FindListTable(filter, page, limit);
                return { status: true, count: rs.count, data: rs.data };
            } catch (error) {
                return { status: false, message: (error as Error).message }
            }
        }, {
            body: t.Object({
                tableName: t.String(),
                variation: t.String()
            }),
            query: t.Object({
                page: t.String(),
                limit: t.String(),
            }),
            error({ error }) {
                const errorMessage = JSON.parse((error as Error).message)
                return { status: false, message: { type: errorMessage.type, at: errorMessage.at } }
            }

        })
}

