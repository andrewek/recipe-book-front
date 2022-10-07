import {React} from "react"
import {
  Typography,
  Box
} from "@mui/material"

function AuthorsPage({authors}) {

  return(
    <Box mt={4}>
      <Typography variant="h3" component="h1">Authors!</Typography>

      <Typography variant="body1">
        <p>
          These are the authors who currently have recipes available. 
          Maybe. Maybe they're just in the system.
        </p>
      <ul>
        {authors.map((author) =>
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