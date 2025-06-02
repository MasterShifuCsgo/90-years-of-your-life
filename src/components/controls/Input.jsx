import React from 'react';
import styled from 'styled-components';

const Input = ({ title, desc, name, type = 'text', value, onChange }) => { // Lisa 'value' ja 'onChange' atribuudid siia
  return (
    <StyledWrapper>
      <div className="coolinput">
        <label htmlFor={name} className="text">{title}</label> {/* Kasuta 'name' 'htmlFor' jaoks */}
        <input
          type={type}
          placeholder={desc}
          name={name}
          className="input"
          value={value} // Seo input olekuga
          onChange={onChange} // Uuenda olekut muutumisel
          
        />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .coolinput {
    display: flex;
    flex-direction: column;
    width: fit-content;
    position: static;
    max-width: 100%;
  }

  .coolinput label.text {
    font-size: 0.75rem;
    color: rgb(122, 122, 122);
    font-weight: 700;
    position: relative;
    top: 0.5rem;
    margin: 0 0 0 7px;
    padding: 0 3px;
    background: #FFFFFF;
    width: fit-content;
  }

  .coolinput .input {
    padding: 11px 10px;
    font-size: 0.75rem;
    border: 2px rgb(175, 175, 175) solid;
    border-radius: 5px;
    background: #FFFFFF;
    width: 100%;
  }

  .coolinput .input:focus {
    outline: none;
  }
`;

export default Input;