# legiXplorer

Explorateur non-officiel de la base [LEGI]().

Utilise [legi-api]() et des fichiers issus de [legi.py]() pour afficher les 105 codes de la base LEGI.

Démo : https://legi.now.sh

## Usage

```sh
docker run -p 3000:3000 @socialgouv/legiXplorer
```

### API

Par défaut l'explorateur utilise l'API publique sur [https://legi-api.now.sh](https://legi-api.now.sh).

Vous pouvez mettre en place votre propre API avec votre propre base LEGI. cf [legi-api]()

## Todo

- ajouter les articles liés
- detection patterns de liens dans les textes (ex: R. 342-7)
