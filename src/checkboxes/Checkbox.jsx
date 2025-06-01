import React, { useId } from 'react';
import styled from 'styled-components';


const Checkbox = ({ defaultChecked = true, size= 27}) => {
  const uniqueId = useId();

  return (
    <StyledWrapper>
      <input
        className="hidden-xs-up custom-cbx"
        id={uniqueId}
        type="checkbox"
        defaultChecked={defaultChecked}
      />
      <label className="cbx" htmlFor={uniqueId} />
    </StyledWrapper>
  );
};


const StyledWrapper = styled.div`
  .cntr {
    position: relative;
  }

  .hidden-xs-up {
    display: none !important;
  }

  .cbx {
    position: relative;
    top: 1px;
    width: 17px;
    height: 17px;
    border: 1px solid #475569;
    border-radius: 10px;
    transition: background 0.2s ease;
    cursor: pointer;
    display: block;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  }

  input.custom-cbx:checked + .cbx {
    border-color: transparent;
    background:rgb(77, 134, 255);
    animation: jelly 0.4s ease;
  }

  input.custom-cbx:checked + .cbx::after {
    opacity: 1;
    transform: rotate(45deg) scale(1);
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

export default Checkbox;
