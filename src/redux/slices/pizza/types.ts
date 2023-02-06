export type PizzaItem = {
    title: string,
    price: number,
    imageUrl: string,
    sizes: number[],
    types: number[],
    id: string
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export interface PizzaSliceState {
    items: PizzaItem[],
    status: Status,
}

export type SearchPizzaParams = {
    order: string, sortBy: string, category: string, search: string, currentPage: number
}