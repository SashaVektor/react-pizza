import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../../utils/calcTotalPrice";
import { getBasketFromLs } from "../../../utils/getBasketFromLS";
import { BasketItem, BasketSliceState } from "./types";

const initialState: BasketSliceState = getBasketFromLs();

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<BasketItem>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id);
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                });
            }
            state.totalPrice = calcTotalPrice(state.items)
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload);
            if (findItem) {
                findItem.count--;
            }
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(obj => obj.id !== action.payload)
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        },

    }
});


export const { addItem, removeItem, clearItems, minusItem } = basketSlice.actions;
export default basketSlice.reducer;
