import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import {
  Typography,
  Box,
  Breadcrumbs,
  Skeleton,
  List,
  ListItem,
  Button
} from "@mui/material";

export default function RecipesPage() {
  const GET_RECIPES = gql`
    query { recipes { name id } }
  `;

  const { loading, error, data: { recipes } = {} } = useQuery(GET_RECIPES, {fetchPolicy: "network-only"});

  if (error) {
    return <Typography>Sorry, some error occurred!</Typography>
  }
  
  return (
    <Box mt={4}>

      <Breadcrumbs mt={2}>
        <Link underline="hover" color="inherit" to="/">Home</Link>
        <Typography color="text.primary">Recipes</Typography>
      </Breadcrumbs>

      <Typography my={2} variant="h3" component="h1">Recipes!</Typography>

      {
        loading ? <Skeleton width={210} height={400} /> :

        <Box>
          <Typography mb={2} variant="body1">
            These are the recipes currently available for your perusal.
          </Typography>

          <List>
            {
              recipes.map((recipe) =>
                <ListItem key={`recipe-${recipe.id}`}>
                  <a href={`/recipes/${recipe.id}`}>
                    <Typography>{recipe.name}</Typography>
                  </a>
                </ListItem>
            )}
          </List>
        </Box>
      }
      
      <Box my={4}>
       <Link to="/recipes/create">
        <Button variant="contained">Create a recipe</Button>
       </Link>
      </Box>

    </Box>
  )
}