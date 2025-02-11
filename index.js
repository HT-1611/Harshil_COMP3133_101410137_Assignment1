const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const mongoose = require("mongoose");
const schema = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const app = express();

// MongoDB Connection (Hardcoded URI)
const MONGO_URI = "mongodb+srv://harshilpadsala07:Harshil%409724@lab3cluster.ewhl8.mongodb.net/comp3133__101410137_assigment1?retryWrites=true&w=majority&appName=Lab3Cluster";
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.error("MongoDB Connection Error: ", err));

app.use(cors());
app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
