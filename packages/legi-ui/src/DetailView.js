import Article from "./Article";
import Section from "./Section";

const detailViewComponents = {
  article: Article,
  section: Section
};

const DetailView = props => {
  const DetailViewComponent =
    props.node && detailViewComponents[props.node.type];
  return <DetailViewComponent {...props.node} />;
};

export default DetailView;
