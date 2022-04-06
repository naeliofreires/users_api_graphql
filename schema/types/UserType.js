const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");
const api = require("../api");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: require("./CompanyType"),
      resolve(user) {
        const url = `/companies/${user.companyId}`;
        return api.get(url).then((resp) => resp.data);
      },
    },
  }),
});

module.exports = UserType;
