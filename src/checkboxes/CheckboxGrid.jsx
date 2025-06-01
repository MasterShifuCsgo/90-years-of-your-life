import React, { useState, useEffect } from 'react';
import Checkbox from './Checkbox';

const TOTAL_ITEMS = 4680;
const BATCH_SIZE = 312;

const CheckboxGrid = ({ activeCount = 0 }) => {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const handleScroll = () => {
    const bottomReached =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
    if (bottomReached && visibleCount < TOTAL_ITEMS) {
      setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, TOTAL_ITEMS));
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleCount]);

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      padding: '16px'
    }}>
      {Array.from({ length: visibleCount }, (_, i) => (
        <Checkbox key={i} checked={i < activeCount} size={27}/>
      ))}
    </div>
  );
};

export default CheckboxGrid;
