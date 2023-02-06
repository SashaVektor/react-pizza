import React from "react";

type CategoryProps = {
  value: number;
  onChangeCategory: (i: number) => void;
}

const categories: string[] = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые'
]

const Category: React.FC<CategoryProps> = React.memo(({ value, onChangeCategory }) => {

  return (
    <div className="categories">
      <ul>
        {
          categories.map((categoryName: string, i: number) => (
            <li key={i} onClick={() => onChangeCategory(i)} className={value === i ? 'active' : ''}>{categoryName}</li>))
        }
      </ul>
    </div >
  );
})

export default Category;
