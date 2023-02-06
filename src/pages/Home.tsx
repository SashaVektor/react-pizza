import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import qs from 'qs';
import { useNavigate } from "react-router-dom";
import Category from "../components/Category"
import PizzaBlockWrapper from "../components/Pizza/PizzaBlockWrapper";
import PizzaSceletron from "../components/Pizza/PizzaSceletron";
import Pagination from "../components/Pagination/Pagination";
import Sort, { list } from "../components/Sort";
import { useAppDispatch } from "../redux/store";
import { filterSelector } from "../redux/slices/filter/selectors";
import { setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filter/slice";
import { pizzaItemsSelector } from "../redux/slices/pizza/selectors";
import { fetchPizzas } from "../redux/slices/pizza/asyncActions";
import { SearchPizzaParams } from "../redux/slices/pizza/types";



const Home: React.FC = () => {
    const navigate = useNavigate();
    const { categoryId, sort, currentPage, searchValue } = useSelector(filterSelector);
    const { items, status } = useSelector(pizzaItemsSelector);
    const dispatch = useAppDispatch();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);


    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
    }

    const onChangeCategory = React.useCallback((id: number) => {
        dispatch(setCategoryId(id));
    }, [])

    const getPizzas = async () => {
        const order = sort.sortProp.includes('-') ? 'asc' : 'desc';
        const sortBy = sort.sortProp.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(
            fetchPizzas({
            order,
            sortBy,
            category,
            search,
            currentPage,
        }));
        window.scrollTo(0, 0);
    }

    // Параметры вшиваються только после первого рендера
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProp: sort.sortProp,
                categoryId,
                currentPage,
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sort.sortProp, currentPage, searchValue])

    // Еслт был первый рендер, то проверяем URL параметры и сохраняем в REDUX
    useEffect(() => {
        if (window.location.search) {
            const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams;
            const sort = list.find(obj => obj.sortProp === params.sortBy)
         
            dispatch(setFilters({
                searchValue: params.search,
                categoryId: Number(params.category),
                currentPage: Number(params.currentPage),
                sort : sort || list[0],
            }))

            isSearch.current = true;
        }
    }, [])

    // Если был первый рендер, запрашиваем пиццы
    useEffect(() => {
        if (!isSearch.current) {
            getPizzas();
        }
        isSearch.current = false;
    }, [categoryId, sort.sortProp, currentPage, searchValue]);

    const sceletons = [...new Array(10)].map((_, i) => <PizzaSceletron key={i} />);
    const pizzas = items.map((obj: any) => <PizzaBlockWrapper key={obj.id} {...obj} />);

    return (
        <div className="container">
            <div className="content__top">
                <Category value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort value={sort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                (status === 'error') ? <div>
                    <h2 className="error__name">Ошибка при запросе пицц <span>😕</span></h2>
                </div> : <div className="content__items">
                    {status === 'loading' ? sceletons : pizzas}
                </div>
            }
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}
export default Home;
