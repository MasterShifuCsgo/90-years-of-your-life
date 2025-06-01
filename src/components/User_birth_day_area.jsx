import React, { useState } from 'react';
import Input from './Input';
import Dropdown from './Dropdown';
import Button from './Button';
import Divider from './Divider';
import styled from 'styled-components';

const Container = styled.div`
  display:flex;
  flex-direction:column;
  align-items: center;
  text-align:center;
  min-width: 69%;
`;




function User_birth_date_area({ setweeks }) {
  const [monthName, setMonthName] = useState('');
  const [yearInput, setYearInput] = useState('');
  const [dayInput, setDayInput] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const [calculatedWeeks, setCalculatedWeeks] = useState(null); // State to display calculated week  

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];



  function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages
    setCalculatedWeeks(null); // Clear previous calculation

    const year = parseInt(yearInput, 10);
    const month = monthName;
    const day = parseInt(dayInput, 10);

    // --- Sisendi valideerimine (enne Date objekti loomist) ---
    // Kontrolli, kas numbrilised väärtused on olemas ja mõistlikes vahemikes
    if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
      setErrorMessage("Viga: Palun sisesta kehtiv sünniaasta (nt. 1900-aastast tänaseni).");
      setweeks(0);
      return;
    }
    if (isNaN(month) || month < 1 || month > 12) {
        setErrorMessage("Viga: Palun vali kehtiv sünnikuu.");
        setweeks(0);
        return;
    }
    if (isNaN(day) || day < 1 || day > 31) {
        setErrorMessage("Viga: Palun sisesta kehtiv sünnipäev (1-31).");
        setweeks(0);
        return;
    }

    // --- Date objekti loomine ---
    // JS Date kuu on 0-põhine (0 Jaanuar, 11 Detsember), seega lahuta 1.
    const userDate = new Date(year, month - 1, day);

    // Hetke kuupäev ja normaliseerimine (keskööle)
    const nowDate = new Date();
    nowDate.setHours(0, 0, 0, 0);

    // --- Kuupäeva valideerimine (pärast loomist) ---
    // KONTROLLIB, KAS KUUPÄEV ON KEHTETU, nt. veebruar 30
    // See on kõige usaldusväärsem viis kontrollimaks, kas Date konstruktor lõi "Invalid Date" objekti.
    if (isNaN(userDate.getTime())) {
      setErrorMessage("Viga: Sisestatud sünnipäev on kehtetu (nt. veebruar 30 või päev väljaspool kuu vahemikku).");
      setweeks(0);
      return;
    }
    
    // KONTROLLIB, KAS SÜNNIPÄEV ON TULEVIKUS
    if (userDate > nowDate) {
      setErrorMessage("Viga: Sünnipäev ei saa olla tulevikus.");
      setweeks(0);
      return;
    }

    // --- Nädalate erinevuse arvutamine ---
    const msInWeek = 1000 * 60 * 60 * 24 * 7;
    // Math.floor tagastab täpselt läbitud nädalad.
    const weekDiff = Math.floor((nowDate.getTime() - userDate.getTime()) / msInWeek);

    setweeks(weekDiff); // Saada nädalad App komponendile
    setCalculatedWeeks(weekDiff); // Display calculated weeks to the user
  }

  return (
    <Container>
      <h4>Sisesta oma sünnipäev</h4>
      <form style={{ display: "flex", flexWrap: "wrap", gap: "1vw", justifyContent: "center" }}
        onSubmit={handleSubmit}>
        <Input
          title="Aasta"
          desc="Sünniaasta"
          name="year"
          value={yearInput}
          onChange={(e) => setYearInput(e.target.value)}
        />
        <Dropdown
          options={monthNames}
          onSelect={setMonthName}
        />
        <Input
          title="Päev"
          desc="Sünnipäev"
          name="day"
          value={dayInput}
          onChange={(e) => setDayInput(e.target.value)}
        />
        <div style={{ width: "100%" }}>
          <Button text="Esita" type="submit" />
        </div>
      </form>
      {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
      {calculatedWeeks !== null && (
        <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
          Arvutatud nädalad: {calculatedWeeks}
        </p>
      )}
      <Divider />
    </Container>
  );
}

export default User_birth_date_area;