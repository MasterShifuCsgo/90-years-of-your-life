import React, { useState } from "react";
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from "./Input";
import CheckboxGrid from "./checkboxes/CheckboxGrid";
import Button from "./Button";
import Dropdown from "./DropdownUI";

const AboveDiv = styled.div`
  background-color: #C8C8C8;
  margin-bottom: 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2em 5vw;

  @media (max-width: 768px) {
    padding: 1.5em 4vw;
    text-align: center;
  }
`;

const BottomDiv = styled.div`
  background-color: #FAFAFA;
  padding: 2em 5vw;  
  justify-content: center;

`;

const Divider = styled.div`
  width: 100%;
  max-width: 60vw;
  height: 0.15em;
  background: black;
  margin: 4vh 0;
  border-radius: 50px;
`;

const Title = styled.p`
  margin: 0.5em 0px 1em;
  font-size: clamp(1.2rem, 1.2vw, 2rem);
  text-align: center;
`;

const Description = styled.p`
  font-size: 30em;
  margin: 0px;
  text-align: center;
`
const Container = styled.div`
  display:flex;
  flex-direction:column;    
  align-items: center;
  text-align:center;
  min-width: 69%;
`


function User_birth_date_area({setweeks}) {

const [month2, setMonth] = useState();

 
function handleSubmit(e){
  e.preventDefault();
  const form = e.target;

  // Ensure year, month, and day are parsed as numbers (base 10)
  const year = parseInt(form.elements["year"].value, 10);
  const month = parseInt(month2, 10); // <--- Assuming 'monthValueFromDropdown' is the 1-12 number
  const day = parseInt(form.elements["day"].value, 10);

  // --- Input Validation ---
  if (isNaN(year) || isNaN(month) || isNaN(day) || month < 1 || month > 12) {
    console.error("Please enter a valid year, month (1-12), and day.");
    setweeks(0); // Reset weeks on error
    return;
  }

  // --- Date Object Creation ---
  // JS Date month is 0-indexed (0 for Jan, 11 for Dec), so subtract 1 from your 1-12 month number.
  const userDate = new Date(year, month - 1, day);

  // Get current date and normalize to start of today for accurate comparison
  const nowDate = new Date();
  nowDate.setHours(0, 0, 0, 0);

  // --- Date Validation (post-creation) ---
  // Check if the date constructed is valid (e.g., Feb 30th) and not in the future
  if (isNaN(userDate.getTime()) || userDate > nowDate) {
    console.error("The entered birth date is invalid or in the future.");
    setweeks(0); // Reset weeks on error
    return;
  }

  // --- Week Difference Calculation ---
  const msInWeek = 1000 * 60 * 60 * 24 * 7;
  // Calculate completed weeks (Math.floor is for completed weeks)
  const weekDiff = Math.floor((nowDate.getTime() - userDate.getTime()) / msInWeek);

  setweeks(weekDiff);
  console.log("Weeks lived (accurate):", weekDiff);
}


return (
    <Container>
    <h4>Enter your birth date</h4>  
      <form style={{ display: "flex", flexWrap: "wrap", gap: "1vw", justifyContent:"center"}}
        onSubmit={handleSubmit}
        >
        <Input title="Year" desc="Birth year" name="year" />
        <Dropdown
          options={[
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ]}
          setValue={setMonth}
        />
        <Input title="Day" desc="Birth day" name="day"/>
        <div style={{ width: "100%" }}>
          <Button text="Submit" type="submit"/>
        </div>
      </form> 
<Divider/>
    </Container>
  )
}

//displays the checkboxes that represent the users age. 


function App() {

  const [weeks, setWeeks] = useState();

  return (
    <section>
      <AboveDiv>
        <Title className="fs-4">90 years of your life</Title>
        <Description className="fs-2 fs-md-2">
          90 years of your life represented in weeks.<br />
          <span className="fw-bold">Be aware of how much time you have left!</span>
        </Description>
        <Divider />
      </AboveDiv>
      <BottomDiv>
        <User_birth_date_area setweeks={(weeks) => setWeeks(weeks)}/>
        <CheckboxGrid activeCount={weeks}/>
      </BottomDiv>
    </section>
  );
}

export default App;
