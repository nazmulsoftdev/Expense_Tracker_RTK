import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTransactions,
  deleteTransactions,
  editTransactions,
  getTransactions,
} from "./transactionAPI";

// Initial state

const initialState = {
  isLoading: false,
  isError: false,
  transactions: [],
  error: "",
  editing: {},
};

// create fecth thunk

export const fetchTransactions = createAsyncThunk(
  "transaction/fetchTransactions",
  async () => {
    const transaction = await getTransactions();

    return transaction;
  }
);

// create add thunk

export const createTransactions = createAsyncThunk(
  "transaction/createTransactions",
  async (data) => {
    const transaction = await addTransactions(data);
    return transaction;
  }
);

// create edit thunk

export const changeTransactions = createAsyncThunk(
  "transaction/changeTransactions",
  async ({ id, data }) => {
    const transaction = await editTransactions(id, data);
    return transaction;
  }
);

// create delete thunk

export const removeTransactions = createAsyncThunk(
  "transaction/removeTransactions",
  async (id) => {
    const transaction = await deleteTransactions(id);
    return transaction;
  }
);

// create reducer

const transactionSlice = createSlice({
  initialState,
  name: "transaction",
  reducers: {
    editActive: (state, action) => {
      state.editing = action.payload;
    },
    editInActive: (state) => {
      state.editing = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;

        state.transactions = [];
        state.error = action.error?.message;
      })
      .addCase(createTransactions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions.push(action.payload);
      })
      .addCase(createTransactions.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error?.message;
      })

      .addCase(changeTransactions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(changeTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const indexToUpdate = state.transactions.findIndex(
          (i) => i.id === action.payload
        );

        state.transactions[indexToUpdate] = action.payload;
      })
      .addCase(changeTransactions.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error?.message;
      })

      .addCase(removeTransactions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(removeTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        state.transactions = state.transactions.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(removeTransactions.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error?.message;
      });
  },
});

export default transactionSlice.reducer;

export const { editActive, editInActive } = transactionSlice.actions;
