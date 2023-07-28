import {UserType} from "./user";

/**
 *队伍类别
 */
export type TeamType = {
    id: number;
    name: string;
    description: string;
    expireTime?: Date;
    maxNum: number;
    password: string;
    //枚举值更规范
    status: number;
    createTime: Date;
    updateTime: Date;
    createUser?: UserType;
};