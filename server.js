const express = require('express');
const expressGraphQL = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');
const app = express();
const PORT = 3001;

const users = [
    {
        id: 1,
        username: 'user1',
        password: 'pass'
    },
    {
        id: 2,
        username: 'user2',
        password: 'pass2'
    },
    {
        id: 3,
        username: 'user3',
        password: 'pass3'
    }
];

const userInfo = [
    {
        id: 1,
        name: 'Hiter',
        age: 28,
    },
    {
        id: 2,
        name: 'Noorjahan',
        age: 39,
    },
    {
        id: 3,
        name: 'Toby',
        age: 8,
    }
];

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'List of users',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLInt)},
        username: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: new GraphQLNonNull(GraphQLString)},
        user: {
            type: UserInfoType,
            resolve: (user) => {
                return userInfo.find(userInfo => userInfo.id === user.id)
            }
        }
    })
});

const UserInfoType = new GraphQLObjectType({
    name: 'UserInfoType',
    description: 'User Info',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLInt)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)},
    })
});

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    descrition: 'Root Query',
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            description: 'List of users',
            resolve: () => users
        },
        userInfo: {
            type: new GraphQLList(UserInfoType),
            description: 'USer Info',
            resolve: () => userInfo
        },
    })
});

const schema = new GraphQLSchema({
    query: RootQueryType
});

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))
app.listen(3001, () => console.log(`Server running on port ${PORT}`));