# legi-codes-list

Liste des codes disponibles sur la [base LEGI](https://www.data.gouv.fr/fr/datasets/legi-codes-lois-et-reglements-consolides/) du 21/01/2019

## Usage

```js
const codes = require("legi-codes-list");

console.log(
  codes.map(code => ({
    id: code.id,
    titre: code.titre
  }))
);
```

id | titre
---|------
LEGITEXT000006070721|Code civil
LEGITEXT000006069441|Code de commerce
LEGITEXT000005634379|Code de commerce
LEGITEXT000006071071|Code de déontologie de la police nationale
LEGITEXT000006071103|Code de déontologie de la profession de commissaire aux comptes
LEGITEXT000006070159|Code de déontologie des agents de police municipale.
LEGITEXT000006074232|Code de déontologie des architectes
LEGITEXT000006072636|Code de déontologie des chirurgiens-dentistes
LEGITEXT000006072664|Code de déontologie des médecins
LEGITEXT000006074510|Code de déontologie des professionnels de l'expertise comptable
LEGITEXT000006072635|Code de déontologie des sages-femmes
LEGITEXT000006072634|Code de déontologie médicale
LEGITEXT000006072360|Code de déontologie vétérinaire
LEGITEXT000006070933|Code de justice administrative
LEGITEXT000006070884|Code de justice militaire
LEGITEXT000006071360|Code de justice militaire.
LEGITEXT000037701019|Code de la commande publique
LEGITEXT000006069565|Code de la consommation
LEGITEXT000006069472|Code de la consommation des boissons et des mesures contre l'alcoolisme applicable dans la collectivité territoriale de Mayotte
LEGITEXT000006074096|Code de la construction et de l'habitation.
LEGITEXT000006074069|Code de l'action sociale et des familles
LEGITEXT000006071307|Code de la défense.
LEGITEXT000006072637|Code de la famille et de l'aide sociale.
LEGITEXT000037673300|Code de la légion d'honneur, de la Médaille militaire et de l'ordre national du Mérite
LEGITEXT000006071007|Code de la Légion d'honneur et de la médaille militaire
LEGITEXT000006074067|Code de la mutualité
LEGITEXT000006071189|Code de la nationalité française
LEGITEXT000006069414|Code de la propriété intellectuelle
LEGITEXT000006071190|Code de la recherche
LEGITEXT000006074947|Code de la route
LEGITEXT000006074228|Code de la route.
LEGITEXT000006075116|Code de l'artisanat
LEGITEXT000006072665|Code de la santé publique
LEGITEXT000025503132|Code de la sécurité intérieure
LEGITEXT000006073189|Code de la sécurité sociale.
LEGITEXT000006074234|Code de l'aviation civile
LEGITEXT000006070667|Code de la voirie routière
LEGITEXT000006071191|Code de l'éducation
LEGITEXT000023983208|Code de l'énergie
LEGITEXT000006071014|Code de l'enseignement technique
LEGITEXT000006070158|Code de l'entrée et du séjour des étrangers et du droit d'asile.
LEGITEXT000006074220|Code de l'environnement
LEGITEXT000006074224|Code de l'expropriation pour cause d'utilité publique
LEGITEXT000006070882|Code de l'industrie cinématographique
LEGITEXT000006071737|Code de l'Office national interprofessionnel du blé
LEGITEXT000006071164|Code de l'organisation judiciaire
LEGITEXT000006074075|Code de l'urbanisme
LEGITEXT000006070716|Code de procédure civile
LEGITEXT000006070680|Code de procédure civile (1807)
LEGITEXT000006071154|Code de procédure pénale
LEGITEXT000006073984|Code des assurances
LEGITEXT000006073422|Code des caisses d'épargne
LEGITEXT000006070162|Code des communes
LEGITEXT000006070300|Code des communes de la Nouvelle-Calédonie
LEGITEXT000006075115|Code des débits de boissons et des mesures contre l'alcoolisme
LEGITEXT000006071570|Code des douanes
LEGITEXT000006071645|Code des douanes de Mayotte
LEGITEXT000006070666|Code des instruments monétaires et des médailles
LEGITEXT000006070249|Code des juridictions financières
LEGITEXT000006069564|Code des marchés publics
LEGITEXT000005627819|Code des marchés publics
LEGITEXT000006069562|Code des marchés publics
LEGITEXT000006072666|Code des marchés publics.
LEGITEXT000006070302|Code des pensions civiles et militaires de retraite
LEGITEXT000006074066|Code des pensions de retraite des marins français du commerce, de pêche ou de plaisance
LEGITEXT000031712069|Code des pensions militaires d'invalidité et des victimes de guerre.
LEGITEXT000006074068|Code des pensions militaires d'invalidité et des victimes de la guerre.
LEGITEXT000006074233|Code des ports maritimes
LEGITEXT000006070987|Code des postes et des communications électroniques
LEGITEXT000025024948|Code des procédures civiles d'exécution
LEGITEXT000031366350|Code des relations entre le public et l'administration
LEGITEXT000023086525|Code des transports
LEGITEXT000006071344|Code des tribunaux administratifs et des cours administratives d'appel
LEGITEXT000006071188|Code disciplinaire et pénal de la marine marchande.
LEGITEXT000006071646|Code du blé
LEGITEXT000020908868|Code du cinéma et de l'image animée
LEGITEXT000006070208|Code du domaine de l'Etat
LEGITEXT000006074235|Code du domaine de l'Etat et des collectivités publiques applicable à la collectivité territoriale de Mayotte
LEGITEXT000006074237|Code du domaine public fluvial et de la navigation intérieure
LEGITEXT000006074236|Code du patrimoine
LEGITEXT000006071335|Code du service national
LEGITEXT000006071318|Code du sport.
LEGITEXT000006074073|Code du tourisme.
LEGITEXT000006072050|Code du travail
LEGITEXT000006072052|Code du travail applicable à Mayotte.
LEGITEXT000006072051|Code du travail maritime
LEGITEXT000006071657|Code du vin
LEGITEXT000006070239|Code électoral
LEGITEXT000006071514|Code forestier
LEGITEXT000006071556|Code forestier de Mayotte
LEGITEXT000025244092|Code forestier (nouveau)
LEGITEXT000006070299|Code général de la propriété des personnes publiques.
LEGITEXT000006070633|Code général des collectivités territoriales
LEGITEXT000006069568|Code général des impôts annexe 1, CGIAN1.
LEGITEXT000006069569|Code général des impôts, annexe 2, CGIAN2.
LEGITEXT000006069574|Code général des impôts, annexe 3, CGIAN3.
LEGITEXT000006069576|Code général des impôts, annexe 4, CGIAN4.
LEGITEXT000006069577|Code général des impôts, CGI.
LEGITEXT000006071785|Code minier
LEGITEXT000023501962|Code minier (nouveau)
LEGITEXT000006072026|Code monétaire et financier
LEGITEXT000006071029|CODE PENAL
LEGITEXT000006070719|Code pénal
LEGITEXT000006071367|Code rural
LEGITEXT000006071366|Code rural ancien
LEGITEXT000022197698|Code rural et de la pêche maritime
LEGITEXT000006069583|Livre des procédures fiscales
