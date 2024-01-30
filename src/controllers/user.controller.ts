import * as Srv from "../services/user.service";
import { Elysia, t } from 'elysia';
import { TypeUser } from "../models/user.model";

export const UsersController = (app: Elysia) => {
    return app
        .post('/login', async ({ body, jwt }: { body: TypeUser, jwt: any }) => {
            try {
                const rs = await Srv.LogIn(body, jwt)
                if (rs.status) {
                    return { status: true, data: rs.data };
                } else {
                    return { status: false, message: rs.message };
                }
            } catch (error) {
                return { status: false, message: (error as Error).message }
            }
        },
            {
                body: t.Object({
                    userName: t.String(),
                    password: t.String(),
                }),
                error({ error }) {
                    const errorMessage = JSON.parse((error as Error).message)
                    return { status: false, message: { type: errorMessage.type, at: errorMessage.at } }
                }

            }
        )
}

