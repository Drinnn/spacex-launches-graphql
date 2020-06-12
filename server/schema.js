const { gql } = require('apollo-server');
const axios = require('axios');

const typeDefs = gql`
  type Launch {
    flight_number: Int
    mission_name: String
    launch_year: String
    launch_date_local: String
    launch_success: Boolean
    rocket: Rocket
  }

  type Rocket {
    rocket_id: String
    rocket_name: String
    rocket_type: String
  }

  type Query {
    launches: [Launch]
    launch(flight_number: Int): Launch
    rockets: [Rocket]
    rocket(rocket_id: String): Rocket
  }
`;

const resolvers = {
  Query: {
    async launches(parent, args) {
      const response = await axios.get(
        'https://api.spacexdata.com/v3/launches'
      );
      return response.data;
    },
    async launch(parent, args) {
      const response = await axios.get(
        `https://api.spacexdata.com/v3/launches/${args.flight_number}`
      );
      return response.data;
    },
    async rockets(parent, args) {
      const response = await axios.get('https://api.spacexdata.com/v3/rockets');
      return response.data;
    },
    async rocket(parent, args) {
      const response = await axios.get(
        `https://api.spacexdata.com/v3/rockets/${args.rocket_id}`
      );
      return response.data;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
