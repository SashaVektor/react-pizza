import React from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filter/slice';

const Search: React.FC = () => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState<string>('');
    const inputRef = React.useRef<HTMLInputElement>(null);

    const onClickClear = () => {
        dispatch(setSearchValue(''));
        setValue('');
        // первый способ
        if (inputRef.current) {
            inputRef.current.focus();
        }
       // второй способ inputRef.current?.focus()
    }

    const updateSearchValue = React.useCallback(debounce((str: string) => {
        dispatch(setSearchValue(str));
    }, 500), [])

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    }

    return (
        <div className={styles.root}>
            <img className={styles.icon} src="/images/search.svg" alt="search" />
            <input onChange={onChangeInput}
                ref={inputRef}
                className={styles.input} placeholder='Поиск пиццы...'
                value={value} />
            {value && <img className={styles.clearIcon} src="images/close-img.svg" alt="" onClick={onClickClear} />}
        </div>
    )
}

export default Search

