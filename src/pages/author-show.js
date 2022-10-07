import {Link, useParams} from "react-router-dom";
import {gql, useQuery} from "@apollo/client";
import {
  Typography,
  Box,
  List,
  ListItem,
  Breadcrumbs,
  Skeleton
} from "@mui/material"

function AuthorShow() {
  let {id} = useParams();
  
  const AUTHOR_QUERY = gql`
    query($id: ID!) { 
      author(id: $id) { 
        name 
        id
        recipes {
          name
          id
          durationInMinutes
        }
      }
    }
  `

  const {loading, error, data} = useQuery(
    AUTHOR_QUERY, 
    {variables: {id: id}}
  );

  if(error) {
    return <p>Error, sorry....</p>
  }
  
  return(
    <>
      <Breadcrumbs mt={2}>
        <Link underline="hover" color="inherit" href="/">Home</Link>
        <Link underline="hover" color="inherit" href="/authors">Authors</Link>
        <Typography color="text.primary">
          {loading ? <Skeleton width={210} /> : data.author.name}
        </Typography>
      </Breadcrumbs>

      <Box mt={4}>
        <Typography variant="h3" component="h1">
          {loading ? <Skeleton width={400}/> : data.author.name}
        </Typography>
      </Box>
      <Box mt={4}>
        <Typography variant="h4" component="h2">Recipes</Typography>
        <List>
          { loading ? <Skeleton height={400} />
          : data.author.recipes.map((recipe) => 
            <ListItem key={recipe.id}>
              <Typography variant="body1">
                {recipe.name} ({recipe.durationInMinutes} minutes)
              </Typography>
            </ListItem>
          )}
        </List>
      </Box>
      <Box mt={4}>
        <Typography variant="body1">
          <Link to=".." relative="path">Back</Link>
        </Typography>
      </Box>
    </>
  );
}

export default AuthorShow;