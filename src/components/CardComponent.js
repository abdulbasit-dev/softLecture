import React from 'react';

import CardButton from './CardButton';

import './CardComponent.css';

function CardComponent({ text, subject }) {
  return (
    <div className="card">
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
  );
}

export default CardComponent;
