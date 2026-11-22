# TODO — DareMe

Liste des travaux à réaliser pour transformer le projet Expo actuel en jeu Action ou Vérité pour adultes. Les tâches sont classées par priorité; les cases restent à cocher au fur et à mesure de leur réalisation.

## P0 — Fondations et sécurité

- [ ] Remplacer les écrans de démonstration Expo dans `src/app/index.tsx` et `src/app/explore.tsx` par les premiers écrans DareMe.
- [ ] Définir le parcours principal : accueil, configuration de partie, jeu, puis fin de partie.
- [ ] Afficher clairement la restriction 18+ avant l’accès au jeu et dans les informations de l’application.
- [ ] Présenter les règles de consentement : participation volontaire, droit de passer un tour sans pénalité et possibilité d’arrêter la partie.
- [ ] Permettre de définir les limites de la partie avant de jouer et de les modifier ou arrêter la partie à tout moment.
- [ ] Établir des règles éditoriales pour les questions et défis : contenus réservés aux adultes, respect des limites et absence de pression ou d’incitation à des actes dangereux ou illégaux.

## P0 — Architecture de navigation et des écrans

- [ ] Définir le périmètre V1 et limiter le parcours à 10–14 écrans; fusionner les écrans Action/Vérité ou Résultat lorsque leur séparation n’apporte pas de valeur.
- [ ] Organiser les routes avec Expo Router dans `src/app/`, par exemple en groupes `(auth)` et `(app)`, avec un layout racine et des layouts de groupe.
- [ ] Concevoir le démarrage pour afficher le splash natif pendant le chargement, puis orienter vers l’accueil, la vérification d’âge ou l’application selon l’état enregistré.
- [ ] Définir les routes et transitions du parcours : bienvenue, vérification 18+, accueil, configuration, partie, défi/réponse, résultat et écrans secondaires.
- [ ] Décider si la connexion est nécessaire en V1; si elle est facultative, permettre de jouer sans compte et reporter la connexion/inscription ou la session Supabase si elles ne sont pas indispensables.
- [ ] Garder les écrans comme composants de route et placer la logique de jeu, les contenus, les hooks et les composants partagés hors de `src/app/`.
- [ ] Définir et typer les paramètres de navigation nécessaires entre configuration, partie et défi; gérer le retour sans perdre l’état de la partie.
- [ ] Reporter à une V2 les écrans sociaux (amis, classement, succès, notifications et offre Premium).

## P1 — Boucle de jeu

- [ ] Permettre de choisir le contexte de jeu : amis ou couple.
- [ ] Permettre de choisir Action, Vérité ou un mode combinant les deux.
- [ ] Ajouter la configuration des participants et de leur ordre de passage.
- [ ] Créer l’écran de tour avec le participant actif, le lancer de dés et le résultat (catégorie, niveau ou type de défi).
- [ ] Afficher une question ou un défi correspondant au mode, à la catégorie et au niveau sélectionnés.
- [ ] Ajouter les actions de jeu : passer, marquer le tour comme terminé et passer au participant suivant.
- [ ] Gérer la fin de partie et proposer de rejouer ou de modifier la configuration.
- [ ] Créer un jeu de contenu initial classé par mode, public, catégorie et niveau d’intensité.
- [ ] Éviter les répétitions de questions et de défis au cours d’une même partie.

## P1 — Personnalisation

- [ ] Permettre de choisir les catégories et niveaux d’intensité inclus dans la partie.
- [ ] Permettre de régler les limites de contenu et les règles de passage propres au groupe.
- [ ] Prévoir des réglages adaptés aux parties entre amis et aux parties en couple, sans imposer de contenu.
- [ ] Vérifier que les préférences choisies sont appliquées de façon cohérente au tirage des dés et aux défis.

## P1 — Identité visuelle et thème

- [ ] Définir la palette de marque DareMe pour les thèmes clair et sombre : couleur principale, accent, arrière-plan, surfaces, bordures et états.
- [ ] Définir la hiérarchie typographique des titres, textes de jeu, consignes, boutons et textes secondaires.
- [ ] Remplacer les couleurs et styles génériques du modèle Expo dans `src/constants/theme.ts`.
- [ ] Appliquer les couleurs, textes et arrière-plans cohérents aux écrans, cartes de défi, dés, boutons, onglets et fenêtres de dialogue.
- [ ] Harmoniser les fonds, contrastes et états interactifs pour obtenir une interface ludique, immersive et lisible.
- [ ] Vérifier le rendu en mode clair et sombre, le contraste, l’agrandissement du texte et les tailles d’écran mobiles.

## P2 — Expérience et accessibilité

- [ ] Ajouter des animations courtes et utiles aux lancers de dés, transitions de tour et révélations de défis.
- [ ] Respecter le réglage système de réduction des animations et éviter de bloquer les interactions.
- [ ] Ajouter des états de chargement, états vides et messages d’erreur compréhensibles.
- [ ] Vérifier les zones tactiles, la navigation au clavier sur le Web et les libellés accessibles.
- [ ] Tester le parcours complet sur Android, iOS et Web, avec plusieurs tailles d’écran.

## P2 — Qualité et publication

- [ ] Ajouter des tests ciblés pour le tirage aléatoire, l’ordre des participants, le passage d’un défi et les limites de partie.
- [ ] Vérifier les profils EAS development, preview et production ainsi que leurs identifiants d’application et canaux de mise à jour.
- [ ] Vérifier que la version de production conserve l’identité de l’application déjà publiée, le cas échéant.
- [ ] Compléter la présentation de l’application : nom, icône, captures d’écran, description et mention 18+.
- [ ] Préparer les informations de confidentialité et de publication requises par les boutiques.
- [ ] Mettre à jour `README.md` avec la présentation DareMe, les prérequis, les commandes de démarrage et les étapes de build.
