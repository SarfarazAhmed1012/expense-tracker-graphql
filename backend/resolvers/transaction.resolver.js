import Transaction from "../models/transaction.model.js"
import User from "../models/user.model.js"

const transactionResolver = {
    Query: {
        transactions: async (_, __, context) => {
            try {
                if (!context.getUser()) throw new Error("Unauthenticated")

                const userId = await context.getUser()._id

                const transactions = await Transaction.find({ userId })

                return transactions
            } catch (err) {
                console.log(err)
                throw new Error("Internal server error")

            }
        },
        transaction: async (_, { transactionId }) => {
            try {
                const transaction = await Transaction.findById(transactionId)

                if (!transaction) {
                    throw new Error("Transaction not found")
                }

                return transaction
            } catch (err) {
                console.log(err)
                throw new Error("Internal server error")
            }
        },
        categoryStatistics: async (_, __, context) => {
            if (!context.getUser()) throw new Error("Unauthenticated")
            const userId = context.getUser()._id
            const transactions = await Transaction.find({ userId })

            const categoryMap = {}
            transactions.forEach((transaction) => {
                if (!categoryMap[transaction.category]) {
                    categoryMap[transaction.category] = 0
                }
                categoryMap[transaction.category] += transaction.amount
            })

            return Object.entries(categoryMap).map(([key, value]) => ({ category: key, totalAmount: value }))
        }
    },
    Mutation: {
        createTransaction: async (_, { input }, context) => {
            try {
                const newTransaction = new Transaction({
                    ...input,
                    userId: context.getUser()._id
                })

                const result = await newTransaction.save()
                return result
            } catch (error) {
                console.log(error)
                throw new Error("Internal server error")
            }
        },
        updateTransaction: async (_, { input }) => {
            try {
                const transaction = await Transaction.findByIdAndUpdate(input.transactionId, input, { new: true })

                if (!transaction) {
                    throw new Error("Transaction not found")
                }

                return transaction
            } catch (err) {
                console.log(err)
                throw new Error("Internal server error")
            }
        },
        deleteTransaction: async (_, { transactionId }) => {
            try {
                const transaction = await Transaction.findByIdAndDelete(transactionId)

                if (!transaction) {
                    throw new Error("Transaction not found")
                }

                return transaction
            } catch (err) {
                console.log(err)
                throw new Error("Internal server error")
            }
        }
    },
    Transaction: {
        user: async (parent) => {
            const userId = parent.userId
            try {
                const user = await User.findById(userId)
                return user
            } catch (error) {
                console.log(error)
                throw new Error("Internal server error")
            }
        }
    }
}

export default transactionResolver