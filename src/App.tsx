import "./App.css";
import { useCallback, useEffect, useState } from "react";
import CountryCard from "./components/CountryCard";
import styled from "styled-components";
import countriesList from "./countries.json";

interface Continent {
  name: string;
}
export interface CountryProps extends CountryInfoProps {
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

interface CountryInfoProps {
  name: string;
  capital: string;
  code?: string;
  emoji: string;
  continent: Continent;
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
  const data: CountryInfoProps[] = countriesList;
  const [countries, setCountries] = useState<CountryInfoProps[]>([]);
  const [randomCountriesList, setRandomCountriesList] = useState<
    CountryInfoProps[]
  >([]);
  const [chosenCountry, setChosenCountry] = useState("");
  const [threeCountries, setThreeCountries] = useState<CountryInfoProps[]>([]);
  const [playerScore, setPlayerScore] = useState(0);

  const startGame = useCallback(() => {
    let randomizedCountries = [...countries];

    randomizedCountries = randomizedCountries.sort(() => Math.random() - 0.5);

    setRandomCountriesList(randomizedCountries);
  }, [countries]);

  const selectThreeCountries = useCallback(() => {
    setThreeCountries(randomCountriesList.splice(0, 3));
  }, [randomCountriesList]);

  useEffect(() => {
    setCountries(data);
    startGame();
  }, [startGame, data]);

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

  return (
    <div className="App">
      <header className="App-header">
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
      </header>
    </div>
  );
}

export default App;
