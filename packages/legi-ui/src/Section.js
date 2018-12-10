import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { Link } from "./routes";
import { Link as LinkIcon } from "@material-ui/icons";

const styles = {
  card: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

const MAX_DEPTH = 3;

const getMaxH = val => `h${Math.min(6, val)}`;

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const ArticlePreview = ({ titre, classes }) => (
  <ExpansionPanel>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="h6" className={classes.heading}>
        {titre}
      </Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        malesuada lacus ex, sit amet blandit leo lobortis eget.
      </Typography>
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

const Section = ({ classes, data, children, depth = 0 }) => {
  return (
    <Card className={classes.card} style={{ marginTop: 10 }}>
      <CardContent>
        <Typography variant={getMaxH(depth + 5)}>{data.titre_ta}</Typography>
        <List>
          {children &&
            children.map(child => {
              if (child.type === "article") {
                return (
                  <ArticlePreview titre={child.data.titre} classes={classes} />
                );
              } else if (child.type === "section") {
                return (
                  (
                    <div key={child.data.id}>
                      {depth < MAX_DEPTH && (
                        <Section
                          classes={classes}
                          depth={depth + 1}
                          data={child.data}
                        >
                          {child.children}
                        </Section>
                      )}
                    </div>
                  ) || null
                );
              }
            })}
        </List>
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          href={`https://www.legifrance.gouv.fr/affichCode.do?idSectionTA=${
            data.id
          }&cidTexte=${data.cid}`}
          size="small"
        >
          <LinkIcon style={{ marginRight: 5 }} />
          Voir sur Légifrance
        </Button>
      </CardActions>
    </Card>
  );
};

// const H = ({ depth, ...props }) =>
//   [
//     <h1 {...props} />,
//     <h2 {...props} />,
//     <h3 {...props} />,
//     <h4 {...props} />,
//     <h5 {...props} />,
//     <h6 {...props} />,
//     <h7 {...props} />,
//     <h8 {...props} />
//   ][depth] || null;

// const Section2 = ({ children, data, depth = 0 }) => (
//   <div>
//     <H depth={depth}>
//       {data && data.titre_ta}
//       {(depth === 0 &&
//         data.cid && (
//           <a
//             style={{ marginLeft: 10, fontSize: 12 }}
//             href={`https://www.legifrance.gouv.fr/affichCode.do?idSectionTA=${
//               data.id
//             }&cidTexte=${data.cid}`}
//           >
//             Légifrance
//           </a>
//         )) ||
//         null}
//     </H>
//     {children &&
//       children.map(child => {
//         if (child.type === "article") {
//           return (
//             <li key={child.data.id}>
//               <Link
//                 route="article"
//                 params={{ code: child.data.cid, article: child.data.id }}
//               >
//                 <a>{child.data.titre}</a>
//               </Link>
//             </li>
//           );
//         } else if (child.type === "section") {
//           return (
//             (
//               <div key={child.data.id}>
//                 <H depth={depth + 1}>{child.data.titre_ta}</H>
//                 {depth < MAX_DEPTH && (
//                   <Section depth={depth + 1}>{child.children}</Section>
//                 )}
//               </div>
//             ) || null
//           );
//         }
//       })}
//   </div>
// );

Section.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Section);
