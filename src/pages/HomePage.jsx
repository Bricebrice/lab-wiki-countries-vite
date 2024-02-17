// import { countries } from "../test/data.js";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [foundCountries, setFoundCountry] = useState([]);

  // useEffect(() => {
  //   console.log("countries ", countries);
  //   setFoundCountry(countries);
  // }, []);

  useEffect(() => {
    axios
      .get("https://ih-countries-api.herokuapp.com/countries")
      .then((response) => {
        console.log("response.data: ", response.data);
        setFoundCountry(response.data);
        console.log("One country: ", response.data[0]);
      });
  }, []);

  return (
    <div
      className="container"
      style={{ maxHeight: "90vh", overflow: "scroll" }}
    >
      <h1 style={{ fontSize: "24px" }}>
        WikiCountries: Your Guide to the World
      </h1>

      {!foundCountries && <p>Countries not found!</p>}

      {foundCountries && (
        <div className="list-group">
          {foundCountries.map((country) => (
            <Link
              key={country._id}
              className="list-group-item list-group-item-action"
              to={`/${country.alpha3Code}`}
            >
              <img
                src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
              />
              <br />
              {country.name.common}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
