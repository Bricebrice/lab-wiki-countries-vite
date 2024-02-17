import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

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

      {fetching && <p>Loading...</p>}

      {!foundCountry && <p>...but, country not found!</p>}

      {/* {!fetching && !foundCountry && <p>Country not found</p>} // idea
      is to display country not found --> might need catch error? */}

      {!fetching && foundCountry && (
        <div>
          <h1>{foundCountry.name.common}</h1>
          <table className="table">
            <thead></thead>
            <tbody>
              <tr>
                <td style={{ width: "30%" }}>Capital</td>
                <td>{foundCountry.capital}</td>
              </tr>
              <tr>
                <td>Area</td>
                <td>
                  {foundCountry.area} km
                  <sup>2</sup>
                </td>
              </tr>
              <tr>
                <td>Borders</td>
                <td>
                  <ul>
                    {foundCountry.borders.map((border) => (
                      <li key={border}>
                        <Link key={border} to={`/${border}`}>
                          {border}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CountryDetails;
