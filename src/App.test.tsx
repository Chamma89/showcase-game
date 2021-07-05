import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
//import CountryCard from "./components/CountryCard";
import App from "./App";
import { LIST_COUNTRIES } from "./graphql/Queries";
import { MockedProvider } from "@apollo/client/testing";
import { client } from "../src/index";

describe("App", () => {
  it("renders passed in html", async () => {
    const mocks = [
      {
        request: {
          query: LIST_COUNTRIES,
        },
        result: {
          data: {
            countries: [
              {
                __typename: "Country",
                name: "Australia",
                capital: "Canberra",
                code: "Au",
                emoji: "Aus",
                continent: { __typename: "Continent", name: "Australasia" },
              },
            ],
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );
    await waitFor(() => {
      expect(screen.getByText(/Who does this flag belong to/i)).toBeTruthy();
    });
  });
  // it("renders passed in html", () => {
  //   const props = {
  //     name: "Fouad",
  //     capital: "Au",
  //     chosenCountry: "Au",
  //     continent: {
  //       name: "Au",
  //     },
  //     emoji: "sd",
  //     playerScore: 34,
  //   };
  //   render(<CountryCard {...props} />);

  //   //expect(screen.getByText(/Who does this flag belong to/i)).toBeTruthy();
  // });
});
