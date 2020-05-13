import React, { useState } from "react";
import Modal, { ModalProps } from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { styled } from "@material-ui/core/styles";
import { compose, spacing, flexbox, display } from "@material-ui/system";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import {
  User,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from "../../apollo/types";
import { ApolloError } from "apollo-boost";

const Wrapper = styled("div")(compose(spacing));
const Row = styled("div")(compose(display, flexbox, spacing));

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      email
      name
    }
  }
`;

const modalStyle = (top: number, left: number): CSSProperties => ({
  position: "absolute",
  top: `${top}%`,
  left: `${left}%`,
  transform: `translate(-${top}%, -${left}%)`,
  backgroundColor: "white",
  width: "500px",
});

// по-хорошему вынести в отдельный хелпер и тд
const prettifyErrors = (error: ApolloError | undefined) => {
  if (
    error?.graphQLErrors[0]?.extensions?.errors ||
    error?.graphQLErrors[0]?.extensions?.exception?.errors
  ) {
    return (
      error?.graphQLErrors[0]?.extensions?.errors ||
      error?.graphQLErrors[0]?.extensions?.exception?.errors
    );
  } else {
    return {};
  }
};

// копипаста...
export const UpdateUserModal: React.FC<
  Pick<ModalProps, "open"> & { handleSave: Function; user: User }
> = ({ open, handleSave, user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [updateUser, { error, loading }] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(UPDATE_USER_MUTATION);

  const handleOnSaveClick = async (cb: Function) => {
    try {
      await updateUser({ variables: { id: user.id, input: { name, email } } });
      cb();
    } catch (error) {
      console.warn({ error });
    }
  };

  return (
    <Modal open={open} onClose={() => handleSave()}>
      <Wrapper p={2} style={modalStyle(50, 50)}>
        <TextField
          label="Name"
          onChange={({ target }) => setName(target.value)}
          value={name}
          fullWidth
          error={!!prettifyErrors(error).name}
        />
        {prettifyErrors(error).name && (
          <FormHelperText style={{ color: "red" }}>
            {prettifyErrors(error).name.message}
          </FormHelperText>
        )}
        <TextField
          label="Email"
          onChange={({ target }) => setEmail(target.value)}
          value={email}
          fullWidth
          error={!!prettifyErrors(error).email}
        />
        {prettifyErrors(error).email && (
          <FormHelperText style={{ color: "red" }}>
            {prettifyErrors(error).email.message}
          </FormHelperText>
        )}
        <Row display="flex" justifyContent="flex-end" pt={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOnSaveClick(handleSave)}
          >
            Save
          </Button>
        </Row>
      </Wrapper>
    </Modal>
  );
};
