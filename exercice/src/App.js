import React, { useState } from 'react';

const ParentComponent = () => {
  const [child1Input, setChild1Input] = useState('');
  const [child2Input, setChild2Input] = useState('');
  const [isAllChildrenFilled, setIsAllChildrenFilled] = useState(false);

  const handleChild1InputChange = (e) => {
    setChild1Input(e.target.value);
    setIsAllChildrenFilled(child2Input !== '' && e.target.value !== '');
  };

  const handleChild2InputChange = (e) => {
    setChild2Input(e.target.value);
    setIsAllChildrenFilled(child1Input !== '' && e.target.value !== '');
  };

  return (
    <div style={{ backgroundColor: isAllChildrenFilled ? 'green' : 'red', padding: '20px', width: '400px' }}>
      <ChildComponent inputValue={child1Input} onInputChange={handleChild1InputChange} />
      <ChildComponent inputValue={child2Input} onInputChange={handleChild2InputChange} />
    </div>
  );
};

const ChildComponent = ({ inputValue, onInputChange }) => {
  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={onInputChange}
        placeholder="Enter value"
        style={{ marginRight: '10px' }}
      />
    </div>
  );
};

export default ParentComponent;
