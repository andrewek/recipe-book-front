import { Link, useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import {
  Typography,
  Box,
  Breadcrumbs,
  Button,
  FormControl,
  Input,
  InputLabel,
} from "@mui/material"
import { useState } from "react";

export default function RecipeCreate() {
  const navigate = useNavigate();


  // ----> FORM CONTROLS.
  const initialFormState = {
    name: "",
    durationInMinutes: 0,
    categoryId: 0,
    authorId: 0
  };
  const [recipe, setRecipe] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    let { value } = target;
    if (target.name === "authorId" || target.name === "categoryId" || target.name === "durationInMinutes") {
      value = Number(target.value);
    } 

    setRecipe({
      ...recipe,
      [target.name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await RecipeCreate({ variables: recipe });
    if (!error) navigate("/recipes");
  }

  // ----> GRAPHQL QUERIES.
  const RECIPE_MUTATION = gql`
    mutation($name: String!, $durationInMinutes: Int!, $authorId: Int!, $categoryId: Int!) { createRecipe(input: { params: {
      name: $name,
      durationInMinutes: $durationInMinutes,
      authorId: $authorId,
      categoryId: $categoryId
    }}) {
      recipe { name id durationInMinutes author { name id } category {name id}}
    }}
    `
    const [RecipeCreate, { error }] = useMutation(
      RECIPE_MUTATION
    );
  
  // ----> RENDERS.
  if (error) {
    return <Typography>Sorry, some error occurred!</Typography>
  }

	return(
		<Box mt={4} sx={{ width: "40vw", padding: "2rem" }}>

      <Breadcrumbs mt={2}>
        <Link underline="hover" color="inherit" to="/">Home</Link>
        <Link underline="hover" color="inherit" to="/recipes">Recipes</Link>
        <Typography color="text.primary">Create</Typography>
      </Breadcrumbs>

      <Typography my={4} variant="h4" component="h1">Create a recipe:</Typography>

      <form onSubmit={handleSubmit} style={{
        border: "1px solid grey",
        borderRadius: 1,
        padding: "20px 20px"
      }}>
        <FormControl
          noValidate
          autoComplete="off"
          sx={{
            width: "100%",
            py: "20px",
          }}
        >
          <Input
            id="name"
            name="name"
            variant="outlined-basic"
            onInput={handleChange}
          />
          <InputLabel htmlFor="name">Recipe Name</InputLabel>
        </FormControl>

        <FormControl
          noValidate
          autoComplete="off"
          sx={{
            width: "100%",
            py: "20px",
          }}
        >
          <Input
            id="durationInMinutes"
            name="durationInMinutes"
            variant="outlined-basic"
            onInput={handleChange}
          />
          <InputLabel htmlFor="durationInMinutes">Duration In Minutes</InputLabel>
        </FormControl>

        <FormControl
          noValidate
          autoComplete="off"
          sx={{
            width: "100%",
            py: "20px",
          }}
        >
          <Input
            id="authorId"
            name="authorId"
            variant="outlined-basic"
            onInput={handleChange}
          />
          <InputLabel htmlFor="authorId">Author ID</InputLabel>
        </FormControl>

        <FormControl
          noValidate
          autoComplete="off"
          sx={{
            width: "100%",
            py: "20px",
          }}
        >
          <Input
            id="categoryId"
            name="categoryId"
            variant="outlined-basic"
            onInput={handleChange}
          />
          <InputLabel htmlFor="categoryId">Category ID</InputLabel>
        </FormControl>
          
        <Box mt={2}>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Box>
      </form>

		</Box>
	);



	
}