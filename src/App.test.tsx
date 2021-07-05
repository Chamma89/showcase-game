import { render, screen, waitFor } from "@testing-library/react";
//import CountryCard from "./components/CountryCard";
import App from "./App";
import { LIST_COUNTRIES } from "./graphql/Queries";
import { MockedProvider } from "@apollo/client/testing";

describe("App", () => {
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
              code: "AU",
              emoji: "🇦🇺",
              continent: { __typename: "Continent", name: "Oceania" },
            },
            {
              __typename: "Country",
              name: "Palestine",
              capital: "Ramallah",
              code: "PS",
              emoji: "🇵🇸",
              continent: { __typename: "Continent", name: "Asia" },
            },
            {
              __typename: "Country",
              name: "United Arab Emirates",
              capital: "Abu Dhabi",
              code: "AE",
              emoji: "🇦🇪",
              continent: { __typename: "Continent", name: "Asia" },
            },
          ],
        },
      },
    },
  ];

  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );
  });

  it("Checks that question has rendered", async () => {
    await waitFor(() => {
      expect(screen.getByText(/Who does this flag belong to/i)).toBeTruthy();
      expect(screen.getByText(/Palestine/i)).toBeTruthy();
    });
  });

  it("Checks if all 3 countries are rendered", async () => {
    await waitFor(() => {
      mocks[0].result.data.countries.forEach((country) => {
        expect(screen.getByText(country.name)).toBeTruthy();
      });
    });
  });

  it("Checks that one of the countries is the chosen country", async () => {
    await waitFor(() => {
      const chosenCountry = screen.getByTestId("ChosenCountry");
      expect(["🇦🇺", "🇦🇪", "🇵🇸"]).toContain(chosenCountry.innerHTML);
    });
  });

  it("Check that count is zero on load", async () => {
    await waitFor(() => {
      const score = screen.getByRole("score");
      expect(score.innerHTML).toEqual("0");
    });
  });
});
