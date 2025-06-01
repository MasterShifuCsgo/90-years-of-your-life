import React, { createContext, useContext } from "react";

// Defineeri LIFE_STAGES andmed.
// NB! TOTAL_ITEMS peab olema siin defineeritud või imporditud,
// et vältida ReferenceError'it viimase LIFE_STAGES elemendi puhul.
// Näiteks, kui TOTAL_ITEMS on 4680:
export const TOTAL_ITEMS = 4680; 

export const LIFE_STAGES = [
  { label: 'Beebi (0-2 Aastat)', startWeek: 0, endWeek: 2 * 52, color: '#ADD8E6' }, 
  { label: 'Lapsepõlv (2-12 Aastat)', startWeek: 2 * 52, endWeek: 12 * 52, color: '#90EE90' }, 
  { label: 'Teismeline (12-18 Aastat)', startWeek: 12 * 52, endWeek: 18 * 52, color: '#DA70D6' }, 
  { label: 'Noor Täiskasvanu (18-30 Aastat)', startWeek: 18 * 52, endWeek: 30 * 52, color: '#FFA07A' }, 
  { label: 'Täiskasvanu (30-65 Aastat)', startWeek: 30 * 52, endWeek: 65 * 52, color: '#A9A9A9' }, 
  { label: 'Vanem (65+ Aastat)', startWeek: 65 * 52, endWeek: TOTAL_ITEMS, color: '#DC143C' }, 
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

