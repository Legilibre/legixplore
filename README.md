# legiXplore [![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Consultation la base LEGI.

Ce projet _sans valeur officielle_ permet de consulter les textes issus de la [base LEGI publiée par la DILA](https://www.data.gouv.fr/fr/datasets/legi-codes-lois-et-reglements-consolides/).

Une version de démo est disponible ici : [legi.now.sh](https://legi.now.sh)

## Contenu

| package                         | usage                                                   | -                                                                                   |
| ------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [legi.js](./packages/legi.js)   | API NodeJS pour interroger une base LEGI/Postgres       | [![npm](https://img.shields.io/npm/v/legi.svg)](https://www.npmjs.com/package/legi) |
| [legi-api](./packages/legi-api) | API HTTP au-dessus de legi.js pour récupérer les textes |
| [legi-ui](./packages/legi-ui)   | Interface web de consultation                           |

## Process

La base DILA, initialement au format XML est consolidée et convertie au format SQLite par [legi.py](https://github.com/Legilibre/legi.py), puis reconvertie au format postgreSQL par [legi-postgres](https://github.com/Legilibre/legi-postgres).

Ce projet se base sur la version postgreSQL pour interroger et fournir les données.

## Setup du projet

- install : `yarn`
- données : mettre en place [legi-postgres](https://github.com/Legilibre/legi-postgres) ou utiliser l'API déjà fournie.
- legi-api : `cd packages/legi-api && yarn dev`
- legi-ui : `cd packages/legi-ui && API_URL=http://127.0.0.1:3005 yarn dev`

🚀 Lancez http://127.0.0.1:3000

💡 La variable d'env `API_URL` permet de forcer l'usage de l'API locale au lieu de `legi-api.now.sh`.

## Related

- [legi.py](https://github.com/legilibre/legi.py)
- [Archeo-Lex](https://github.com/legilibre/Archeo-lex)
- [legi-postgres](https://github.com/legilibre/legi-postgres)

## Todo

- scripts de validation des textes
- breadcrumbs
- JORF
- gestion versions/diffs
