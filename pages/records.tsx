import React from "react";
import Navbar from "../components/Navbar";
import RecordsBody from "../components/RecordsBody";

const Records = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar />
      <RecordsBody />
    </div>
  );
};

export default Records;
