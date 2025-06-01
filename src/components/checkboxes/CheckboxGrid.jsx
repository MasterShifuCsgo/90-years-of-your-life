import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import Checkbox from './Checkbox.jsx'; 
import {LIFE_STAGES} from '../../Context.jsx';


const TOTAL_ITEMS = 4680; 
const BATCH_SIZE = 500; 

const CheckboxGrid = ({ activeCount = 0 }) => {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const handleScrollRef = useRef();

  useEffect(() => {
    const newVisibleCount = Math.min(
      Math.max(BATCH_SIZE, activeCount),
      TOTAL_ITEMS
    );
    setVisibleCount(newVisibleCount);

    window.scrollTo(0, 0);
  }, [activeCount]);

  handleScrollRef.current = useCallback(() => {
    const bottomReached =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

    if (bottomReached && visibleCount < TOTAL_ITEMS) {
      setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, TOTAL_ITEMS));
    }
  }, [visibleCount]);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollRef.current);

    return () => window.removeEventListener('scroll', handleScrollRef.current);
  }, []);

  const getCheckboxColor = useCallback((weekIndex) => {
    for (const stage of LIFE_STAGES) {
      if (weekIndex >= stage.startWeek && weekIndex < stage.endWeek) {
        return stage.color;
      }
    }
    return '#ccc';
  }, []);

  return (
    <>
    <div style={{fontFamily: 'Inter, sans-serif' }}>
      <div
        style={{
          display: 'flex',
          justifyContent:'center',
          flexWrap: 'wrap',
          gap: '2.4px', 
        }}
      >
        {Array.from({ length: visibleCount }, (_, i) => (
          <Checkbox
            key={i}
            checked={i < activeCount}            
            color={getCheckboxColor(i)} 
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default CheckboxGrid;