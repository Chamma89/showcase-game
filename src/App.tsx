import "./App.css";
import { gql, useQuery } from "@apollo/client";

const LIST_COUNTRIES = gql`
  {
    countries {
      name
      code
    }
  }
`;
interface Props {
  name: string;
  code: string;
}

function CountriesList() {
  const { loading, error, data } = useQuery(LIST_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);

  return data.countries.map(({ name, code }: Props) => (
    <div key={name}>
      <p>
        {name}: {code}
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
