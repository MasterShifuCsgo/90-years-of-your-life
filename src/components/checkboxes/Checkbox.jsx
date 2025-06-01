import React, { useId } from 'react';
import styled from 'styled-components';

const Checkbox = ({ checked = false, size = 27, color = '#4d86ff' }) => { // Renamed component to start with capital 'C'
  const uniqueId = useId();

  return (
    // FIX: Pass 'color' as a transient prop '$checkedColor'
    <StyledWrapper size={size} $checkedColor={color}> 
      <input
        className="hidden-xs-up custom-cbx"
        id={uniqueId}
        type="checkbox"
        checked={checked}
        readOnly
      />
      <label className="cbx" htmlFor={uniqueId} />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .cbx {
    position: relative;
    top: 1px;
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    border: 1px solid #475569;
    border-radius: 10px;
    transition: background 0.2s ease;
    cursor: pointer;
    display: block;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  }

  .cntr {
    position: relative;
  }

  .hidden-xs-up {
    display: none !important;
  }

  input.custom-cbx:checked + .cbx {
    border-color: transparent;
    // FIX: Use the transient prop '$checkedColor' here
    background: ${(props) => props.$checkedColor}; 
    animation: jelly 0.4s ease;
  }

  @keyframes jelly {
    from { transform: scale(1, 1); }
    20% { transform: scale(1.3, 0.7); }
    40% { transform: scale(0.7, 1.3); }
    60% { transform: scale(1.1, 0.9); }
    80% { transform: scale(0.9, 1.1); }
    to { transform: scale(1, 1); }
  }
`;

export default Checkbox; // Export with capital 'C'