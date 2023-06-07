import React from 'react';

const CustomDebbugger = ({ value }) => {
  return (
    <div
      style={{
        position: 'fixed',
        right: '50px',
        top: '100px',
        height: '500px',
        width: '675px',
        zIndex: 100,
        overflow: 'scroll',
        background: '#fbf8f4',
      }}
    >
      <pre className="w-full">{JSON.stringify(value, null, 2)}</pre>
    </div>
  );
};

export default CustomDebbugger;
