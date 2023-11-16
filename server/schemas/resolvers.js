// import the models
const { User, Book } = require('../models');
// import signToken function and AuthError class from Apollo Server package
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        // get a single user
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('savedBooks')

                return userData;
            }

            throw AuthenticationError;
        }
    },

    Mutation: {
        // find a user when they log in with correct email and password
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            
            // if no user with that email address, return an Authentication error
            if(!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw AuthenticationError;
            }

            // if email and password are correct, sign token and
            // return an object with token and user properties
            const token = signToken(user);
            return { token, user };
        },

        // add a user to the database
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        // save a book to a user's `savedBooks` field
        saveBook: async (parent, { bookData }, context) => {
            if(context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: bookData }},
                    { new: true }
                );

                return updatedUser;
            }

            throw AuthenticationError;
        },

        // remove a book from a user's `savedBooks` field
        removeBook: async (parent, { bookId }, context) => {
            if(context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId }}},
                    { new: true }
                );

                return updatedUser;
            }

            throw AuthenticationError;
        }
    },
};

module.exports = resolvers;