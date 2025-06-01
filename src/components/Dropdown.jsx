import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Radio = ({ options = [], onSelect}) => {
  const firstOption = options[0] || 'Select';
  const [open, setOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState('auto');
  const [selectedValue, setSelectedValue] = useState(firstOption); // Uus olek valitud väärtuse hoidmiseks
  const measureRef = useRef(null);
  const wrapperRef = useRef(null); // Ref välise klõpsu tuvastamiseks
  
  // Arvutab menüü maksimaalse laiuse vastavalt valikute pikkusele
  useEffect(() => {
    if (measureRef.current) {
      const max = Array.from(measureRef.current.children).reduce((acc, child) => {
        return Math.max(acc, child.offsetWidth);
      }, 0);
      setMaxWidth(`${max + 40}px`); // + puhver polstri + noole jaoks
    }
  }, [options]);

  // Väljaspool klõpsamise tuvastamine
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Kui klõpsati väljaspool komponenti, sulge menüü
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      // Lisame sündmuse kuulaja ainult siis, kui menüü on avatud
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      // Eemaldame sündmuse kuulaja, kui menüü on suletud
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Puhastusfunktsioon: eemaldab sündmuse kuulaja komponendi eemaldamisel
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]); // Käivitub, kui 'open' olek muutub

// Käsitleb valiku klõpsamist
const handleOptionClick = (option) => {
  setSelectedValue(option); // Uuendab valitud väärtust

  // Leia valitud kuunime indeks 'options' massiivist
  const monthIndex = options.indexOf(option);

  let monthNumber = null;
  if (monthIndex !== -1) { // Kontrolli, et kuunimi leiti massiivist
    monthNumber = monthIndex + 1; // Lisa 1, et saada 1-12 number    
  }
  
  onSelect(monthNumber);
  setOpen(false); // Sulgeb menüü pärast valimist
};

  return (
    <>
      {/* Peidetud ala maksimaalse laiuse arvutamiseks */}
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
  {/* Eemalda style={{display: "flex", alignItems:"flex-end"}} siit */}
  <div className="select" style={{marginTop:"14px"}} onClick={() => setOpen((prev) => !prev)}>
    <div className="selected">
      {selectedValue} {/* Kuvab valitud väärtuse otse Reactist */}
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

  display:flex;
  align-items:center;

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
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
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

  /* EEMALDATUD: See oli põhjus, miks tekst kahekordselt ilmus */
  /* .options label::before {
    content: attr(data-txt);
  } */

  .options input[type="radio"]:checked + label {
    display: none; /* See peidab valitud valiku labeli valikute loendist */
  }
`;

export default Radio;