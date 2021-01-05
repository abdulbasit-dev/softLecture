import React from 'react';
import { Link } from 'react-router-dom';

import './CardComponent.css';

function CardComponent({ text }) {
  return (
    <Link to={`subjects/${text}_stage`}>
      <div className="card hover:bg-indigo-500 flex justify-center items-center mx-auto">
        <h1 className="card__title">{text} Stage</h1>
      </div>
    </Link>
  );
}

export default CardComponent;
