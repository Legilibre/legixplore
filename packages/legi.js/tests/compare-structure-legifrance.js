const Legi = require("..");

const legi = new Legi();

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const getUrlLegifrance = (cid, date) =>
  `https://www.legifrance.gouv.fr/affichCode.do?cidTexte=${cid}&dateTexte=${date}`;

// convert legifrance code page structure to AST
const getLegifranceStructure = (cid, date) => {
  const url = getUrlLegifrance(cid, date);
  return JSDOM.fromURL(url, {}).then(dom => {
    const content = dom.window.document.querySelector("#content_left");

    // build recursive section
    const makeSection = (node, position, level = 2) => ({
      type: "section",
      data: {
        id: node.attributes.id.value,
        titre_ta: node.textContent.trim(),
        position
      },
      children: Array.from(
        // legifrance has a 8 limit on this className...
        node.parentNode.querySelectorAll(`ul.noType > li > span.TM${Math.min(8, level)}Code`)
      )
        // note :scope selector not supported on jsdom so manually filter our first-level span nodes nodes only
        .filter(child => child.parentNode.parentNode.parentNode === node.parentNode)
        .map((child, idx) => makeSection(child, idx, level + 1))
    });
    return {
      type: "code",
      children: Array.from(content.querySelectorAll(".TM1Code")).map((node, idx) =>
        makeSection(node, idx)
      )
    };
  });
};

const spaces = length => Array.from({ length }, () => "  ").join("");

const compareTree = (tree1, tree2) => {
  const errors = [];
  const check = (child, targetNode, depth = 0) => {
    if (!targetNode) {
      //console.log(spaces(depth) + child.data.id + " ERROR");
      errors.push(child.data.id);
      return;
    }
    if (targetNode.data.id === child.data.id) {
      //console.log(spaces(depth) + child.data.id + " OK");
      child.children.forEach((child2, i2) => {
        check(child2, targetNode.children[i2], depth + 1);
      });
    } else {
      errors.push(child.data.id);
      //  console.log(spaces(depth) + child.data.id + " ERROR");
    }
  };
  tree1.children.forEach((child, i) => check(child, tree2.children[i]));
  return errors;
};

// compare structure de deux codes
const compare = async (cid, date) => {
  const legifrance = await getLegifranceStructure(cid, date.replace(/-/g, ""));
  const legijs = await legi.getSommaire({ cid, date }).then(tree => {
    legi.close();
    return tree;
  });

  // ensure all sections from legifrance are covered
  const errors1 = compareTree(legifrance, legijs);
  // ensure we dont provide more content than expected
  const errors2 = compareTree(legijs, legifrance);

  console.log(`\ncompare ${cid} au ${date} :\n`);
  console.log(`LegiFrance -> Legi : ${errors1.length} erreurs`);
  console.log(errors1.join("\n"));
  console.log(`Legi -> LegiFrance : ${errors2.length} erreurs`);
  console.log(errors2.join("\n"));
};

if (require.main === module) {
  compare("LEGITEXT000006072050", "2019-02-11").catch(console.log);
}
