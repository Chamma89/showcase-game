import "./App.css";
import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LIST_COUNTRIES } from "./graphql/Queries";
import CountryCard from "./components/CountryCard";
import styled from "styled-components";

interface Continent {
  name: string;
}
export interface CountryProps {
  name: string;
  capital: string;
  code?: string;
  emoji: string;
  continent: Continent;
  chosenCountry: string;
  playerScore: number;
  selectThreeCountries: Function;
  updateScore: Function;
  resetGame: Function;
}

const StyledQuestion = styled.div`
  display: block;
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
  const [countries, setCountries] = useState<CountryProps[]>([]);
  const [randomCountriesList, setRandomCountriesList] = useState<
    CountryProps[]
  >([]);
  const [chosenCountry, setChosenCountry] = useState<string>("");
  const [threeCountries, setThreeCountries] = useState<CountryProps[]>([]);

  const [playerScore, setPlayerScore] = useState<number>(0);

  const { loading, error, data } = useQuery(LIST_COUNTRIES, {
    onCompleted: (data) => {
      setCountries(data.countries);
    },
  });

  useEffect(() => {
    if (data) {
      let randomizedCountries = [...countries];

      randomizedCountries = randomizedCountries.sort(() => Math.random() - 0.5);

      setRandomCountriesList(randomizedCountries);
    }
  }, [countries]);

  useEffect(() => {
    selectThreeCountries();
  }, [randomCountriesList]);

  const selectThreeCountries = () => {
    setThreeCountries(randomCountriesList.splice(0, 3));
  };

  useEffect(() => {
    if (threeCountries.length > 0) {
      setChosenCountry(threeCountries.sort(() => Math.random() - 0.5)[0].emoji);
    }
  }, [threeCountries]);

  const addToPlayerScore = () => {
    setPlayerScore((prevScore) => prevScore + 1);
  };

  const resetGame = () => {
    setPlayerScore(0);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

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
              {threeCountries
                .sort(() => Math.random() - 0.5)
                .map((country) => (
                  <CountryCard
                    key={country.code}
                    name={country.name}
                    capital={country.capital}
                    chosenCountry={chosenCountry}
                    continent={country.continent}
                    emoji={country.emoji}
                    playerScore={playerScore}
                    resetGame={resetGame}
                    selectThreeCountries={selectThreeCountries}
                    updateScore={addToPlayerScore}
                  />
                ))}
            </StyledCards>
            <h1>Current score: {playerScore}</h1>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
