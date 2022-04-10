const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
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

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString },
      },
      resolve(_, args) {
        return api.post("/users", { ...args }).then((res) => res.data);
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, args) {
        return api.delete(`/users/${args.id}`).then((res) => res.data);
      },
    },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...UserRootQuery,
    ...CompanyRootQuery,
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation });
