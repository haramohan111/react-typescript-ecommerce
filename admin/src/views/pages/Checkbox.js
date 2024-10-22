import React, { useState } from 'react';

function Checkbox({ name, checked, onChange }) {
  return (
    <div>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  );
}
export default Checkbox;