import React from 'react';
import { Link } from 'react-router-dom';

import CardButton from './CardButton';

import './CardComponent.css';

function CardComponent({ text, subject }) {
  return (
    <Link to={`subjects/${text.trim()}`}>
      <div className="card hover:bg-indigo-500 cursor-pointer">
        <h1 className="card__title">{text}</h1>
        <CardButton text="Lectures" url="#" />
        {/* {subject && (
        <>
          <button className={`${subject && 'reduceSize'} classBtn `}>
            Lectures
          </button>
          <button>resorses</button>
        </>
      )} */}
      </div>
    </Link>
  );
}

export default CardComponent;
