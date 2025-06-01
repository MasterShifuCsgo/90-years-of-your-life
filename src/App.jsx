import React, { useState } from "react";
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from "./Input";
import CheckboxGrid from "./checkboxes/CheckboxGrid";
import Button from "./Button";

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


 
function handleSubmit(e){
  e.preventDefault();
  const form = e.target;

  const year = form.elements["year"].value;
  const month = form.elements["month"].value;
  const day = form.elements["day"].value; 

  const date = new Date();

  const year_now = date.getFullYear();
  const month_now = date.getMonth();
  const day_now = date.getDate();

  //convert to weeks
  // jan = 1
  // dec = 12
const userDate = new Date(year, month - 1, day); // JS kuud on 0-põhised
const nowDate = new Date(year_now, month_now - 1, day_now);

const msInWeek = 1000 * 60 * 60 * 24 * 7;
const weekDiff = Math.ceil((nowDate - userDate) / msInWeek);

setweeks(weekDiff);
console.log(weekDiff);

}

return (
    <Container>
    <h4>Enter your birth date</h4>  
      <form style={{ display: "flex", flexWrap: "wrap", gap: "1vw", justifyContent:"center"}}
        onSubmit={handleSubmit}
        >
        <Input title="Year" desc="Birth year" name="year" />
        <Input title="Month" desc="Birth Month" name="month"/>
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
