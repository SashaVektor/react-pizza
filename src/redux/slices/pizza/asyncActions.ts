import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pizzasLink } from "./slice";
import { PizzaItem, SearchPizzaParams } from "./types";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params: SearchPizzaParams) => {
        const { order, sortBy, category, search, currentPage } = params;
        const { data } = await axios.get<PizzaItem[]>(
            `${pizzasLink}?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        );
        return data as PizzaItem[];
    }
)