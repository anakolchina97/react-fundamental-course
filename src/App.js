import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/ui/navbar/Navbar";
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./context";
import "./styles/App.css";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setIsAuth(true);
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        isLoading,
      }}
    >
      <BrowserRouter>
        {isAuth && <Navbar />}
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
