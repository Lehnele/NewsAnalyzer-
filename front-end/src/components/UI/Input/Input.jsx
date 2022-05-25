import React from 'react';
import './Input.css';

const Input = props => {
  const inputType = props.type ?? 'text'

  return (
    <div className='Input'>
      <label>
        { props.label }
        <input
          type={inputType}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          step={props.step}
          min={props.min}
          max={props.max}
          required
        />
      </label>
    </div>
  );
};

export default Input;