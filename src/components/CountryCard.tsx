import React from "react";
import styled from "styled-components";
import { CountryProps } from "../App";

const StyledCountryCard = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: inline-block;
  padding: 10px;
  transition: 0.3s;
  width: 30%;
`;

const CountryCard: React.FC<CountryProps> = ({
  name,
  capital,
  chosenCountry,
  continent,
  emoji,
  playerScore,
  resetGame,
  selectThreeCountries,
  updateScore,
}) => {
  function selectCard(e: string) {
    console.log(e, chosenCountry);

    if (e !== chosenCountry) {
      return resetGame();
    }
    selectThreeCountries();
    updateScore();
  }

  return (
    <StyledCountryCard
      onClick={(e) => {
        e.preventDefault();
        selectCard(emoji);
      }}
    >
      <h3>
        <span>{name}</span>
      </h3>
      <h6>
        Capital: <span>{capital}</span>
      </h6>
      <h6>
        Continent: <span>{continent.name}</span>
      </h6>
      <h6>
        Continent: <span>{emoji}</span>
      </h6>
    </StyledCountryCard>
  );
};

export default CountryCard;
