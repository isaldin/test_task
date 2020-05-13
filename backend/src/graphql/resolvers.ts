import { Types } from "mongoose";

import { emailScalarType } from "./scalars";
import { userService } from "../services";
import { User } from "../models";
import { UserInputError } from "apollo-server";

export type CreateUserInput = {
  email: string;
  name: string;
};

export type UpdateUserInput = {
  email?: string;
  name?: string;
};

export const resolvers = {
  Email: emailScalarType,

  Query: {
    user: (_: unknown, args: { id: string }) => {
      if (!Types.ObjectId.isValid(args.id)) {
        throw new UserInputError("Invalid id provided.");
      }

      return User.findById(args.id);
    },

    users: (_: unknown, args: { skip?: number; limit?: number }) =>
      User.find()
        .limit(args.limit || 0)
        .skip(args.skip || 0),
  },

  Mutation: {
    createUser: (_: unknown, args: { input: CreateUserInput }) =>
      userService.create(args.input),

    updateUser: (
      _: unknown,
      args: { id: Types.ObjectId; input: UpdateUserInput }
    ) => userService.update(args.id, args.input),

    deleteUser: (_: unknown, args: { id: Types.ObjectId }) =>
      userService.delete(args.id),
  },
};
