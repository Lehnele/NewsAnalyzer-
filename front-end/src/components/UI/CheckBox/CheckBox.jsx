import React from 'react';
import './CheckBox.css';

const CheckBox = props => {
    function renderCheckItems() {
        return props.items.map(check => {
            return (
                <div key={check.label}>
                    <label>
                        <input
                            type="checkbox"
                            id={check.label}
                            name={check.label}
                            onChange={() => props.checkBoxChangeHandler(check.label)}
                        />
                        {check.text}
                    </label>
                </div>
            )
        })
    }

    return (
        <div className='CheckBox'>
            <legend>{props.children}</legend>
            {renderCheckItems()}
        </div>
    );
};

export default CheckBox;