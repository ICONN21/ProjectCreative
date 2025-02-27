const { gql } = require('apollo-server-express')

const typeDefs = gql`
scalar JSON

    type User {
        id: ID!
        username: String!
        email: String!
        isAdmin: Boolean!
        role: String!
        characterSheets: [CharacterSheet]
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type Event {
        id: ID!
        title: String!
        date: String!
        maxParticipatns: Int!
        participants: [User]
    }
    
    type CharacterSheet {
        id: ID!
        user: User!
        characterName: String!
        class: String!
        level: Int!
        abilities: JSON
        equipment: [String]
    }

    input CreateUserInput {
        username: String!
        email: String!
        password: String!
        isAdmin: Boolean 
    }

    input LoginInput {
        email: String!
        password: String!
    }

    input CreateEventInput {
        title: String!
        date: String!
        maxParticipants: Int!
    }

    input CreateCharacterInput {
        userId: ID!
        characterName: String!
        class: String!
        level: Int!
        abilities: JSON
        equipment: [String]
    }

    type Query {
        users: [User]
        user(id: ID!): User
        events: [Event]
        event(id: ID!): Event
        characterSheets: [CharacterSheet]
        characterSheet(id: ID!): CharacterSheet
        me: User
    }

    type Mutation {
        createUser(input: CreateUserInput!): AuthPayload
        login(input: LoginInput!): AuthPayload
        logout: Boolean
        createEvent(input: CreateEventInput!): Event
        createCharacter(input: CreateCharacterInput!): CharacterSheet
        signupForEvent(eventId: ID!, userId: ID!): Event
        deleteUser(id: ID!): Boolean
        deleteEvent(id: ID!): Boolean
        deleteCharacter(id: ID!): Boolean
    }
    `;

    module.exports = typeDefs;