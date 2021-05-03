import "./App.css";
import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LIST_COUNTRIES } from "./graphql/Queries";
import CountryCard from "./components/CountryCard";
import { Continent } from "./components/CountryCard";
import { count } from "node:console";
import styled from "styled-components";

interface Country {
  name: string;
  capital: string;
  code: string;
  emoji: string;
  continent: Continent;
}

const StyledQuestion = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 200px;
  }
`;

const StyledCards = styled.div`
  display: flex;
  justify-content: space-between;
`;

function App() {
  const [randomCountries, setRandomCountries] = useState<Country[]>([]);
  const [chosenCountry, setChosenCountry] = useState<String>("");
  const { loading, error, data } = useQuery(LIST_COUNTRIES, {
    onCompleted: (data) => {
      console.log("data loaded");
      // setRandomCountries(data)
    },
  });
  // const [addTodo] = useMutation(ADD_COUNTRY);

  useEffect(() => {
    if (data) {
      var arr = [];
      while (arr.length < 3) {
        var r = Math.floor(Math.random() * 250) + 1;
        if (arr.indexOf(r) === -1) arr.push(data.countries[r]);
      }
      setRandomCountries(arr);
      setChosenCountry(arr[0].emoji);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);
  console.log(randomCountries);

  return (
    <div className="App">
      <header className="App-header">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <StyledQuestion>
              <h1>Who does this flag belong to?</h1>
              <span>{chosenCountry}</span>
            </StyledQuestion>
            <StyledCards>
              {randomCountries.map((country) => (
                <CountryCard
                  key={country.code}
                  name={country.name}
                  continent={country.continent}
                  capital={country.capital}
                />
              ))}
            </StyledCards>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
