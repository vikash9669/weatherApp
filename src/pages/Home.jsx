import React, { useState } from "react";
import LandingPage from "../components/LandingPage";

const Home = () => {
  return (
    <>
      <div
        className="d-flex justify-center content-center bg-cover bg-no-repeat w-100 pt-4 vh-100"
        style={{ padding: "10px", backgroundImage: 'url("/cabin.jpg")' }}
      >
        <LandingPage />
      </div>
    </>
  );
};

export default Home;
