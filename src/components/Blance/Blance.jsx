import React from "react";
import { RiMoneyDollarCircleLine as MoneyIcon } from "react-icons/ri";
import { useSelector } from "react-redux";
import NumberWithCommas from "../../utils/ThousandSeparator";

function Blance() {
  const { transactions } = useSelector((state) => state.transaction);

  //  Canculate Blance

  const BlanceCalculate = (blance) => {
    let total = 0;

    blance.forEach((item) => {
      const { type, amount } = item;

      if (type === "income") {
        total += amount;
      } else {
        total -= amount;
      }
    });
    return total;
  };

  return (
    <div className="flex justify-end">
      <button
        title="Click to see blance"
        className={`w-[150px]  text-white-400 hover:bg-green-500 font-bold py-2 px-4 rounded-sm inline-flex items-center m-4 ${
          BlanceCalculate(transactions) > -1 ? "bg-green-400" : "bg-red-500"
        }`}
      >
        <span className="text-white"> Blance: </span>
        <MoneyIcon size={20} color="white" />
        <span className="text-white">
          {transactions?.length > 0
            ? NumberWithCommas(BlanceCalculate(transactions))
            : 0}{" "}
        </span>
      </button>
    </div>
  );
}

export default Blance;
