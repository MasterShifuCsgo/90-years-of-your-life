import React, { createContext, useContext } from "react";

// Defineeri LIFE_STAGES andmed.
// NB! TOTAL_WEEKS peab olema siin defineeritud või imporditud,
// et vältida ReferenceError'it viimase LIFE_STAGES elemendi puhul.
// Näiteks, kui TOTAL_WEEKS on 4680:
export const TOTAL_WEEKS = 4680; 

export const LIFE_STAGES = [
  { label: 'Beebi (0-2 Aastat)', startWeek: 0, endWeek: 2 * 52, color: '#ADD8E6' }, 
  { label: 'Lapsepõlv (3-12 Aastat)', startWeek: 2 * 52, endWeek: 12 * 52, color: '#90EE90' }, 
  { label: 'Teismeline (13-17 Aastat)', startWeek: 12 * 52, endWeek: 18 * 52, color: '#DA70D6' }, 
  { label: 'Noor Täiskasvanu (18-26 Aastat)', startWeek: 18 * 52, endWeek: 26 * 52, color: '#FFA07A' }, 
  { label: 'Täiskasvanu (27-65 Aastat)', startWeek: 26 * 52, endWeek: 65 * 52, color: '#A9A9A9' }, 
  { label: 'Vanem (65+ Aastat)', startWeek: 65 * 52, endWeek: TOTAL_WEEKS, color: '#DC143C' }, 
];

// Loo kontekst
const LifeStagesContext = createContext(LIFE_STAGES); // Vaikimisi väärtus

// Loo konteksti pakkuja (Provider) komponent
export const LifeStagesProvider = ({ children }) => {
  return (
    <LifeStagesContext.Provider value={LIFE_STAGES}>
      {children}
    </LifeStagesContext.Provider>
  );
};

