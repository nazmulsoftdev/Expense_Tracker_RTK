import React from "react";
import Form from "../Form/Form";
import Transaction from "../Transaction/Transaction";

function Layout() {
  return (
    <div className="w-[95%] m-auto flex flex-col justify-center items-center lg:w-[70%] lg:m-auto lg:grid lg:grid-cols-2 ">
      <Form />
      <Transaction />
    </div>
  );
}

export default Layout;
