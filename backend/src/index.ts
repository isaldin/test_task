import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { resolvers, typeDefs } from "./graphql";

dotenv.config();
const {
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
  MONGO_INITDB_DATABASE,
  MONGO_HOST,
} = process.env;
const dbUri = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${
  MONGO_HOST || "localhost"
}:27017/${MONGO_INITDB_DATABASE}`;

const server = new ApolloServer({ typeDefs, resolvers });

const bootstrap = async () => {
  await mongoose.connect(dbUri, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const { url } = await server.listen();
  console.log(`Server started at ${url}`);
};

bootstrap();

process.on("uncaughtException", (err) => {
  console.error(err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error(reason);
  process.exit(1);
});
