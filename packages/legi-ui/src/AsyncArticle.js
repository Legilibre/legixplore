import Article from "./Article";
import CircularProgress from "@material-ui/core/CircularProgress";
import AsyncFetch from "./lib/AsyncFetch";
import { fetchArticle } from "./api";

const AsyncArticle = ({ id, texteId, conteneurId }) => (
  <AsyncFetch
    fetch={() => fetchArticle(id)}
    autoFetch={true}
    render={({ status, result }) =>
      (result && <Article showDetails={false} {...result} conteneurId={conteneurId} texteId={texteId} />) || (
        <CircularProgress style={{ display: "block", margin: 10 }} />
      )
    }
  />
);

export default AsyncArticle;
