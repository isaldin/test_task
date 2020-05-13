import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import { UsersQuery, UsersQueryVariables } from "../../apollo/types";
import { UsersTable } from "../../components/UsersTable";
import { NewUserModal } from "../../components/NewUserModal";

const USERS_QUERY = gql`
  query users($limit: Int = 10, $skip: Int = 0) {
    users(limit: $limit, skip: $skip) {
      id
      name
      email
    }
  }
`;

export const MainPage: React.FC = () => {
  const [isModalOpened, setModalOpened] = useState(false);

  const { loading, error, data, refetch } = useQuery<
    UsersQuery,
    UsersQueryVariables
  >(USERS_QUERY, {});

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Container>
        <div>{error.message}</div>
        <Button variant="contained" onClick={() => refetch({})}>
          Retry
        </Button>
      </Container>
    );
  }

  if (data) {
    return (
      <Container>
        <NewUserModal
          open={isModalOpened}
          handleClose={() => {
            setModalOpened(false);
            refetch({});
          }}
        />
        <br />
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5">Users list</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setModalOpened(true)}
          >
            New
          </Button>
        </Box>
        <br />
        <UsersTable
          refetch={refetch}
          users={
            data?.users
              ?.filter((user) => user?.name && user?.email && user?.id)
              .map((user) => ({
                id: user!.id,
                name: user!.name,
                email: user!.email,
              })) || []
          }
        />
      </Container>
    );
  }

  return null;
};
