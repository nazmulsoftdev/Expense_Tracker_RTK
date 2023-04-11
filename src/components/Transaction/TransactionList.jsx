import React from "react";
import { AiOutlineEdit as EditIcon } from "react-icons/ai";
import { TiDeleteOutline as DeleteIcon } from "react-icons/ti";
import { useDispatch } from "react-redux";
import {
  editActive,
  removeTransactions,
} from "../../features/transaction/transactionSlice";
import { useNavigate } from "react-router-dom";

function TransactionList({ transaction }) {
  const dispatch = useDispatch();
  const { id, name, type, amount } = transaction || {};

  const navigate = useNavigate();

  //  Edit Handler

  const EditHandler = () => {
    dispatch(editActive(transaction));
  };

  //  Delete Handler

  const DeleteHandler = () => {
    dispatch(removeTransactions(id));
    navigate(0);
  };

  return (
    <div>
      <li className={`transaction ${type}`}>
        <p>{name}</p>
        <div className="right">
          <p>$ {amount}</p>
          <button className="link">
            <EditIcon onClick={EditHandler} />
          </button>
          <button className="link">
            <DeleteIcon onClick={DeleteHandler} />
          </button>
        </div>
      </li>
    </div>
  );
}

export default TransactionList;
