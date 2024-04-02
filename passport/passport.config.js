import passport from "passport";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";

export const configurePassport = async () => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });

    passport.use(
        new GraphQLLocalStrategy(async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error("Invalid email or password!");
                }
                const isValidPassword = await bcrypt.compare(
                    password,
                    user.password
                );
                if (!isValidPassword) {
                    throw new Error("Invalid email or password!");
                }
                done(null,user)
            } catch (err) {
                done(err);
            }
        })
    );
};
