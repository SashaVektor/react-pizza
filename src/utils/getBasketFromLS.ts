import { BasketItem } from "../redux/slices/basket/types";
import { calcTotalPrice } from "./calcTotalPrice";

export const getBasketFromLs = () => {
    const data = localStorage.getItem('basket');
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items);

        return {
            items: items as BasketItem[],
            totalPrice,
        }
}