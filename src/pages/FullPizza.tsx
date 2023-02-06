import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { pizzasLink } from '../redux/slices/pizza/slice';
import {Link} from 'react-router-dom'

const FullPizza: React.FC = () => {
    const { id } = useParams();
    const [pizza, setPizza] = useState<{
        imageUrl: string,
        title: string,
        price: number,
    }>();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(`${pizzasLink}/${id}`);
                setPizza(data);
            }
            catch (err) {
                alert('Ошибка при получении пицц')
                navigate('/')
            }
        }

        fetchPizza();
    }, [id])

    if (!pizza) {
        return <>Loading...</>
    }

    return (
        <div className='container'>
            <img src={pizza.imageUrl} alt="pizza" />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} $</h4>
            <Link to="/">
            <div className="button button--outline button--add">
                <span>Назад</span>
            </div>
            </Link>
        </div>
    )
}

export default FullPizza
