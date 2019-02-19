import Article from "./Article";
import CircularProgress from "@material-ui/core/CircularProgress";
import AsyncFetch from "./lib/AsyncFetch";
import { fetchArticle } from "./api";
import DILABaseContext from './DILABaseContext';

class AsyncArticle extends React.Component {
  static contextType = DILABaseContext;

  render() {
    const { id, texteId, conteneurId } = this.props;
    const base = this.context;
    return (
      <AsyncFetch
        fetch={() => fetchArticle(id, base)}
        autoFetch={true}
        render={({ status, result }) =>
          (result && <Article showDetails={false} {...result} conteneurId={conteneurId} texteId={texteId} />) || (
            <CircularProgress style={{ display: "block", margin: 10 }} />
          )
        }
      />
    )
  }
}

export default AsyncArticle;
