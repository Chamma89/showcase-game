import React, { useState } from "react";
import styled from "styled-components";
import { CountryProps } from "../App";

const StyledCountryCard = styled.div`
  box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2);
  cursor: pointer;
  display: inline-block;
  padding: 10px;
  transition: 0.3s;
  width: 30%;

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(215, 213, 213, 1);
  }

  &.spin {
    transform: rotateY(-180deg);
  }

  h2 {
    transform: rotateY(-180deg);
  }
`;

const Heading2 = styled.h2`
  align-items: center;
  display: flex;
  height: 100%;
  margin: 0;
  place-content: center;
  transition: height 0.01s linear;
`;

const CountryCard: React.FC<CountryProps> = ({
  name,
  capital,
  chosenCountry,
  continent,
  emoji,
  resetGame,
  selectThreeCountries,
  updateScore,
}) => {
  const [isCorrect, setIsCorrect] = useState(false);
  const [spinCard, setSpinCard] = useState(false);
  function selectCard(e: string) {
    if (e !== chosenCountry) {
      setSpinCard(true);
      setIsCorrect(false);
      setTimeout(function () {
        return resetGame();
      }, 2000);
    } else {
      setSpinCard(true);
      setIsCorrect(true);
      setTimeout(function () {
        selectThreeCountries();
        updateScore();
      }, 2000);
    }
  }

  return (
    <StyledCountryCard
      onClick={(e) => {
        e.preventDefault();
        selectCard(emoji);
      }}
      className={spinCard ? "spin" : ""}
    >
      {spinCard &&
        (isCorrect ? <Heading2>✅</Heading2> : <Heading2>❌</Heading2>)}

      {!spinCard && (
        <>
          <h5>{name}</h5>
          <h6>Capital: {capital}</h6>
          <h6>Continent: {continent.name}</h6>
        </>
      )}
    </StyledCountryCard>
  );
};

export default CountryCard;
