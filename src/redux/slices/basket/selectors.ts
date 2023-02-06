import { RootState } from "../../store";

export const basketSelector = (state: RootState) => state.basketSlice;
export const basketItemSelector = (id: string) => 
(state: RootState) => state.basketSlice.items.find((obj) => obj.id === id)