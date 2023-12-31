import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MovieDetail from "./pages/MovieDetail";
import SearchResult from "./pages/SearchResult";
import CallBackPage from "./pages/auth/google/callback/index"
import AllMovies from "./pages/AllMovies";
import RecommendForm from "./pages/RecommendForm";
import { NotFound } from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/movie/:_id" element={<MovieDetail/>} />
        <Route path="/movie/search" element={<SearchResult/>} />
        <Route path="/movie/all" element={<AllMovies/>} />
        <Route path="/recommend" element={<RecommendForm/>} />
        <Route exact path="/auth/google/callback" element={<CallBackPage/>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;