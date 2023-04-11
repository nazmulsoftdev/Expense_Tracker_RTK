import React, { useEffect } from "react";
import TransactionList from "./TransactionList";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../features/transaction/transactionSlice";
import Loading from "../Loading/Loading";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function Transaction() {
  const dispatch = useDispatch();
  const { isLoading, isError, error, transactions } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  // Decide what to render
  let Content = null;

  if (isLoading) Content = <Loading />;
  if (!isLoading && isError) Content = <ErrorMessage Message={error} />;
  if (!isLoading && !isError && transactions?.length === 0) {
    Content = <p className="text-red-500">Data Not Found add new data !</p>;
  }
  if (!isLoading && !isError && transactions?.length > 0) {
    Content = transactions.map((transaction) => (
      <TransactionList key={transaction.id} transaction={transaction} />
    ));
  }

  return (
    <div className="mt-20">
      <p className=" text-white ">Your Transactions:</p>
      <div className="h-[500px] overflow-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 scrollbar-w-[2px]">
        <ul>{Content}</ul>
      </div>
    </div>
  );
}

export default Transaction;
