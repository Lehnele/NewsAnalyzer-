import React from 'react';
import './Input.css';

const Input = props => {
  const inputType = props.type || 'text'
  const htmlFor = `${inputType}-${Math.random()}`


  return (
    <div className='Input'>
      <label htmlFor={htmlFor}>
        { props.label }
      </label>
        <input
          type={inputType}
          id={htmlFor}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          step={props.step}
          min={props.min}
          max={props.max}
          required
        />
    </div>
  );
};

export default Input;