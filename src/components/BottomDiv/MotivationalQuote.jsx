// src/components/MotivationalQuote.jsx
import React from 'react';
import styled from 'styled-components';

const QuoteText = styled.p`
  font-family: 'Inter', sans-serif; /* Your chosen font */
  font-size: 1.15rem; /* Slightly larger than body text */
  font-style: italic; /* For a reflective tone */
  text-align: center; /* Center the text */
  max-width: 600px; /* Keep it readable */
  margin: 40px auto 60px auto; /* Space it out and center horizontally */
  color: #555; /* Soft dark grey */
  line-height: 1.5; /* Good line spacing for readability */

  /* Subtle horizontal lines */
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 20px 0; /* Add vertical padding to separate text from borders */

  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 30px 15px 40px 15px;
    padding: 15px 0;
  }
`;

const MotivationalQuote = () => {
  return (
    <QuoteText>
      <span className="fw-bold">Ilma tähtajata ei pruugi sa end tegutsema sundida.</span> Ära oota, et tungiv vajadus sind unistuste poole tõukaks. Kõige olulisematel asjadel polegi tihti tähtaega – ja just seetõttu kipuvad need tegemata jääma.
    </QuoteText>
  );
};

export default MotivationalQuote;