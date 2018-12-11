import AsyncFetch from "./AsyncFetch";
import { fetchNode } from "../api";

const Loader = ({ Component, node }) =>
  console.log("Loader", node) || (
    <AsyncFetch
      fetch={() => fetchNode(node.data.cid, node)}
      autoFetch={true}
      render={({ status, result }) => {
        console.log("status", status, result);
        if (result) {
          return <Component {...result} />;
        }
        return "loading...";
      }}
    />
  );

const withFetchNode = Component => props => (
  <Loader {...props} Component={Component} />
);

export default withFetchNode;
