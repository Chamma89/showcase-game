import { gql } from "@apollo/client";

export const LIST_COUNTRIES = gql`
  query ListCountries {
    countries {
      name
      capital
      code
      emoji
      languages {
        name
      }
    }
  }
`;

// export const ADD_COUNTRY = gql`
//   mutation AddCountry($name: String!) {
//     addCountry(name: $name) {
//       countries {
//         name
//       }
//     }
//   }
// `;
