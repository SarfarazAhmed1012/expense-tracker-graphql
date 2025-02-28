import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { useMutation } from "@apollo/client";
import { DELETE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
import toast from "react-hot-toast";

const categoryColorMap = {
  saving: "from-green-500 to-green-300",
  expense: "from-pink-500 to-pink-300",
  investment: "from-blue-500 to-blue-300",
};

const Card = ({ transaction, authUser }) => {
  const cardClass = categoryColorMap[transaction.category];
  // console.log(transaction);

  // delete transaction
  const [deleteTransaction, { loading, error }] = useMutation(
    DELETE_TRANSACTION,
    {
      refetchQueries: ["GetTransactions", "GetTransactionsByCategory"],
    }
  );

  const handleDelete = async () => {
    try {
      const { data } = await deleteTransaction({
        variables: { transactionId: transaction._id },
      });
      toast.success("Transaction deleted successfully");
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            {transaction.category[0].toUpperCase() +
              transaction.category.slice(1)}
          </h2>
          <div className="flex items-center gap-2">
            {!loading && (
              <FaTrash className={"cursor-pointer"} onClick={handleDelete} />
            )}
            {loading && (
              <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-white rounded-full"></div>
            )}

            <Link to={`/transaction/${transaction._id}`}>
              <HiPencilAlt className="cursor-pointer" size={20} />
            </Link>
          </div>
        </div>
        <p className="text-white flex items-center gap-1">
          <BsCardText />
          Description:{" "}
          {transaction.description[0].toUpperCase() +
            transaction.description.slice(1)}
        </p>
        <p className="text-white flex items-center gap-1">
          <MdOutlinePayments />
          Payment Type:{" "}
          {transaction.paymentType[0].toUpperCase() +
            transaction.paymentType.slice(1)}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaSackDollar />
          Amount: Rs{transaction.amount}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaLocationDot />
          Location: {transaction.location || "N/A"}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-black font-bold">
            {formatDate(transaction.date)}
          </p>
          <img
            src={
              authUser
                ? authUser.profilePicture
                : "https://tecdn.b-cdn.net/img/new/avatars/2.webp"
            }
            className="h-8 w-8 border rounded-full"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
export default Card;
