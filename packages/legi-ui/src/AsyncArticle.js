import Article from "./Article";
import CircularProgress from "@material-ui/core/CircularProgress";
import AsyncFetch from "./lib/AsyncFetch";
import { fetchArticle } from "./api";

const AsyncArticle = ({ cid, id }) => (
  <AsyncFetch
    fetch={() => fetchArticle(cid, id)}
    autoFetch={true}
    render={({ status, result }) =>
      (result && <Article showDetails={false} {...result} />) || (
        <CircularProgress style={{ display: "block", margin: 10 }} />
      )
    }
  />
);

export default AsyncArticle;
