import {React} from "react"

function AuthorsPage({authors}) {

  return(
    <div>
      <h1>Authors!</h1>

      <ul>
        {authors.map((author) =>
          <li key={`author-${author.id}`}>
            <a href={`/authors/${author.id}`}>
              {author.name}
            </a>
          </li>
        )}
      </ul>
    </div>
  )
};

export default AuthorsPage;