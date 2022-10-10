import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import {
  Typography,
  Box,
  Button,
  Breadcrumbs,
  Skeleton,
  List,
  ListItem
} from "@mui/material"

function AuthorsPage() {
  const GET_AUTHORS = gql`
    query { authors { name id } }
  `;

  const { loading, error, data } = useQuery(GET_AUTHORS, {fetchPolicy: "network-only"});

  if (error) {
    return <Typography>Sorry, some error occurred!</Typography>
  }

  return(
    <Box mt={4}>

      <Breadcrumbs mt={2}>
        <Link underline="hover" color="inherit" to="/">Home</Link>
        <Typography color="text.primary">Authors</Typography>
      </Breadcrumbs>

      <Typography my={2} variant="h3" component="h1">Authors!</Typography>

      {
        loading ? <Skeleton width={210} height={400} /> :

        <Box>

          <Typography mb={2} variant="body1">
            These are the authors who currently have recipes available. 
            Maybe. Maybe they're just in the system.
          </Typography>

          <List>
            {
              data.authors.map((author) =>
                <ListItem key={`author-${author.id}`}>
                  <a href={`/authors/${author.id}`}>
                    <Typography>{author.name}</Typography>
                  </a>
                </ListItem>
            )}
          </List>

        </Box>
      }

      <Box my={4}>
        <Button><Link to="/authors/create">Signup an author</Link></Button>
      </Box>
    </Box>
  )
};

export default AuthorsPage;