import "./App.css";
import { useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
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

const Score = styled.div`
  color: green;
  display: inline-block;
`;

const StyledCards = styled.div`
  display: flex;
  justify-content: space-between;
  height: 350px;
`;

function App() {
  const [countries, setCountries] = useState<CountryProps[]>([]);
  const [randomCountriesList, setRandomCountriesList] = useState<
    CountryProps[]
  >([]);
  const [chosenCountry, setChosenCountry] = useState("");
  const [threeCountries, setThreeCountries] = useState<CountryProps[]>([]);

  const [playerScore, setPlayerScore] = useState(0);

  const startGame = useCallback(() => {
    let randomizedCountries = [...countries];

    randomizedCountries = randomizedCountries.sort(() => Math.random() - 0.5);

    setRandomCountriesList(randomizedCountries);
  }, [countries]);

  const selectThreeCountries = useCallback(() => {
    setThreeCountries(randomCountriesList.splice(0, 3));
  }, [randomCountriesList]);

  const { loading, error, data } = useQuery(LIST_COUNTRIES, {
    onCompleted: (data) => {
      setCountries(data.countries);
    },
  });

  console.log("Data ==>", data); // do we need an API call? or do we just save them in a JSON

  useEffect(() => {
    if (data) {
      startGame();
    }
  }, [countries, data, startGame]);

  useEffect(() => {
    selectThreeCountries();
  }, [randomCountriesList, selectThreeCountries]);

  useEffect(() => {
    if (threeCountries.length > 0) {
      setChosenCountry(threeCountries.sort(() => Math.random() - 0.5)[0].emoji);
    }
  }, [threeCountries]);

  const addToPlayerScore = () => {
    setPlayerScore((prevScore) => prevScore + 1);
  };

  const resetGame = () => {
    startGame();
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
              <span data-testid="ChosenCountry">{chosenCountry}</span>
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
            <h1>
              Current score: <Score role="score">{playerScore}</Score>
            </h1>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
