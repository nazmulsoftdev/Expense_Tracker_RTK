import React from "react";
import { LineWave } from "react-loader-spinner";

function Loading() {
  return (
    <div className="flex justify-center items-center">
      <LineWave
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="line-wave"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        firstLineColor="red"
        middleLineColor="green"
        lastLineColor="yellow"
      />
    </div>
  );
}

export default Loading;
