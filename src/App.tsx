import "./App.css";
import { gql, useQuery } from "@apollo/client";

const LIST_COUNTRIES = gql`
  {
    countries {
      name
      code
      emoji
    }
  }
`;
interface Props {
  name: string;
  code: string;
  emoji: string;
}

function CountriesList() {
  const { loading, error, data } = useQuery(LIST_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);

  return data.countries.map(({ name, code, emoji }: Props) => (
    <div key={name}>
      <p>
        {emoji} {name}: {code}
      </p>
    </div>
  ));
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CountriesList />
      </header>
    </div>
  );
}

export default App;
