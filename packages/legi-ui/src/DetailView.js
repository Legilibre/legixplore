import Article from "./Article";
import Section from "./Section";

const detailViewComponents = {
  article: Article,
  section: Section,
  tetier: Section,
  texte: Section
};

const DetailView = props => {
  const DetailViewComponent =
    props.node && detailViewComponents[props.node.type];
  return <DetailViewComponent showPreview={true} {...props.node} parentId={props.parentId} />;
};

export default DetailView;
