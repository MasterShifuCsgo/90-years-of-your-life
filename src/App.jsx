import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import styled from 'styled-components'; // No longer needed in App.jsx itself for the quote
import CheckboxGrid from "./components/checkboxes/CheckboxGrid.jsx";
import { LifeStagesProvider, TOTAL_WEEKS } from "./Context.jsx";
import User_birth_date_area from "./components/BottomDiv/User_birth_day_area.jsx";
import AboveDiv from './components/AboveDiv/AboveDiv.jsx';
import BottomDiv from './components/BottomDiv/BottomDiv.jsx';
import Description from './components/AboveDiv/Description.jsx';
import Legend from "./components/BottomDiv/Legend.jsx";
import MotivationalQuote from "./components/BottomDiv/MotivationalQuote.jsx"; // Import the new component

// Helper function for simplifying fractions
const simplifyFraction = (numerator, denominator) => {
  if (numerator === 0) {
    return '0/1';
  }
  const gcd = (a, b) => {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  };
  const commonDivisor = gcd(numerator, denominator);
  return `${numerator / commonDivisor}/${denominator / commonDivisor}`;
};


function App() {
  const [weeks, setWeeks] = useState(0);

  return (
    <section>
      <AboveDiv>
        <a href="https://www.youtube.com/watch?v=arj7oStGLkU">Inspiratsiooni allikas</a>
        <Description className="fs-2">
          <span className="fs-1">Elu Kalender</span><br/>          
          <span className="fs-3 fw-bold">Ole teadlik, kui palju aega sul jäänud on!</span><br/>
          <span className="fs-4">Iga täpp on 1 nädal.</span>
        </Description>
      </AboveDiv>
      <LifeStagesProvider>
        <BottomDiv>
          {/* gives the setWeeks state editor to the form */}
          <User_birth_date_area setweeks={setWeeks} />

          <Legend/>
          <p>
            Sa oled elanud: {weeks} nädalat,{' '}
            {Math.floor(weeks * 100 / (52 * 90))}% või{' '}
            <span style={{ fontWeight: 'bold' }}>
              {simplifyFraction(weeks, TOTAL_WEEKS)}
            </span>{' '}
            oma elust
          </p>
          {/* displays the correct amount of colored checkboxes based on weeks */}
          <CheckboxGrid activeCount={weeks}/>
        </BottomDiv>
      </LifeStagesProvider>

      {/* Use the new component here */}
      <MotivationalQuote />

    </section>
  );
}

export default App;