import {React} from "react";
import {Route, Routes, Link} from "react-router-dom"
import {
  Box,
  AppBar,
  Container,
  Toolbar,
  Typography
} from "@mui/material";

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
    <>
    <header>
      <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{flexGrow: 1}}
            >
              Recipe Book
            </Typography>
            <Link
              to="/authors"
            >
              <Typography
                variant="body1"
                mx={2}
                color={"#FFF"}
              >
                Authors
              </Typography>
            </Link>
            <Link
              to="/recipes"
            >
              <Typography
                variant="body1"
                mx={2}
                color={"#FFF"}
              >
                Recipes
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
    <main>
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/authors" element={<AuthorsPage authors={authors} />} />
          <Route 
            path="/authors/:id" 
            element={<AuthorShow authors={authors} />} 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </main>
    </>
  );
}

export default App;
