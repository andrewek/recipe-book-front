import {React} from "react";
import {Route, Routes} from "react-router-dom"

import HomePage from "./pages/home-page"
import AuthorsPage from "./pages/authors-list"
import AuthorShow from "./pages/author-show"
import NotFound from "./pages/errors/not-found"

function App() {
  const authors = [
    {name: "Julia Turshen", id: 1},
    {name: "Guy Fieri", id: 2},
    {name: "Barefoot Contessa", id: 3},
    {name: "Angela Garbacz", id: 4},
    {name: "David Choi", id: 5},
    {name: "Syd Workman", id: 6},
    {name: "Andrew Ek", id: 7},
  ]

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/authors" element={<AuthorsPage authors={authors} />} />
      <Route 
        path="/authors/:id" 
        element={<AuthorShow authors={authors} />} 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
