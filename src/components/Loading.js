import React from "react";
import Loader from "react-loader-spinner";

function Loading({ size = 50 }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {/* <Spinner
        style={{
          width: size,
          height: size,
        }}
        animation="grow"
      /> */}
       <Loader
        type="BallTriangle"
        color="#00BFFF"
        height={100}
        width={100}
      />
    </div>
  );
}

export default Loading;