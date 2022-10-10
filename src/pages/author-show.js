import {Link, useNavigate, useParams} from "react-router-dom";
import {gql, useQuery} from "@apollo/client";
import {
  Typography,
  Box,
  List,
  ListItem,
  Breadcrumbs,
  Skeleton,
  Button
} from "@mui/material"

function AuthorShow() {
  const {id} = useParams();
  const navigate = useNavigate();
  
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

  const { loading, error, data } = useQuery(
    AUTHOR_QUERY, 
    {variables: {id: id}}
  );

  if (error) {
    return <Typography>Sorry, some error occurred!</Typography>
  }

  
  return (
    <Box mt={4}>
      
      <Breadcrumbs mt={2}>
        <Link underline="hover" color="inherit" to="/">Home</Link>
        <Link underline="hover" color="inherit" to="/authors">Authors</Link>
        <Typography color="text.primary">
          { loading ? <Skeleton width={210} /> : data.author.name }
        </Typography>
      </Breadcrumbs>

      <Box mt={4}>
        <Typography variant="h3" component="h1">
          { loading ? <Skeleton width={400}/> : data.author.name }
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="h4" component="h2">Recipes</Typography>
        
        <List dense>
          { loading ? <Skeleton height={400} />
          : data.author.recipes.length === 0 ?
            <Typography>This author has no recipes...</Typography> :
            data.author.recipes.map((recipe) => 
              <ListItem key={recipe.id} >
                <Typography variant="body1">
                  {recipe.name} ({recipe.durationInMinutes} minutes)
                </Typography>
                <Button
                  onClick={() => navigate(`/recipes/${recipe.id}`)}
                  ml={2}
                >
                  Read more
                </Button>
              </ListItem>
          )}
        </List>

      </Box>

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
  );
}

export default AuthorShow;