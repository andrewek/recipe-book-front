import { Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

function HomePage() {
  return(
    <Box style={{ textAlign:"center", padding: "10%" }}> 
      <Typography variant="h1" component="h1">Welcome</Typography>
      <Typography variant="h4" component="h2">{"(To the world's most breakable recipe book.)"}</Typography>
      <Box my={4}>
        <Button variant="outlined"><Link to="/authors/create">Signup an author</Link></Button>
      </Box>
    </Box>

  );
};

export default HomePage;