import React from "react";
import styled from "styled-components";
import { CountryProps } from "../App";

const StyledCountryCard = styled.div`
  box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2);
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
      <h3>{name}</h3>
      <h6>Capital: {capital}</h6>
      <h6>Continent: {continent.name}</h6>
    </StyledCountryCard>
  );
};

export default CountryCard;
