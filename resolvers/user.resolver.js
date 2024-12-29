import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userResolver = {
  Query: {
    authUser: (_, __, context) => {
      try {
        const user = context.getUser();
        return user;
      } catch (err) {
        throw new Error(err.message || "Intenal Server Error");
      }
    },
    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (err) {
        throw new Error(err.message || "Error on fetching user");
      }
    },
  },
  Mutation: {
    signup: async (_, { input }, context) => {
      try {
        const { email, name, password, gender } = input;
        if (!email || !name || !password || !gender) {
          throw new Error("All fields are required");
        }
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          throw new Error("User with the given email already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const profilePicture = `https://www.gravatar.com/avatar`;

        const newUser = await User.create({
          email,
          name,
          password: hashedPassword,
          gender,
          profilePicture,
        });
        await context.login(newUser);
        return newUser;
      } catch (err) {
        throw new Error(err.message || "Internal Server Error");
      }
    },
    signin: async (_, { input }, context) => {
      try {
        const { email, password } = input;
        if (!email || !password) {
          throw new Error("All fields are required");
        }
        const { user } = await context.authenticate("graphql-local", {
          email,
          password,
        });
        await context.login(user);
        return user;
      } catch (err) {
        throw new Error(err.message || "Internal Server Error");
      }
    },
    logout: (_, __, context) => {
      try {
        context.logout();
        context.req.session.destroy((err) => {
          if (err) throw err;
        });
        context.res.clearCookie("connect.sid");
        return { message: "Logged Out successfully!" };
      } catch (err) {
        throw new Error(err.message || "Internal Server Error");
      }
    },
  },
};

export default userResolver;
