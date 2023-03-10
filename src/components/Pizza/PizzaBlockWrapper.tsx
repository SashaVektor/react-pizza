import React from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../redux/slices/basket/slice";
import PizzaBlock from './PizzaBlock';
import { basketItemSelector } from '../../redux/slices/basket/selectors';
import { BasketItem } from '../../redux/slices/basket/types';

const typeNames = ['тонкое', 'традиционное'];

type PizzaBlockWrapperProps = {
    title: string, 
    price: number, 
    imageUrl:string, 
    sizes:number[], 
    types:number[], 
    id:string
}

const PizzaBlockWrapper: React.FC<PizzaBlockWrapperProps> = ({ title, price, imageUrl, sizes, types, id }) => {
    const dispatch = useDispatch();
    const basketItem = useSelector(basketItemSelector(id));
    const [activeType, setActiveType] = React.useState<number>(0);
    const [activeSize, setActiveSize] = React.useState<number>(0);

    const addedCount = basketItem ? basketItem.count : 0;

    const onClickAdd = () => {
        const item: BasketItem = {
            id,
            title,
            price,
            imageUrl,
            type: typeNames[activeType],
            size: sizes[activeSize],
            count: 0,
        };
        dispatch(addItem(item))
    }

    return (
        <div className="pizza-block-wrapper">
            <Link key={id} to={`/pizza/${id}`}><PizzaBlock title={title} imageUrl={imageUrl}/></Link>
            <div className="pizza-block__selector">
                <ul>
                    {types.map((typeId) => <li key={typeId} onClick={() => setActiveType(typeId)} className={activeType === typeId ? 'active' : ''}>{typeNames[typeId]}</li>)}
                </ul>
                <ul>
                    {sizes.map((size, index) => <li key={index} onClick={() => setActiveSize(index)} className={activeSize === index ? 'active' : ''}>{size} см.</li>)}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {price} ₽</div>
                <div
                    className="button button--outline button--add"
                    onClick={onClickAdd}
                >
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    {addedCount > 0 && <i>{addedCount}</i>}
                </div>
            </div>
        </div>
    )
}

export default PizzaBlockWrapper
