import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Radio = ({ options = [], onSelect }) => {
  // `initialDisplayedValue` will be 'January' if options starts with it.
  const initialDisplayedValue = options.length > 0 ? options[0] : 'Select';

  const [open, setOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState('auto');
  const [selectedValue, setSelectedValue] = useState(initialDisplayedValue);
  const measureRef = useRef(null);
  const wrapperRef = useRef(null);

  // Trigger onSelect with 'null' on initial mount.
  // This tells the parent: "I'm displaying January, but no actual month has been selected yet."
  useEffect(() => {
    if (typeof onSelect === 'function') {
      onSelect(null); // Send null for the "unselected" state on component mount
    }
  }, []); // Runs only once on mount

  // Calculate maximum width for the dropdown menu
  useEffect(() => {
    if (measureRef.current) {
      const max = Array.from(measureRef.current.children).reduce((acc, child) => {
        return Math.max(acc, child.offsetWidth);
      }, 0);
      setMaxWidth(`${max + 40}px`); // + padding + arrow buffer
    }
  }, [options]);

  // Detect clicks outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  // Handle option click
  const handleOptionClick = (option) => {
    setSelectedValue(option); // Update the displayed value

    let monthNumberToSend = null; // Default to null for unselected state

    const selectedIndex = options.indexOf(option);

    if (selectedIndex !== -1) {
      // If the option is found, calculate its 1-based month number.
      // E.g., 'January' (index 0) becomes 1. 'February' (index 1) becomes 2.
      monthNumberToSend = selectedIndex + 1;
    }
    // If selectedIndex is -1 (shouldn't happen if `options` are always present)
    // or if `option` itself is not truly selectable (e.g., a "Select" placeholder, if you had one),
    // then `monthNumberToSend` remains null.

    console.log("Radio component sends (on click):", monthNumberToSend); // Debugging
    onSelect(monthNumberToSend); // Pass the numeric month or null
    setOpen(false);
  };

  return (
    <>
      {/* Hidden area for width calculation */}
      <div
        style={{
          visibility: 'hidden',
          position: 'absolute',
          left: -9999,
          top: -9999,
          whiteSpace: 'nowrap',
          fontSize: '15px',
          fontFamily: 'inherit',
        }}
        ref={measureRef}
      >
        {options.map((opt, i) => (
          <div key={i} style={{ padding: '5px' }}>{opt}</div>
        ))}
      </div>

      <StyledWrapper className={open ? 'open' : ''} $maxWidth={maxWidth} ref={wrapperRef}>
        <div className="select" style={{ marginTop: "14px" }} onClick={() => setOpen((prev) => !prev)}>
          <div className="selected">
            {selectedValue}
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className="arrow">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
          </div>

          <div className="options">
            {options.map((option, index) => (
              <div key={index} title={`option-${index}`}>
                <input
                  id={`option-${index}`}
                  name="option"
                  type="radio"
                  checked={selectedValue === option}
                  onChange={() => handleOptionClick(option)}
                />
                <label className="option" htmlFor={`option-${index}`} data-txt={option}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      </StyledWrapper>
    </>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;

  .select {
    position: relative;
    cursor: pointer;
    color: white;
    width: ${(props) => props.$maxWidth};
  }

  .selected {
    background-color: #2a2f3b;
    padding: 5px;
    border-radius: 5px;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 2;
    width: 100%;
  }

  .arrow {
    width: 25px;
    height: 10px;
    fill: white;
    transform: rotate(-90deg);
    transition: 300ms;
  }

  .options {
    display: none;
    flex-direction: column;
    border-radius: 5px;
    padding: 5px;
    background-color: #2a2f3b;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1;
    width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  &.open .options {
    display: flex;
  }

  &.open .arrow {
    transform: rotate(0deg);
  }

  .option {
    border-radius: 5px;
    padding: 5px;
    background-color: #2a2f3b;
    font-size: 15px;
    width: 100%;
  }

  .option:hover {
    background-color: #323741;
  }

  .options input[type="radio"] {
    display: none;
  }

  .options input[type="radio"]:checked + label {
    display: none;
  }
`;

export default Radio;