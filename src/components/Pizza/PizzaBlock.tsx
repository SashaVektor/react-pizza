import React from "react";

type PizzaBlockProps = {
  title: string;
  imageUrl: string;
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({ title, imageUrl }) => {

  return (
      <div className="pizza-block">
        <img
          className="pizza-block__image"
          src={imageUrl}
          alt="Pizza"
        />
        <h4 className="pizza-block__title">{title}</h4>
      </div>
  );
};

export default PizzaBlock;
