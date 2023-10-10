import React from "react";
import "./App.css";
import AllRoutes from "./AllRoutes";
import Navbar from "./components/Blogs/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="px-10">
        <AllRoutes />
      </div>
    </div>
  );
}

export default App;
