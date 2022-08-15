import React from 'react';
import { useDispatch } from 'react-redux';

function Filter({ label, options, dispatchHandler, eventHandler }) {
  const dispatch = useDispatch();

  const handleFilter = e => {
    const { value } = e.target;
    console.log(value)
    if (dispatchHandler) dispatch(dispatchHandler(value));
    eventHandler(value);
    
  };
  
  return (
    <div>
      <select onChange={e => handleFilter(e)}>
        <option>{`${label} `}</option>
        {options?.map((value, idx) => (
          <option key={idx} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
