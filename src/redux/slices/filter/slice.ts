import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../store";
import { FilterSliceState, SortPropEnum, SortState } from "./types";


const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProp: SortPropEnum.RATING_DESC,
    }
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setSort(state, action: PayloadAction<SortState>) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            if (Object.keys(action.payload).length) {
                state.currentPage = Number(action.payload.currentPage);
                state.sort = action.payload.sort;
                state.categoryId = Number(action.payload.categoryId);
            }
            else {
                state.currentPage = 1;
                state.categoryId = 0;
                state.sort = {
                    name: 'популярности',
                    sortProp: SortPropEnum.RATING_DESC,
                }
            }
        }
    }
});

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export const filterSelector = (state: RootState) => state.filter;
export const sortSelector = (state: RootState) => state.filter.sort;

export default filterSlice.reducer;