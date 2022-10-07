import {Link, useParams} from "react-router-dom";
import {
  Typography,
  Box
} from "@mui/material"

function AuthorShow({authors}) {
  let {id} = useParams();
  const author = authors.find(author => author.id == id);
  
  return(
    <Box mt={4}>
      <Typography variant="h3" component="h1">{author.name}</Typography>

      <Typography variant="body1">
        <Link to=".." relative="path">Back</Link>
      </Typography>
    </Box>
  );
}

export default AuthorShow;