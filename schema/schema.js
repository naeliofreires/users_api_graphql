const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");
const api = require("./api");
const UserType = require("./types/UserType");
const CompanyType = require("./types/CompanyType");

const UserRootQuery = {
  users: {
    type: new GraphQLList(UserType),
    resolve() {
      return api.get("/users").then((resp) => resp.data);
    },
  },
  user: {
    type: UserType,
    args: { id: { type: GraphQLString } },
    resolve(_, args) {
      const url = `/users/${args.id}`;
      return api.get(url).then((resp) => resp.data);
    },
  },
};

const CompanyRootQuery = {
  company: {
    type: CompanyType,
    args: { id: { type: GraphQLString } },
    resolve(_, args) {
      const url = `/companies/${args.id}`;
      return api.get(url).then((resp) => resp.data);
    },
  },
};

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...UserRootQuery,
    ...CompanyRootQuery,
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
