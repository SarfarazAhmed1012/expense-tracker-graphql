import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TransactionPage from "./pages/TransactionPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import { useQuery } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";

function App() {
  const { loading, data, error } = useQuery(GET_AUTHENTICATED_USER);
  console.log({ loading }, { data }, { error });
  return (
    <>
      {data?.authUser && <Header />}
      <Routes>
        <Route
          path="/"
          element={data?.authUser ? <HomePage /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/login"
          element={!data?.authUser ? <LoginPage /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/signup"
          element={!data?.authUser ? <SignUpPage /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/transaction/:id"
          element={
            data?.authUser ? <TransactionPage /> : <Navigate to="/login" />
          }
        ></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
      <Toaster />
      {data?.authUser && <Footer />}
    </>
  );
}

export default App;
