import {React} from "react"
import {gql, useQuery} from "@apollo/client";
import {
  Typography,
  Box
} from "@mui/material"

function AuthorsPage() {
  const GET_AUTHORS = gql`
    query { authors { name id } }
  `;

  const {loading, error, data} = useQuery(GET_AUTHORS);

  if(loading) {
    return <p>Loading, sorry....</p>
  }

  if(error) {
    return <p>Error, sorry....</p>
  }

  return(
    <Box mt={4}>
      <Typography variant="h3" component="h1">Authors!</Typography>

      <Typography variant="body1">
      These are the authors who currently have recipes available. 
      Maybe. Maybe they're just in the system.

      <ul>
        {data.authors.map((author) =>
          <li key={`author-${author.id}`}>
            <a href={`/authors/${author.id}`}>
              {author.name}
            </a>
          </li>
        )}
      </ul>
      </Typography>
    </Box>
  )
};

export default AuthorsPage;