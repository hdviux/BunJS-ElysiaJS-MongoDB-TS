import { Document, Schema, model } from 'mongoose';

export interface TypeUser {
    userName: string;
    email: string;
    password: string;
}

interface IUser extends TypeUser, Document { }

const UserSchema = new Schema<IUser>(
    {
        userName: { type: String, required: true, },
        email: { type: String },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const UserModel = model<IUser>('User', UserSchema);
export default UserModel;

