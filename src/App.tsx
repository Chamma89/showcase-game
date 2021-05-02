import "./App.css";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { LIST_COUNTRIES } from "./graphql/Queries";
import CountryCard from "./components/CountryCard";

function App() {
  const { loading, error, data } = useQuery(LIST_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <CountryCard name="Card un" />
        <CountryCard name="Card deux" />
      </header>
    </div>
  );
}

export default App;
