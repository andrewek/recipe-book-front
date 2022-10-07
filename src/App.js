import {React} from "react";
import {Route, Routes} from "react-router-dom"

import HomePage from "./pages/home-page"
import AuthorsPage from "./pages/authors-page"
import NotFound from "./pages/errors/not-found"

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/authors" element={<AuthorsPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
