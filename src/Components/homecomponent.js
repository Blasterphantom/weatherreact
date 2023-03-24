import { Button, Col, Container, Row } from "react-bootstrap";
import { InputGroup, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import star2 from "../Assets/star2.png";
import starUnclicked from "../Assets/StarUnclicked.png";
import sun from "../Assets/sun.png";
import clear from "../Assets/Clear.png";
import cloudy from "../Assets/Cloudy.png";
import snow from "../Assets/SNow.png";
import rain from "../Assets/Rain.png";
import haze from "../Assets/Haze.png";
import drizzle from "../Assets/Drizzle.png";
import thunderstorms from "../Assets/Thunderstorms.png";
import {
  saveToLocalStorageByName,
  GetLocalStorage,
  RemoveFromLocalStorage,
  favorites,
} from "./localStorage.js";
import { prod, dev } from "./environment.js";

export default function HomeComponent() {
  let apiKey = "&appid=";

  if (prod.isLive === true) {
    apiKey += prod.apiKey;
  } else {
    apiKey += dev.apiKey;
  }

  const [searchText, setSearchText] = useState("Stockton");
  const [city, setCity] = useState("City Name");
  const [temp, setTemp] = useState("00°");
  const [min, setMin] = useState("00°");
  const [max, setMax] = useState("00°");
  const [dayOne, setDayOne] = useState("00°");
  const [dayTwo, setDayTwo] = useState("00°");
  const [dayThree, setDayThree] = useState("00°");
  const [dayFour, setDayFour] = useState("00°");
  const [dayFive, setDayFive] = useState("00°");
  const [dayOneWord, setDayOneWord] = useState("Tomorrow");
  const [dayTwoWord, setDayTwoWord] = useState("Day 2");
  const [dayThreeWord, setDayThreeWord] = useState("Day 3");
  const [dayFourWord, setDayFourWord] = useState("Day 4");
  const [dayFiveWord, setDayFiveWord] = useState("Day 5");
  const [sunTodayPic, setSunTodayPic] = useState(sun);
  const [sunDay1Pic, setSunDay1Pic] = useState(sun);
  const [sunDay2Pic, setSunDay2Pic] = useState(sun);
  const [sunDay3Pic, setSunDay3Pic] = useState(sun);
  const [sunDay4Pic, setSunDay4Pic] = useState(sun);
  const [sunDay5Pic, setSunDay5Pic] = useState(sun);
  const [starPic, setStarPic] = useState(star2);
  const [favoritesUse, setFavoritesUse] = useState("");

  useEffect(() => {
    CreateElements();
    // handleSearch();
  },[])

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {

    if(favorites.includes(searchText.toLowerCase().charAt(0).toUpperCase() + searchText.slice(1)))
    {
        setStarPic(star2);
    }
    else
    {
        setStarPic(starUnclicked);
    }

    let searchTextUrl = searchText;
    console.log(searchTextUrl);

    let urlName =
      `https://api.openweathermap.org/data/2.5/weather?q=` +
      searchTextUrl +
      apiKey +
      `&units=imperial`;

    let urlName2 =
      `https://api.openweathermap.org/data/2.5/forecast?q=` +
      searchTextUrl +
      apiKey +
      `&units=imperial`;

    GetCityToday(urlName);

    GetForecast(urlName2);
  };

  const handleFavorite = () => {
    addAndRemoveFav(city);
  };

  function addAndRemoveFav(textPassed) {
    GetLocalStorage();

    if (favorites.includes(textPassed)) {
      RemoveFromLocalStorage(textPassed);
      setStarPic(starUnclicked);
    } else {
      saveToLocalStorageByName(textPassed);
      setStarPic(star2);
    }
    CreateElements();
  }

  function CreateElements() {
    let favorites = GetLocalStorage();
    let listFav = "";

    favorites.map((person) => {
      listFav += `${person}\n`;
      return listFav;
    });

    setFavoritesUse(listFav);

  }

  async function GetCityToday(urlName) {
    await fetch(urlName)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setCity(data.name);
        setMin(Math.floor(data.main.temp_min) + "°");
        setMax(Math.floor(data.main.temp_max) + "°");
        setTemp(Math.floor(data.main.temp) + "°");
        let weatherIcon = data.weather[0].main;
        console.log(weatherIcon);

        if (weatherIcon === "Clear") {
          setSunTodayPic(clear);
        } else if (weatherIcon === "Clouds") {
          setSunTodayPic(cloudy);
        } else if (weatherIcon === "Snow") {
          setSunTodayPic(snow);
        } else if (weatherIcon === "Rain") {
          setSunTodayPic(rain);
        } else if (weatherIcon === "Haze") {
          setSunTodayPic(haze);
        } else if (weatherIcon === "Drizzle") {
          setSunTodayPic(drizzle);
        } else if (weatherIcon === "Thunderstorm") {
          setSunTodayPic(thunderstorms);
        }
      });
  }

  async function GetForecast(urlName2) {
    await fetch(urlName2)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setDayOne(Math.floor(data.list[7].main.temp) + "°");
        setDayTwo(Math.floor(data.list[15].main.temp) + "°");
        setDayThree(Math.floor(data.list[23].main.temp) + "°");
        setDayFour(Math.floor(data.list[31].main.temp) + "°");
        setDayFive(Math.floor(data.list[39].main.temp) + "°");
        const today = new Date().getDay();

        let weatherDay1 = data.list[7].weather[0].main;
        let weatherDay2 = data.list[15].weather[0].main;
        let weatherDay3 = data.list[23].weather[0].main;
        let weatherDay4 = data.list[31].weather[0].main;
        let weatherDay5 = data.list[39].weather[0].main;

        if (today === 3) {
          setDayOneWord("Thursday");
          setDayTwoWord("Friday");
          setDayThreeWord("Saturday");
          setDayFourWord("Sunday");
          setDayFiveWord("Monday");
        } else if (today === 4) {
          setDayOneWord("Friday");
          setDayTwoWord("Saturday");
          setDayThreeWord("Sunday");
          setDayFourWord("Monday");
          setDayFiveWord("Tuesday");
        } else if (today === 5) {
          setDayOneWord("Saturday");
          setDayTwoWord("Sunday");
          setDayThreeWord("Monday");
          setDayFourWord("Tuesday");
          setDayFiveWord("Wednesday");
        } else if (today === 6) {
          setDayOneWord("Sunday");
          setDayTwoWord("Monday");
          setDayThreeWord("Tuesday");
          setDayFourWord("Wednesday");
          setDayFiveWord("Thursday");
        } else if (today === 0) {
          setDayOneWord("Monday");
          setDayTwoWord("Tuesday");
          setDayThreeWord("Wednesday");
          setDayFourWord("Thursday");
          setDayFiveWord("Friday");
        } else if (today === 1) {
          setDayOneWord("Tuesday");
          setDayTwoWord("Wednesday");
          setDayThreeWord("Thursday");
          setDayFourWord("Friday");
          setDayFiveWord("Saturday");
        } else if (today === 2) {
          setDayOneWord("Wednesday");
          setDayTwoWord("Thursday");
          setDayThreeWord("Friday");
          setDayFourWord("Saturday");
          setDayFiveWord("Sunday");
        }

        if (weatherDay1 === "Clear") {
          setSunDay1Pic(clear);
        } else if (weatherDay1 === "Clouds") {
          setSunDay1Pic(cloudy);
        } else if (weatherDay1 === "Snow") {
          setSunDay1Pic(snow);
        } else if (weatherDay1 === "Rain") {
          setSunDay1Pic(rain);
        } else if (weatherDay1 === "Haze") {
          setSunDay1Pic(haze);
        } else if (weatherDay1 === "Drizzle") {
          setSunDay1Pic(drizzle);
        } else if (weatherDay1 === "Thunderstorm") {
          setSunDay1Pic(thunderstorms);
        }

        if (weatherDay2 === "Clear") {
          setSunDay2Pic(clear);
        } else if (weatherDay2 === "Clouds") {
          setSunDay2Pic(cloudy);
        } else if (weatherDay2 === "Snow") {
          setSunDay2Pic(snow);
        } else if (weatherDay2 === "Rain") {
          setSunDay2Pic(rain);
        } else if (weatherDay2 === "Haze") {
          setSunDay2Pic(haze);
        } else if (weatherDay2 === "Drizzle") {
          setSunDay2Pic(drizzle);
        } else if (weatherDay2 === "Thunderstorm") {
          setSunDay2Pic(thunderstorms);
        }

        if (weatherDay3 === "Clear") {
          setSunDay3Pic(clear);
        } else if (weatherDay3 === "Clouds") {
          setSunDay3Pic(cloudy);
        } else if (weatherDay3 === "Snow") {
          setSunDay3Pic(snow);
        } else if (weatherDay3 === "Rain") {
          setSunDay3Pic(rain);
        } else if (weatherDay3 === "Haze") {
          setSunDay3Pic(haze);
        } else if (weatherDay3 === "Drizzle") {
          setSunDay3Pic(drizzle);
        } else if (weatherDay3 === "Thunderstorm") {
          setSunDay3Pic(thunderstorms);
        }

        if (weatherDay4 === "Clear") {
          setSunDay4Pic(clear);
        } else if (weatherDay4 === "Clouds") {
          setSunDay4Pic(cloudy);
        } else if (weatherDay4 === "Snow") {
          setSunDay4Pic(snow);
        } else if (weatherDay4 === "Rain") {
          setSunDay4Pic(rain);
        } else if (weatherDay4 === "Haze") {
          setSunDay4Pic(haze);
        } else if (weatherDay4 === "Drizzle") {
          setSunDay4Pic(drizzle);
        } else if (weatherDay4 === "Thunderstorm") {
          setSunDay4Pic(thunderstorms);
        }

        if (weatherDay5 === "Clear") {
          setSunDay5Pic(clear);
        } else if (weatherDay5 === "Clouds") {
          setSunDay5Pic(cloudy);
        } else if (weatherDay5 === "Snow") {
          setSunDay5Pic(snow);
        } else if (weatherDay5 === "Rain") {
          setSunDay5Pic(rain);
        } else if (weatherDay5 === "Haze") {
          setSunDay5Pic(haze);
        } else if (weatherDay5 === "Drizzle") {
          setSunDay5Pic(drizzle);
        } else if (weatherDay5 === "Thunderstorm") {
          setSunDay5Pic(thunderstorms);
        }
      });
  }



  // function GetLatAndLong(latitude, longitude){

  //   let urlName2 = "https://api.openweathermap.org/data/2.5/weather?lat="+ latitude +"&lon="+ longitude + apiKey +"&units=imperial";

  //   // GetWeather(urlName2);
  // }

  return (
    <Container className="homeContainer">
      <Row className="homeRow">
        <Col className="homeCol">
          <InputGroup className="mb-3">
            <Form.Control
              id="searchBar"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder="City Name (Ex. Stockton)"
              value={searchText}
              onChange={handleChange}
            />
          </InputGroup>

          <Button id="searchBtn" className="searchBtn" onClick={handleSearch}>
            Search
          </Button>

          <div className="cityDiv">
            <h1 className="cityTxt">{city}</h1>

            <img
              className="star"
              src={starPic}
              alt="star"
              onClick={handleFavorite}
            />
          </div>
        </Col>
      </Row>

      <Row className="todayRow">
        <Col className="todayCol">
          <img
            id="sunToday"
            className="sunPicBig"
            src={sunTodayPic}
            alt="Sun"
          />
          <div className="todayDiv">
            <h1 className="todayTxt">{temp}</h1>
            <h1 className="todayTxt2">Now</h1>
          </div>
        </Col>
        <Col className="todayCol">
          <Col className="todayInnerCol">
            <img className="sun" src={sunTodayPic} alt="Sun" />
            <h5 className="textSmall">{min}</h5>
            <h5 className="textSmall">Min</h5>
          </Col>
          <Col className="todayInnerCol">
            <img className="sun" src={sunTodayPic} alt="Sun" />
            <h5 className="textSmall">{max}</h5>
            <h5 className="textSmall">max</h5>
          </Col>
        </Col>
      </Row>

      <Row id="weatherRow" className="weatherRow">
        <div className="weekWeather">
          <img className="sunDiv" src={sunDay1Pic} alt="Sun" />
          <h1 className="todayTxt">{dayOne}</h1>
          <h1 className="todayTxt3">{dayOneWord}</h1>
        </div>

        <div className="weekWeather">
          <img className="sunDiv" src={sunDay2Pic} alt="Sun" />
          <h1 className="todayTxt">{dayTwo}</h1>
          <h1 className="todayTxt3">{dayTwoWord}</h1>
        </div>

        <div className="weekWeather">
          <img className="sunDiv" src={sunDay3Pic} alt="Sun" />
          <h1 className="todayTxt">{dayThree}</h1>
          <h1 className="todayTxt3">{dayThreeWord}</h1>
        </div>

        <div className="weekWeather">
          <img className="sunDiv" src={sunDay4Pic} alt="Sun" />
          <h1 className="todayTxt">{dayFour}</h1>
          <h1 className="todayTxt3">{dayFourWord}</h1>
        </div>

        <div className="weekWeather">
          <img className="sunDiv" src={sunDay5Pic} alt="Sun" />
          <h1 className="todayTxt">{dayFive}</h1>
          <h1 className="todayTxt3">{dayFiveWord}</h1>
        </div>
      </Row>

      <Row className="favoritesRow" id="fav">
        <h1 className="favorites">Favorites</h1>
        <div id="favoritesDiv" className="favoritesDiv">
          {favoritesUse}
        </div>
      </Row>
    </Container>
  );
}
