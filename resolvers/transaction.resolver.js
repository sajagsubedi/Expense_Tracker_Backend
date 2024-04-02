import Transaction from "../models/transaction.model.js";

const transactionResolver = {
    Query: {
        transactions: async (_, __, context) => {
            try {
                const user = await context.getUser();
                if (!user) {
                    throw new Error("Unauthorized");
                }
                const transactions = await Transaction.find({
                    userId: user._id
                });
                return transactions;
            } catch (err) {
                throw new Error(
                    err.message || "Error on fetching transactions"
                );
            }
        },
        transaction: async (_, { transactionId }) => {
            try {
                const transaction = await Transaction.findById(transactionId);
                return transaction;
            } catch (err) {
                throw new Error(err.message || "Error on fetching transaction");
            }
        },
        categoryStatistics: async (_, __, context) => {
            try {
              const user = await context.getUser();
                if (!user) {
                    throw new Error("Unauthorized");
                }
               const userTransactions=await Transaction.find({userId:user._id})
               const categoryTransactions={}
               userTransactions.forEach((transaction)=>{
                 if(!categoryTransactions[transaction.category]){
                   categoryTransactions[transaction.category]=0
                 }
                 categoryTransactions[transaction.category]+=transaction.amount
               })
               return Object.entries(categoryTransactions).map(([category,amount])=>({category,amount}))
            } catch (err) {
                throw new Error(
                    err.message || "Error on fetching category statistics"
                );
            }
        }
    },
    Mutation: {
        createTransaction: async (_, { input }, context) => {
            try {
                const user = await context.getUser();
                if (!user) {
                    throw new Error("Unauthorized");
                }
                const newTransaction = await Transaction.create({
                    ...input,
                    userId: user._id
                });
                return newTransaction;
            } catch (err) {
                throw new Error(err.message || "Error on creating transaction");
            }
        },
        updateTransaction: async (_, { input }, context) => {
            try {
                const user = await context.getUser();
                if (!user) {
                    throw new Error("Unauthorized");
                }
                const updatedTransaction = await Transaction.findOneAndUpdate(
                    { _id: input.transactionId, userId: user._id },
                    input,
                    { new: true }
                );
                return updatedTransaction;
            } catch (err) {
                throw new Error(err.message || "Error on updating transaction");
            }
        },
        deleteTransaction: async (_, { transactionId }, context) => {
            try {
                const user = await context.getUser();
                if (!user) {
                    throw new Error("Unauthorized");
                }
                const deletedTransaction = await Transaction.findOneAndDelete({
                    _id: transactionId,
                    userId: user._id
                });
                return deletedTransaction;
            } catch (err) {
                throw new Error(err.message || "Error on deleting transaction");
            }
        }
    }
};

export default transactionResolver;
