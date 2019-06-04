import { Item } from './item';

export class Order {
    id: string;
    status: string;
    orderItems: Item[];
    comment: string;
    billing: {
        username: string;
        email: string;
        phone: string;
        areacode: number;
        building: string;
        street: string;
        district: string;
        region: string
    };
    delivery: {
        deliveryMethod: string;
        status: string;
        date: string;
    };
    payment: {
        status: string;
        transaction_id: string;
        paymentMethod: string
    };
    created_at: string;
    tax: number;
    shipping: number;
    subtotal: number;
    bonus: number;
    discount: string;
    total: number;
}