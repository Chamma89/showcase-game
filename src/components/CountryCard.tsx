import React from "react";
import styled from "styled-components";

export interface Continent {
  name: string;
}

interface Props {
  name: string;
  capital: string;
  continent: Continent;
}

const StyledCountryCard = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: inline-block;
  padding: 10px;
  transition: 0.3s;
  width: 30%;
`;

const CountryCard: React.FC<Props> = ({ name, capital, continent }) => {
  //   const { removeProperty, addProperty } = usePropertyContext();
  //   const { id, mainImage, price, agency, isAdded } = property;
  return (
    <StyledCountryCard>
      <h3>
        <span>{name}</span>
      </h3>
      <h6>
        Capital: <span>{capital}</span>
      </h6>
      <h6>
        Continent: <span>{continent.name}</span>
      </h6>
    </StyledCountryCard>
  );
};

export default CountryCard;
