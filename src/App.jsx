import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckboxGrid from "./components/checkboxes/CheckboxGrid.jsx"; // Eeldan, et need on õigesti imporditud
import {LifeStagesProvider, LIFE_STAGES} from "./Context.jsx"
import User_birth_date_area from "./components/User_birth_day_area.jsx";
import AboveDiv from './components/AboveDiv';
import BottomDiv from './components/BottomDiv';
import Divider from './components/Divider';
import Title from './components/Title';
import Description from './components/Description.jsx';



function App() {

  const [weeks, setWeeks] = useState(0); 

  return (
    <section>
      <AboveDiv>
        <Title className="fs-4">Sinu elu 90 aastat</Title>
        <Description className="fs-2 fs-md-2">
          Sinu elu 90 aastat nädalates.<br />
          <span className="fw-bold">Ole teadlik, kui palju aega sul jäänud on!</span>
        </Description>
        <Divider />
      </AboveDiv>
      <LifeStagesProvider>
      <BottomDiv>
        {/*gives the setWeeks state editor to the form*/}
        <User_birth_date_area setweeks={setWeeks} />
        <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#f9f9f9', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: '0', marginBottom: '10px', color: '#333' }}>Life Stages Legend</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {LIFE_STAGES.map((stage) => (
              <div key={stage.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: stage.color,
                    border: '1px solid #ccc',
                    boxShadow: 'inset 0 0 3px rgba(0,0,0,0.2)'
                  }}
                ></div>
                <span style={{ fontSize: '0.9em', color: '#555' }}>{stage.label}</span>
              </div>
            ))}
          </div>

          <p>You have lived: (weeks), (procent) or (fraction) of your life</p>
        </div>
        {/*displays the correct amount of colored checkboxes based on weeks*/}
        <CheckboxGrid activeCount={weeks} />
      </BottomDiv>
      </LifeStagesProvider>
    </section>
  );
}

export default App;