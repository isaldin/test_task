import { GraphQLScalarType } from "graphql";

export const emailScalarType = new GraphQLScalarType({
  name: "Email",
  description: "Abstract type for email",
  serialize: (value) => value,
  parseValue: (value) => value,
});
