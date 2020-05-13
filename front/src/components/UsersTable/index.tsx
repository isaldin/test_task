import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { User } from "../../apollo/types";
import { UpdateUserModal } from "../UpdateUserModal";
import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
} from "../../apollo/types";

type PropsType = {
  users: User[];
  refetch: Function;
};

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
      email
    }
  }
`;

export const UsersTable: React.FC<PropsType> = ({ users, refetch }) => {
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [selectedUser, setUser] = useState<User | null>(null);
  const [deleteUser] = useMutation<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >(DELETE_USER_MUTATION);

  const handleEdit = (user: User) => () => {
    setEditModalOpened(true);
    setUser(user);
  };

  const handleDelete = (user: User) => () => {
    if (confirm("Are you sure?")) {
      deleteUser({ variables: { id: user.id } }).then(() => refetch({}));
    }
  };

  const handleSave = () => {
    setEditModalOpened(false);
    setUser(null);
    refetch({});
  };

  return (
    <>
      {selectedUser && (
        <UpdateUserModal
          open={editModalOpened}
          user={selectedUser}
          handleSave={handleSave}
        />
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Id</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <>
                    <IconButton onClick={handleDelete(user)}>
                      <Delete />
                    </IconButton>
                    <IconButton onClick={handleEdit(user)}>
                      <Edit />
                    </IconButton>
                  </>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
