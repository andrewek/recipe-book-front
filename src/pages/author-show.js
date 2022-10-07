import {Link, useParams} from "react-router-dom";

function AuthorShow({authors}) {
  let {id} = useParams();
  const author = authors.find(author => author.id == id);
  
  return(
    <div>
      <h1>{author.name}</h1>
      <Link to=".." relative="path">Back</Link>
    </div>  
  );
}

export default AuthorShow;