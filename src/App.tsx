import "./App.css";
import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LIST_COUNTRIES } from "./graphql/Queries";
import CountryCard from "./components/CountryCard";

function App() {
  const { loading, error, data } = useQuery(LIST_COUNTRIES);
  const [randomCountries, setRandomCountries] = useState<Array<object>>([]);
  // const [addTodo] = useMutation(ADD_COUNTRY);

  useEffect(() => {
    if (data) {
      var arr = [];
      while (arr.length < 3) {
        var r = Math.floor(Math.random() * 250) + 1;
        if (arr.indexOf(r) === -1) arr.push(data.countries[r]);
      }
      setRandomCountries(arr);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <CountryCard name="Card un" />
        <CountryCard name="Card deux" />
        <CountryCard name="Card trois" />
      </header>
    </div>
  );
}

export default App;
