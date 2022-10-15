import {Link, useNavigate, useParams} from "react-router-dom";
import {gql, useQuery} from "@apollo/client";
import {
  Typography,
  Box,
  Breadcrumbs,
  Skeleton,
  Button,
  Tabs,
  Tab
} from "@mui/material"
import { useState } from "react";

function AuthorShow() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0)
  
  // ----> HANDLE GRAPHQL.
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

  const { loading, error, data: { author, author: { recipes } = {} } = {} } = useQuery(
    AUTHOR_QUERY, 
    {variables: {id: id}}
  );

  // ----> HANDLE PAGINATION.
  const handlePagination = (event, value) => {
    console.log(value)
    setCurrentTab(value)
  };

  const TabPanel = ( recipe, index, currentTab ) => {
    return (
      <Box
        role="tabpanel"
        hidden={currentTab !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        key={`recipe+${recipe.id}`}
        sx={{ width: "90%" }}
      >
        { currentTab === index && (
          <Box sx={{
            p: 3,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around"
          }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
              <Typography variant="body1" mb={2}>
                {recipe.name} ({recipe.durationInMinutes} minutes)
              </Typography>
              <Button
                onClick={() => navigate(`/recipes/${recipe.id}`)}
                ml={2}
              >
                Read more
              </Button>
            </Box>
            <img
              src={`https://picsum.photos/400/200?random=${index}`}
              alt={recipe.name}
              style={{ maxWidth: "60%" }}
            />
          </Box>
        )}
      </Box>
    )
  }

  if (error) {
    return <Typography>Sorry, some error occurred!</Typography>
  }
  
  return (
    <Box mt={4}>
      
      <Breadcrumbs mt={2}>
        <Link underline="hover" color="inherit" to="/">Home</Link>
        <Link underline="hover" color="inherit" to="/authors">Authors</Link>
        <Typography color="text.primary">
          { loading ? <Skeleton width={210} /> : author.name }
        </Typography>
      </Breadcrumbs>

      <Box mt={4}>
        <Typography variant="h3" component="h1">
          { loading ? <Skeleton width={400}/> : author.name }
        </Typography>
      </Box>

      <Box mt={4} >
        <Typography variant="h4" component="h2" mb={4}>Recipes</Typography>
        
        { loading ? <Skeleton height={400} />
        : recipes.length === 0 ?
          <Typography>This author has no recipes...</Typography> :
          <Box sx={{ flexGrow: 1, display: "flex" }}>
          <Box mr={4}>
            <Tabs
              value={currentTab}
              onChange={handlePagination}
              orientation="vertical"
              variant="scrollable"
              sx={{ borderRight: 1, borderColor: "divider"}}
            >
              {
                recipes.map((recipe, index) =>
                  <Tab
                    label={`${recipe.name}`}
                    id={`simple-tab-${index}`}
                    aria-controls={`simple-tabpanel-${index}`}
                    key={`recipe+${recipe.id}`}
                  />
                )
              }
            </Tabs>
          </Box>
          {
            recipes.map((recipe, index) => 
              TabPanel(recipe, index, currentTab)
            )
          }
        </Box>
        }

      </Box>

      <Box mt={4} ml={0}>
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