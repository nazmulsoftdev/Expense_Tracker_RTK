import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTransactions,
  createTransactions,
  editInActive,
} from "../../features/transaction/transactionSlice";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";

function Form() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isLoading, isError, error, editing } = useSelector(
    (state) => state.transaction
  );

  // Form Reset Handler

  const reset = () => {
    setName("");
    setType("");
    setAmount("");
  };

  useEffect(() => {
    const { id, name, type, amount } = editing || {};
    if (id) {
      setName(name);
      setType(type);
      setAmount(amount);
      setEditMode(true);
    } else {
      reset();
    }
  }, [editing]);

  // Form Handle Submit

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTransactions({ name, type, amount: Number(amount) }));
    reset();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      changeTransactions({
        id: editing?.id,
        data: {
          name,
          type,
          amount,
        },
      })
    );
    setEditMode(false);
    reset();
    navigate(0);
  };

  // cancell update handler

  const cancellEditModeHandler = () => {
    dispatch(editInActive());
    setEditMode(false);
    reset();
  };

  return (
    <div>
      <div className="form">
        <h3>Add new transaction</h3>
        <form onSubmit={editMode ? handleUpdate : handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="p-2 outline-none"
              type="text"
              placeholder="My Salary"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group radio">
            <label>Type</label>
            <div className="radio_group">
              <input
                type="radio"
                value="income"
                className="p-2 outline-none"
                name="type"
                checked={type === "income"}
                onChange={() => setType("income")}
                required
              />
              <label>Income</label>
            </div>
            <div className="radio_group">
              <input
                className="p-2 outline-none"
                type="radio"
                value="expense"
                name="type"
                placeholder="Expense"
                checked={type === "expense"}
                onChange={() => setType("expense")}
                required
              />
              <label>Expense</label>
            </div>
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              className="p-2 outline-none"
              type="number"
              placeholder="300"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn bg-green-600 mt-3 mb-2">
            {editMode ? "Update Data" : "Add Transaction"}
          </button>

          {/* Show Loading until it's pending */}

          {isLoading && <Loading />}

          {/* Show Error */}
          {!isLoading && isError && <ErrorMessage Message={error} />}

          {editMode && (
            <button onClick={cancellEditModeHandler} className="btn bg-red-500">
              Cancel Edit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Form;
