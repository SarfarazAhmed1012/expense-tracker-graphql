import { users } from "../dummyData/data.js"
import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
const userResolver = {
    Mutation: {
        signUp: async (_, { input }, context) => {
            try {
                const { username, name, password, gender } = input

                if (!username || !name || !password || !gender) {
                    throw new Error("Please fill all fields")
                }

                const userExists = await User.findOne({ username })

                if (userExists) {
                    throw new Error("User already exists")
                }

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt)

                // profile pictures
                const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
                const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

                const newUser = new User({
                    username,
                    name,
                    password: hashedPassword,
                    gender,
                    profilePicture: gender === 'male' ? boyProfilePic : girlProfilePic
                })

                await newUser.save()
                await context.login(newUser)
                return newUser
            } catch (error) {
                console.log(error)
                throw new Error("Internal server error")
            }
        },
        login: async (_, { input }, context) => {
            try {
                const { username, password } = input

                if (!username || !password) {
                    throw new Error("Please fill all fields")
                }

                const { user } = await context.authenticate("graphql-local", { username, password })
                await context.login(user)

                return user;
            } catch (error) {
                console.log(error)
                throw new Error("Internal server error")
            }

        },
        logout: async (_, __, context) => {
            try {
                await context.logout();
                req.session.destroy((err) => {
                    if (err) {
                        throw new Error("Failed to logout")
                    }
                })
                res.clearCookie("connect.sid")

                return {
                    message: "Logged out successfully"
                }
            } catch (error) {
                console.log(error)
                throw new Error("Internal server error")
            }
        },
        Query: {
            users: () => {
                return users
            },
            user: async (_, { userId }) => {
                try {
                    const user = await User.findById(userId)
                    if (!user) {
                        throw new Error("User not found")
                    }

                    return user
                } catch (error) {
                    console.log(error)
                    throw new Error("Internal server error")
                }
            },
            authUser: async (_, __, context) => {
                try {
                    const user = await context.getUser()
                    return user;
                } catch (err) {
                    console.log(err)
                    throw new Error("Internal server error")
                }
            }

            // TODO: Transaction/User relation
        },
    }
}

export default userResolver