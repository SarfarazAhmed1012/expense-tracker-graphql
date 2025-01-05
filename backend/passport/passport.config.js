import passport from "passport";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";

export const configurePassport = async () => {
    passport.serializeUser((user, done) => {
        console.log("Serializing user: ", user);
        done(null, user._id)
    })

    passport.deserializeUser(async (userId, done) => {
        console.log("Deserializing user: ", userId);

        try {
            const user = await User.findById(userId);
            done(null, user)
        } catch (err) {
            done(err)
        }
    })

    passport.use(
        new GraphQLLocalStrategy(async (username, password, done) => {
            try {
                const user = await User.findOne({ username });
                if (!user) {
                    return done(null, false, { message: "Invalid credentials" })
                }

                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    return done(null, false, { message: "Invalid credentials" })
                }

                return done(null, user)
            }
            catch (err) {
                done(err)
            }
        })
    )

}