import filter from "./slices/filter/slice";
import basketSlice from "../redux/slices/basket/slice";
import pizzas from "./slices/pizza/slice"
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        filter,
        basketSlice,
        pizzas
    },
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

