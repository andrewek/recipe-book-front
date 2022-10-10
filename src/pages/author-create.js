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

function AuthorCreate() {
  const navigate = useNavigate();


  // ----> FORM CONTROLS.
  const initialFormState = {
    name: "",
  };
  const [author, setAuthor] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    const { value } = target;

    setAuthor({
      ...author,
      [target.name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await AuthorCreate({ variables: author });
    if (!error) navigate("/authors");
  }

  // ----> GRAPHQL QUERIES.
  const AUTHOR_MUTATION = gql`
    mutation ($name: String!) { 
      createAuthor(input: { params: {name: $name}}) {
        author { name id }
      }
    }
    `
    const [AuthorCreate, { error }] = useMutation(
      AUTHOR_MUTATION
    );
  
  // ----> RENDERS.
  if (error) {
    return <Typography>Sorry, some error occurred!</Typography>
  }

	return(
		<Box mt={4} sx={{ width: "40vw", padding: "2rem" }}>

      <Breadcrumbs mt={2}>
        <Link underline="hover" color="inherit" to="/">Home</Link>
        <Link underline="hover" color="inherit" to="/authors">Authors</Link>
        <Typography color="text.primary">Signup</Typography>
      </Breadcrumbs>

      <Typography my={4} variant="h4" component="h1">Sign up an author:</Typography>

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
          <InputLabel htmlFor="name">Author Name</InputLabel>
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
export default AuthorCreate;