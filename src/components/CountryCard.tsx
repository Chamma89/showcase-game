import React from "react";

interface Props {
  name: string;
}

const CountryCard: React.FC<Props> = ({ name }) => {
  //   const { removeProperty, addProperty } = usePropertyContext();
  //   const { id, mainImage, price, agency, isAdded } = property;
  return <h1>This is {name}</h1>;
};

export default CountryCard;
