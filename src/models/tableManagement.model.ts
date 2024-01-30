import { Document, Schema, model } from 'mongoose';
import { TableManagementEnum } from '../enums';

export interface TypeTableManagement {
    tableName: string;
    minimumPoints: number;
    goldCoins: number;
    rakePercent: number;
    variation: string;
}

interface ITableManagement extends TypeTableManagement, Document { }

const TableManagementSchema = new Schema<ITableManagement>(
    {
        tableName: { type: String, required: true, },
        minimumPoints: { type: Number, required: true, min: 0 },
        goldCoins: { type: Number, required: true, min: 0 },
        rakePercent: { type: Number, required: true, min: 0 },
        variation: { type: String, required: true, enum: TableManagementEnum },
    },
    {
        timestamps: true,
    }
);

const TableManagementModel = model<ITableManagement>('TableManagement', TableManagementSchema);
export default TableManagementModel;
