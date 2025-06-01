// Checkbox.jsx
import React from 'react'; // useId is no longer needed as there's no input/label pair
import styled from 'styled-components';

const Checkbox = ({ checked = false, color = '#4d86ff' }) => {
  // No uniqueId needed anymore as there's no <input> or <label>
  return (
    // The StyledBox will now be the visual representation of the checkbox
    // We pass 'checked' and '$checkedColor' as props for styling
    <StyledBox $checked={checked} $checkedColor={color} />
  );
};

const StyledBox = styled.div`
  position: relative;
  /* Removed 'top: 1px;' as it was likely to visually align with text */
  width: clamp(9px, 1vw, 70px);
  height: clamp(9px, 1vw, 70px);
  border: 1px solid #475569;
  border-radius: 10px;
  cursor: pointer; /* Keep cursor pointer to indicate it's clickable (even if it's read-only) */
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);

  /* Based on the '$checked' prop, apply background and animation */
  background: ${props => props.$checked ? props.$checkedColor : 'transparent'};
  border-color: ${props => props.$checked ? 'transparent' : '#475569'}; /* Border color changes too */
  transition: background 0.2s ease, border-color 0.2s ease; /* Smooth transition */

  /* Apply jelly animation only when checked state changes to true */
  ${props => props.$checked && `
    animation: jelly 0.4s ease;
  `}

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