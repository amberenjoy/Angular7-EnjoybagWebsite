/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 14:52:16
 * @LastEditTime: 2019-08-28 12:05:42
 * @LastEditors: Please set LastEditors
 */
import { Item } from './item';

export class Order {
    id?: string;
    status?: string;
    orderItems: Item[];
    comment: string;
    billing: {
        firstname: string;
        lastname: string;
        email: string;
        phone: string;
        areacode: number;
        oldAddress?: number;
    };
    address: {
        building: string;
        street: string;
        district: string;
        city: string
    }
    delivery: {
        deliveryMethod: string;
        deliveryStatus?: string;
        dispatchedDate?: string;
    };
    payment: {
        paymentStatus?: string;
        transaction_id: string;
        paymentMethod: string
    };
    tax?: number;
    shipping: number;
    subtotal: number;
    bonus: number;
    discount: string;
    total: number;
}