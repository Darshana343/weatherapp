import "./styles.css";
import React, { useState } from "react";

function App() {
  const [city, setcity] = useState("");
  const [result, setresult] = useState("");
  function handleChange(event) {
    setcity(event.target.value);
  }
  function handleClick() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb`
    )
      .then((response) => {
        if (!response.ok) {
          throw Error("Error occured");
        }
        return response.json();
      })

      .then((data) => {
        const kelvin = data.main.temp;
        const celcius = kelvin - 273.15;
        const temp = Math.round(celcius);
        setresult(
          "Temperature at" + " " + city + " " + "is" + " " + temp + "\u00B0C"
        );
      })
      .catch((e) => {
        alert("Enter valid city name!");
        setcity("");
      });
  }
  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        id="box"
        onChange={handleChange}
        type="text"
        name="city"
        value={city}
        placeholder="Type the city/town"
      />
      <br /> <br />
      <button onClick={handleClick} id="submit" type="submit">
        Get Temperature
      </button>
      <h1>{result}</h1>
    </div>
  );
}
export default App;
