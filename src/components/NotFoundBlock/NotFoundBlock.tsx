import React from 'react';
import styles from './NotFoundBlock.module.scss';


const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>{"Ничего не найдено :("}</h1>
      <p className={styles.text}>К сожалению такой страницы у нас нету</p>
    </div>
  )
}

export default NotFoundBlock
