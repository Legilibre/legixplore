const Legi = require("..");

const legi = new Legi();

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const legifrance = {
  getCodeUrl: (cid, date) =>
    `https://www.legifrance.gouv.fr/affichCode.do?cidTexte=${cid}&dateTexte=${date}`,
  getSectionUrl: (cid, section, date) =>
    `https://www.legifrance.gouv.fr/affichCode.do?idSectionTA=${section}&cidTexte=${cid}&dateTexte=${date}`
};

const parseArticleLink = url =>
  url.replace(
    /^affichCodeArticle\.do(?:.*?)\?idArticle=([^&]+?)&cidTexte=[^&]+?&dateTexte=\d+$/g,
    "$1"
  );

// convert legifrance section page structure to AST (articles)
const getLegifranceSection = (cid, section, date) => {
  const url = legifrance.getSectionUrl(cid, section, date);
  console.log("fetch", url);
  return JSDOM.fromURL(url, {}).then(dom => {
    const content = dom.window.document.querySelector("#content_left");
    return {
      type: "section",
      data: {
        id: section
      },
      children: Array.from(content.querySelectorAll("div.titreArt")).map(node => ({
        type: "article",
        data: {
          titre: node.firstChild.textContent.trim(),
          id: parseArticleLink(node.querySelector("a").attributes.href.value)
        }
      }))
    };
  });
};

// convert legifrance code page structure to AST
const getLegifranceStructure = (cid, date) => {
  const url = legifrance.getCodeUrl(cid, date);
  console.log("fetch", url);
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

const compareTree = (tree1, tree2) => {
  const errors = [];
  const check = (child, targetNode, depth = 0) => {
    if (!targetNode) {
      errors.push(child.data.id);
      return;
    }
    if (targetNode.data.id === child.data.id) {
      child.children.forEach((child2, i2) => {
        check(child2, targetNode.children[i2], depth + 1);
      });
    } else {
      errors.push(child.data.id);
    }
  };
  tree1.children.forEach((child, i) => check(child, tree2.children[i]));
  return errors;
};

// compare structure de deux codes
const compare = async (cid, date) => {
  const legifrance = await getLegifranceStructure(cid, date.replace(/-/g, ""));
  const legijs = await legi.getSommaire({ cid, date });

  // ensure all sections from legifrance are covered
  const errors1 = compareTree(legifrance, legijs);
  // ensure we dont provide more content than expected
  const errors2 = compareTree(legijs, legifrance);

  console.log(`\ncompare ${cid} au ${date} :\n`);
  console.log(`not found in LEGI : ${errors1.length} erreurs`);
  console.log(errors1.join("\n"));
  console.log(`not found in Legifrance : ${errors2.length} erreurs`);
  console.log(errors2.join("\n"));
};

var visit = require("unist-util-visit");

// for sections we can only compare articles displayed on legifrance which are the one from the first sub-section
const compareSection = async (cid, section, date) => {
  const legifrance = await getLegifranceSection(cid, section, date.replace(/-/g, ""));
  const legijs = await legi.getSection({ cid, id: section, date, maxDepth: 10 }).then(tree => {
    //legi.close();
    return tree;
  });
  // legifrance only display the first sub-section with the some articles
  // get these subsection articles in legijs
  const articles = [];
  visit(legijs, node => {
    if (node.type === "article") {
      if (articles.length === 0 || articles[0].data.parent === node.data.parent) {
        articles.push(node);
      }
    }
  });

  const notFoundInLegi = legifrance.children
    .map(child => {
      if (child.type === "article") {
        if (!articles.find(node => node.data.id === child.data.id)) {
          return child.data.id;
        }
      }
    })
    .filter(Boolean);

  const notFoundInLegifrance = articles
    .map(articles => {
      if (!legifrance.children.find(node => node.data.id === articles.data.id)) {
        return articles.data.id;
      }
    })
    .filter(Boolean);

  console.log(`\ncompare section ${cid} ${section} au ${date} :\n`);
  console.log(`not found in LEGI : ${notFoundInLegi.length} erreurs`);
  console.log(notFoundInLegi.join("\n"));
  console.log(`not found in Legifrance : ${notFoundInLegifrance.length} erreurs`);
  console.log(notFoundInLegifrance.join("\n"));
};

if (require.main === module) {
  compare("LEGITEXT000006072050", "2017-02-11").catch(console.log);

  compare("LEGITEXT000006072050", "2019-02-11").catch(console.log);

  compare("LEGITEXT000006072050", "2022-02-11").catch(console.log);

  compareSection("LEGITEXT000006072050", "LEGISCTA000006145392", "2015-02-11").catch(console.log);
}
