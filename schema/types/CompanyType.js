const graphql = require("graphql");
const api = require("../api");

const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(require("./UserType")),
      resolve(company) {
        const url = `/companies/${company.id}/users`;
        return api.get(url).then((resp) => resp.data);
      },
    },
  }),
});

module.exports = CompanyType;
