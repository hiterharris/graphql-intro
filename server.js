const express = require('express');
const expressGraphQL = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');
const app = express();
const PORT = 3001;

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'helloWorld',
        fields: () => ({
            message: {
                type: GraphQLString,
                resolve: () => 'Hello world!!'
            }
        })
    })
});

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))
app.listen(3001, () => console.log(`Server running on port ${PORT}`));