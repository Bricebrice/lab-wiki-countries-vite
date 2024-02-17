import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

function CountryDetails() {
  const [fetching, setFetching] = useState(true);
  const [foundCountry, setFoundCountry] = useState(null);

  const { countryId } = useParams();
  // console.log("countryId is: ", countryId);

  useEffect(() => {
    axios
      .get(`https://ih-countries-api.herokuapp.com/countries/${countryId}`)
      .then((response) => {
        setFoundCountry(response.data);
        // console.log("response.data: ", response.data);
        setFetching(false);
      });
  }, [countryId]);

  console.log(
    "response.data saved in state foundCountry (mounted, then updated): ",
    foundCountry
  );
  console.log("Loading? ", fetching); // loads while mounting, not anymore after its updated

  return (
    <div className="container">
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>Country Details</p>

      <h1>France</h1>
      {fetching && <p>Loading...</p>}

      <table className="table">
        <thead></thead>
        <tbody>
          <tr>
            <td style={{ width: "30%" }}>Capital</td>
            <td>Paris</td>
          </tr>
          <tr>
            <td>Area</td>
            <td>
              551695 km
              <sup>2</sup>
            </td>
          </tr>
          <tr>
            <td>Borders</td>
            <td>
              <ul>
                <li>
                  <a href="/AND">Andorra</a>
                </li>
                <li>
                  <a href="/BEL">Belgium</a>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CountryDetails;
