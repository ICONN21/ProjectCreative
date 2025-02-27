const GraphQLJSON = require('graphql-type-json');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Event = require('../models/Event');
const CharacterSheet = require('../models/CharacterSheet');
const User = require('../models/User');
const { AuthenticationError } = require('apollo-server-express');

const SECRET_KEY = process.env.JWT_SECRET || 'mysecretssshhhhhhh';

const resolvers = {
    JSON: GraphQLJSON,
    Query: {
        users: async() => await User.find(),
        user: async (_, { id }) => await User.findById(id),
        events: async () => await Event.find(),
        event: async (_, { id }) => await Event.findById(id),
        characterSheets: async () => await CharacterSheet.find(),
        characterSheet: async (_, { id }) => await CharacterSheet.findById(id),

        me: async (_, context) => {
            if (!context.req.user) throw new AuthenticationError('Not authenticated');
            return User.findById(context.req.user._id);
        }
    },

    Mutation: {
        createUser: async (_, { input }) => {
            const existingUser = await User.findOne({ email: input.email});
            if (existingUser) {
                throw new Error ('A user with this email already exists.')
            }

            const hashedPassword = await bcrypt.hash(input.password, 10);
            const user = new User({ ...input, password: hashedPassword });
            await user.save();

            const token = jwt.sign({ _id: User._id, isAdmin: user.isAdmin }, SECRET_KEY, { expiresIn: '2h' });
            return { token, user };
        },

        login: async(_, { input }) => {
            console.log("Login Attempt:", input.email)

            const user = await User.findOne ({email: input.email });
            if(!user) {
                console.log("User not found.")
                throw new AuthenticationError('Invalid email or password')
            }

            console.log("Stored Hashed Password:", user.password);

            const isValidPassword = await bcrypt.compare(input.password, user.password);
            if(!isValidPassword) {
                console.log("password does not match.")
                throw new AuthenticationError('Invalid email or password')
            }
            const token = jwt.sign({ _id: User._id, isAdmin: user.isAdmin}, SERCRET_KEY, { expiresIn: '2h'});
            console.log("Login Successful. Token:", token);
            return {token, user};
        },

        logout: async (_, context) => {
            return true;
            //Fontend should delete the JWT
        },


        createEvent: async (_, { input }) => {
            if (!context.req.user || !context.req.user.isAdmin) {
                throw new Error ('Only admins can create events.')
            }
            const event = new Event(input);
            await event.save();
            return event;
        },

        deleteEvent: async (_, { id}, context) => {
            if (!context.req.user || !context.req.user.isAdmin) {
                throw new Error ("Only admins can delete events.")
            }
            const result = await Event.findByIdAndDelete(id);
            return result ? true : false;
        },

        createCharacter: async (_, { input }) => {
            const characterSheet = new CharacterSheet(input);
            await characterSheet.save()
            return characterSheet;
        },

        signupForEvent: async (_, { eventId, userId }) => {
            const event = await Event.findById(eventId);
            if (!event) throw new Error('Event not found');
            event.participants.push(userId);
            await event.save();
            return event;
        },

        deleteUser: async (_, { id }) => {
            const result = await User.findByIdAndDelete(id);
            return result ? true : false;
        },
        
        deleteCharacter: async (_, { id }) => {
            const result = await CharacterSheet.findByIdAndDelete(id);
            return result ? true : false;
        },
    },
};

module.exports = resolvers