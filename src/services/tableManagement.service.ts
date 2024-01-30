import TableManagementModel, { TypeTableManagement } from "../models/tableManagement.model";

export const CreateTable = async (data: TypeTableManagement) => {
    const checkTable = await TableManagementModel.findOne({ tableName: data.tableName });
    if (checkTable) {
        return { status: false, message: "TableName is exist" }
    }
    const rs = await TableManagementModel.create(data)
    return { status: true, data: rs }
}

export const UpdateTable = async (id: string, data: TypeTableManagement) => {
    const checkTable = await TableManagementModel.findOne({ tableName: data.tableName });
    if (checkTable) {
        return { status: false, message: "TableName is exist" }
    }
    const rs = await TableManagementModel.findByIdAndUpdate(id, data, { new: true })
    return { status: true, data: rs }
}

export const DeleteTable = async (id: string) => {
    const checkTable = await TableManagementModel.findById(id);
    if (!checkTable) {
        return { status: false, message: "Table is not found" }
    }
    await TableManagementModel.findByIdAndDelete(id)
    return { status: true, message: "Delete success" }
}

export const FindOneTable = async (id: string) => {
    const checkTable = await TableManagementModel.findById(id);
    if (!checkTable) {
        return { status: false, message: "Table is not found" }
    }
    return { status: true, data: checkTable }
}

export const FindListTable = async (filter: any, page: number, limit: number) => {
    const Page: number = Number(page) || 1;
    const Limit: number = Number(limit) || 10;
    const condition: any = [];
    if (filter.tableName !== null) {
        condition.push({ tableName: filter.tableName });
    }
    if (filter.variation !== null) {
        condition.push({ variation: filter.variation });
    }
    const finalMatch = condition.length >= 2 ? { $and: condition, } : condition[0] ? condition[0] : {};
    const countPipeline = [{ $match: finalMatch }, { $count: 'count' }];
    const countResult = await TableManagementModel.aggregate(countPipeline);
    const totalDocs = countResult.length > 0 ? countResult[0].count : 0;
    const aggregationPipeline: any = [
        { $match: finalMatch },
        { $sort: { createdAt: -1 } },
        { $skip: (Page - 1) * Limit },
        { $limit: Limit },
    ];
    const rs = await TableManagementModel.aggregate(aggregationPipeline);
    return { status: true, count: totalDocs, data: rs }
}