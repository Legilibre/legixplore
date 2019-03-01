# legiXplore

Consultation la base LEGI.

Ce projet _sans valeur officielle_ permet de consulter les textes issus de la [base LEGI publiée par la DILA](https://www.data.gouv.fr/fr/datasets/legi-codes-lois-et-reglements-consolides/).

Une version de démo est disponible ici : [legi.now.sh](https://legi.now.sh)

## Contenu

| package                         | usage                                                   |
| ------------------------------- | ------------------------------------------------------- |
| [legi.js](./packages/legi.js)   | API NodeJS pour interroger une base LEGI/Postgres       |
| [legi-api](./packages/legi-api) | API HTTP au-dessus de legi.js pour récupérer les textes |
| [legi-ui](./packages/legi-ui)   | Interface web de consultation                           |

## Installation locale

⚠️ Ce projet ne fonctionne pour l'instant qu'avec NodeJS 9 ! Il y a une erreur de compilation pour NodeJS 11.

## Process

La base DILA, initialement au format XML est consolidée et convertie au format SQLite par [legi.py](https://github.com/Legilibre/legi.py), puis reconvertie au format postgreSQL par [legi-postgres](https://github.com/Legilibre/legi-postgres).

Ce projet se base sur la version postgreSQL pour interroger et fournir les données.

## Related

- [legi.py](https://github.com/legilibre/legi.py)
- [Archeo-Lex](https://github.com/legilibre/Archeo-lex)
- [legi-postgres](https://github.com/legilibre/legi-postgres)

## Todo

- scripts de validation des textes
- breadcrumbs
- JORF
- gestion versions/diffs
