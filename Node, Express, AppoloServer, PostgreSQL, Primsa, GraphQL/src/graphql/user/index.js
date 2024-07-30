const {typeDefs} = require("./typeDefs");
const {queries, mutations} = require("./resolver");

const User = {typeDefs, queries, mutations};
module.exports = User;