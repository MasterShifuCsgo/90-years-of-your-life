import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckboxGrid from "./components/checkboxes/CheckboxGrid.jsx"; // Eeldan, et need on õigesti imporditud
import {LifeStagesProvider, TOTAL_WEEKS} from "./Context.jsx"
import User_birth_date_area from "./components/User_birth_day_area.jsx";
import AboveDiv from './components/AboveDiv';
import BottomDiv from './components/BottomDiv';
import Title from './components/Title';
import Description from './components/Description.jsx';
import Legend from "./components/Legend.jsx";

const simplifyFraction = (numerator, denominator) => {
  if (numerator === 0) {
    return '0/1'; // Special case for zero
  }

  // Function to find the Greatest Common Divisor (GCD)
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


  function handleSlider(e){
    e.preventDefault();
    console.log(e.target);
  }

  const [weeks, setWeeks] = useState(0); 

  return (
    <section>
      <AboveDiv>
        <Title className="fs-4">Sinu elu 90 aastat</Title>
        <Description className="fs-2 fs-md-2">
          Sinu elu 90 aastat nädalates.<br />
          <span className="fw-bold">Ole teadlik, kui palju aega sul jäänud on!</span>
        </Description>        
      </AboveDiv>
      <LifeStagesProvider>
      <BottomDiv>
          

        {/*gives the setWeeks state editor to the form*/}                
        <User_birth_date_area setweeks={setWeeks} />     
               
        <Legend/>
        <p>You have lived: {weeks} weeks, {Math.floor(weeks * 100 / (52*90))}% or {simplifyFraction(weeks, TOTAL_WEEKS)} of your life</p>
        {/*displays the correct amount of colored checkboxes based on weeks*/}
        <CheckboxGrid activeCount={weeks}/>
      </BottomDiv>
      </LifeStagesProvider>
    </section>
  );
}

export default App;