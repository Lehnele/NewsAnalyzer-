import React from 'react';
import './CheckBox.css';

const CheckBox = props => {
  function renderCheckItems () {
    return props.options.map(check => {
      return (
        <div key={check.label} >
          <input
            type="checkbox"
            id={check.label}
            name={check.label}
            onChange={() => props.checkBoxChangeHandler(check.label)}
          />
          <label htmlFor={check.label}>{ check.text }</label>
        </div>
      )
    })
  }

  return (
    <div className='CheckBox'>
      <legend>{ props.children }</legend>
      { renderCheckItems() }
    </div>
  );
};

export default CheckBox;