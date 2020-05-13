import { UserInputError } from "apollo-server";
import { Types } from "mongoose";

import { CreateUserInput, UpdateUserInput } from "../graphql/resolvers";
import { User } from "../models";

export const userService = {
  create: async (input: CreateUserInput) => {
    const user = new User(input);
    const errors = user.validateSync();
    if (errors) {
      throw new UserInputError("Validation error", errors.toJSON());
    }
    return user.save();
  },

  update: (id: Types.ObjectId, input: UpdateUserInput) =>
    User.findByIdAndUpdate(id, input, {
      runValidators: true,
      context: "query",
    }),

  delete: async (id: Types.ObjectId) => {
    const res = await User.findByIdAndRemove(id);
    return res;
  },
};
