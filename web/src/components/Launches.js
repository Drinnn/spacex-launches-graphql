import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import LaunchItem from './LaunchItem';
import MissionKey from './MissionKey';

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

function Launches() {
  const { loading, error, data } = useQuery(LAUNCHES_QUERY);

  return (
    <>
      <h1 className="display-4 my-3">Launches</h1>
      <MissionKey />
      {loading && <h3>Loading...</h3>}
      {data &&
        data.launches.map((launch) => (
          <LaunchItem key={launch.flight_number} launch={launch} />
        ))}
    </>
  );
}

export default Launches;
