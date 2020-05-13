export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Abstract type for email */
  Email: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type Query = {
   __typename?: 'Query';
  user: User;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  createUser: User;
  updateUser: User;
  deleteUser: User;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  input: UpdateUserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};

export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['Email'];
  name: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['Email'];
  name: Scalars['String'];
};

export type UpdateUserInput = {
  email?: Maybe<Scalars['Email']>;
  name?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type CreateUserMutationVariables = {
  input: CreateUserInput;
};


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'name'>
  ) }
);

export type UpdateUserMutationVariables = {
  id: Scalars['ID'];
  input: UpdateUserInput;
};


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'name'>
  ) }
);

export type DeleteUserMutationVariables = {
  id: Scalars['ID'];
};


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & { deleteUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email'>
  ) }
);

export type UsersQueryVariables = {
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users?: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email'>
  )>>> }
);
