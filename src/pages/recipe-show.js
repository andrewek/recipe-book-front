import { Link, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import {
  Typography,
  Box,
  Breadcrumbs,
  Skeleton,
  Button,
} from "@mui/material";

function RecipeShow() {
  const {id} = useParams();

  const RECIPE_QUERY = gql`
    query($id: ID!) {
      recipe(id: $id) {
        name
        id
        durationInMinutes
        author {name id}
        category {name id}
      }
    }
  `

  const { loading, error, data } = useQuery(
    RECIPE_QUERY,
    {variables: {id: id}}
  );

  if (error) {
    return <Typography>Sorry, some error occurred!</Typography>
  }


  return(
    <Box mt={4}>

      <Breadcrumbs mt={2}>
        <Link underline="hover" color="inherit" to="/">Home</Link>
        <Link underline="hover" color="inherit" to="/recipes">Recipes</Link>
        <Typography color="text.primary">
          { loading ? <Skeleton width={210} /> : data.recipe.name }
        </Typography>
      </Breadcrumbs>

      <Box mt={4}>
        <Typography my={2} variant="h3" component="h1">
          { loading ? <Skeleton width={400}/> : data.recipe.name }
        </Typography>
        
        <Typography variant="body1">
          {
            loading ? <Skeleton width={400}/> : 
            <Typography><strong>Time to make:</strong> {data.recipe.durationInMinutes} minutes</Typography>
          }
        </Typography>

        <Typography variant="body1">
          {
            loading ? <Skeleton width={400}/> :
            <Typography><strong>Authored by:</strong> {data.recipe.author.name}</Typography>
          }
          </Typography>

        <Typography variant="body1">
          {
            loading ? <Skeleton width={400} /> :
            <Typography><strong>Category: </strong>{data.recipe.category.name}</Typography>
          }
        </Typography>

        <Box mt={2} ml={0}>
          <Link to=".." relative="path">
            <Button variant="contained" mt={2}>
              <Typography variant="body1" color="white">
                Back
              </Typography>
            </Button>
          </Link>
        </Box>
        
      </Box>
    </Box>
  );
}

export default RecipeShow;