import UserModel, { TypeUser } from "../models/user.model";

export const LogIn = async (data: TypeUser, jwt: any) => {
    const checkUser = await UserModel.findOne({ userName: data.userName });
    if (!checkUser) {
        return {
            status: false,
            message: "Username not found"
        }
    }
    const checkHashPassword = await Bun.password.verify(data.password, checkUser.password);
    if (!checkHashPassword) {
        return {
            status: false,
            message: "Password is incorrect"
        }
    }
    const token = await jwt.sign({
        _id: checkUser._id,
        username: checkUser.userName,
    });
    return { status: true, data: token }
}