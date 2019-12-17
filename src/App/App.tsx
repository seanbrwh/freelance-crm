import React from "react";
import Routes from "./Routes";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

export default function App() {
  return (
    <div>
      <Navbar />
      {Routes}
      <Footer />
    </div>
  );
}
