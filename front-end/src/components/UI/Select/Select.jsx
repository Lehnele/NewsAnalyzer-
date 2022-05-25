import React from 'react';
import './Select.css';

const Select = (props) => {
    return (
        <div className='Select'>
            <label>
                {props.label}
                <select
                    value={props.value}
                    onChange={props.onChange}
                >
                    {props.items.map((option, index) => {
                        return (
                            <option
                                value={option.value}
                                key={option.value + index}
                            >
                                {option.text}
                            </option>
                        )
                    })}
                </select>
            </label>
        </div>
    );
};

export default Select;