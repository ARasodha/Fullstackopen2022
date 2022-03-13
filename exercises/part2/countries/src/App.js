import { useState, useEffect } from 'react';
import axios from 'axios';
const api_key = process.env.REACT_APP_API_KEY;

const Countries = (props) => {
  if (props.countries.length > 10 || props.countries.length === 0) {
    return (
      <>
      <p>Too many matches, specify another filter</p>
      </>
    )
  } else if (props.countries.length === 1 && props.countries[0] !== undefined) {
    let country = props.countries[0];
    let languages = Object.entries(country.languages);

    return (
      <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <p><strong>languages</strong></p>
      <ul>
        {languages.map(lang => <li key={lang[0]}>{lang[1]}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.name.common} />
      <Weather country={country} />
      </>
    )
  }

  return (
    <>
      {props.countries.map(country => {
        return (
          <div key={country.area}>
            <p key={country.name.common}>{country.name.common}</p>
            <button id={country.name.common} onClick={(event) => props.handleShowBtn(event, props.countries)}>show</button>
          </div>
        )
      })}
    </>
  )
}

const Weather = (props) => {
  let [weather, setWeather] = useState({});
  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${props.country.name.common}&units=metric&appid=${api_key}`)
      .then(response => {
        setWeather({ temp: response.data.main.temp, img: response.data.weather[0].icon, wind: response.data.wind.speed });
      });
  });

  return (
    <>
    <h1>Weather in {props.country.capital[0]}</h1>
    <p>temperature {JSON.stringify(weather.temp)}</p>
    <img src={` http://openweathermap.org/img/wn/${weather.img}@2x.png`} alt="weather-icon"/>
    <p>wind {JSON.stringify(weather.wind)} m/s</p>
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  useEffect(() => {
    if (search.length === 0) return;
    axios
      .get(`https://restcountries.com/v3.1/name/${search}`)
      .then(response => {
        setCountries(response.data);
        return;
      })
      .catch(() => console.log('no country matching result'))
  }, [search]);

  function handleShowBtn(event, countries) {
    event.preventDefault();
    let countryName = event.target.getAttribute('id');
    let country = countries.filter(country => country.name.common === countryName)[0];
    setSearch(country.name.common)
  }

  return (
    <div>
      find countries <input value={search} onChange={handleSearch} />
      <div>
       <Countries countries={countries} handleShowBtn={handleShowBtn} />
      </div>
    </div>
  )
}

export default App;