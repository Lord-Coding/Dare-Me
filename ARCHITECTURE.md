# Architecture de DareMe

Ce document décrit l’architecture actuelle du dépôt, l’architecture cible V1 de l’application et les règles recommandées pour son évolution.

## 1. Vue d’ensemble

DareMe est une application React Native/Expo orientée Android, iOS et Web. Le projet utilise actuellement Expo Router comme système de navigation, React Native pour l’interface, TypeScript en mode strict et EAS pour les builds et les mises à jour OTA.

```text
Utilisateur
    |
    v
Expo Router
    |
    +-- Layout racine
    |      +-- ThemeProvider Expo Router
    |      +-- Overlay de splash
    |      +-- Navigation par onglets
    |
    +-- Écrans
    |      +-- index
    |      +-- explore
    |
    v
Composants + Hooks + Constantes
    |
    v
Stockage local / services distants
```

## 2. État actuel du projet

### 2.1 Technologies principales

- **Framework** : Expo SDK 58.
- **Application mobile** : React Native 0.88.
- **Interface** : React 19.
- **Navigation** : Expo Router 58.
- **Langage** : TypeScript strict avec alias `@/*`.
- **Thème** : mode clair/sombre via React Native et constantes partagées.
- **Animations** : Reanimated et Worklets.
- **Web** : React Native Web et variantes `.web.tsx`.
- **Builds** : EAS Build avec profils development, preview et production.
- **Mises à jour** : `expo-updates` avec canaux EAS Update.
- **Démarrage** : `expo-splash-screen`.
- **Authentification distante** : aucune intégration Supabase actuellement présente dans le dépôt.

### 2.2 Structure actuelle des dossiers

```text
Dare-Me/
├── app.config.js
├── app.json
├── eas.json
├── package.json
├── package-lock.json
├── tsconfig.json
├── TODO.md
├── assets/
│   ├── images/
│   └── expo.icon/
├── scripts/
│   └── reset-project.js
└── src/
    ├── app/
    │   ├── _layout.tsx
    │   ├── index.tsx
    │   └── explore.tsx
    ├── components/
    │   ├── app-tabs.tsx
    │   ├── app-tabs.web.tsx
    │   ├── animated-icon.tsx
    │   ├── animated-icon.web.tsx
    │   ├── animated-icon.module.css
    │   ├── external-link.tsx
    │   ├── hint-row.tsx
    │   ├── themed-text.tsx
    │   ├── themed-view.tsx
    │   ├── web-badge.tsx
    │   └── ui/
    │       └── collapsible.tsx
    ├── constants/
    │   └── theme.ts
    ├── context/
    │   └── theme-context.tsx
    ├── hooks/
    │   ├── use-theme.ts
    │   ├── use-color-scheme.ts
    │   └── use-color-scheme.web.ts
    └── global.css
```

### 2.3 Navigation actuelle

Le fichier `src/app/_layout.tsx` est le layout racine. Il installe les thèmes Expo Router, affiche l’overlay de splash animé et rend la barre d’onglets native.

```text
src/app/_layout.tsx
├── ThemeProvider Expo Router
├── AnimatedSplashOverlay
└── AppTabs
    ├── index
    └── explore
```

Les écrans actuels sont ceux du modèle Expo :

- `src/app/index.tsx` affiche l’écran d’accueil de démonstration.
- `src/app/explore.tsx` affiche une page d’exemple.
- `src/components/app-tabs.tsx` fournit les onglets natifs.
- `src/components/app-tabs.web.tsx` fournit probablement une adaptation Web lorsque nécessaire.

Ces écrans doivent être remplacés progressivement par le parcours DareMe.

### 2.4 Thème actuel

Le thème est défini dans `src/constants/theme.ts` :

- couleurs texte, fond, surfaces et états pour les thèmes clair et sombre;
- polices selon iOS, Android et Web;
- espacements;
- hauteurs et largeurs utiles à la barre d’onglets;
- styles par défaut et utilitaires;
- largeur maximale de contenu pour les grandes tailles d’écran.

Deux mécanismes coexistent :

- `useTheme()` utilise `useColorScheme()` et les couleurs de `theme.ts`;
- `ThemeProvider` dans `src/context/theme-context.tsx` expose `useAppTheme()` à travers un contexte React.

Il faut éviter de maintenir deux sources de vérité pour les couleurs. Le thème final doit sélectionner une seule API principale, puis adapter les composants existants autour de celle-ci.

### 2.5 Composants actuels

- `ThemedText` centralise les variantes typographiques.
- `ThemedView` applique une couleur de thème à une vue.
- `AppTabs` gère les onglets natifs.
- `AnimatedIcon` fournit l’animation du lancement ou du logo.
- `HintRow`, `ExternalLink`, `WebBadge` et `Collapsible` sont des composants de démonstration ou d’adaptation Web.
- Les variantes `.web.tsx` utilisent une adaptation spécifique au rendu Web.

### 2.6 Alias et compilation

`tsconfig.json` utilise le mode strict et expose les alias suivants :

```text
@/*         -> src/*
@/assets/*  -> assets/*
```

Les routes générées peuvent bénéficier des routes typées via l’option Expo `experiments.typedRoutes`. Le build utilise React Compiler via `experiments.reactCompiler`.

## 3. Architecture cible V1

### 3.1 Objectif

La V1 doit rester simple et publier rapidement sur Android. Elle doit couvrir le lancement, la vérification 18+, la configuration de partie, la boucle de jeu, le profil léger et les réglages.

Limite recommandée : 10 à 14 écrans utiles. Les écrans sociaux ne doivent pas être intégrés au premier parcours.

### 3.2 Organisation Expo Router proposée

```text
src/app/
├── _layout.tsx
├── index.tsx
├── (auth)/
│   ├── _layout.tsx
│   ├── welcome.tsx
│   ├── age-verification.tsx
│   ├── login.tsx
│   └── register.tsx
└── (app)/
    ├── _layout.tsx
    ├── home.tsx
    ├── play-setup.tsx
    ├── game.tsx
    ├── challenge.tsx
    ├── truth.tsx
    ├── result.tsx
    ├── profile.tsx
    ├── favorites.tsx
    ├── settings.tsx
    └── about.tsx
```

Cette structure utilise les groupes de routes Expo Router :

- `(auth)` contient le parcours de première ouverture.
- `(app)` contient l’application principale.
- `src/app/index.tsx` peut servir de route de redirection vers l’état approprié.
- `_layout.tsx` de chaque groupe gère la navigation propre à ce groupe.

Les écrans `challenge` et `truth` peuvent éventuellement être regroupés dans une seule route paramétrée pour réduire le nombre d’écrans :

```text
/challenge/[type]
```

avec `type = "action" | "truth"`.

Le même principe peut fusionner les écrans de réussite ou d’échec dans une vue de résultat selon la validation du défi.

### 3.3 Parcours utilisateur V1

```text
Démarrage
    |
    v
Splash / chargement
    |
    +-- Première ouverture ou âge non validé -> Welcome -> AgeVerification
    |
    +-- Âge refusé -> écran d’accès refusé
    |
    +-- Âge validé -> Home
                      |
                      +-- Jouer -> PlaySetup -> Game
                      |                         |
                      |                         +-- Action -> Challenge
                      |                         +-- Vérité -> Truth
                      |
                      +-- Favoris -> Favorites
                      +-- Profil -> Profile
                      +-- Paramètres -> Settings
                                         |
                                         +-- À propos -> About
```

La vérification d’âge doit être obligatoire avant l’accès au contenu. Son état doit être persisté localement. Une simple confirmation dans l’interface ne remplace pas les exigences légales, éditoriales ou de modération propres aux boutiques.

### 3.4 Authentification

L’application peut démarrer en mode invité. Pour la V1, les écrans login/register ne sont nécessaires que si la sauvegarde distante, les favoris liés à un compte ou les profils synchronisés apportent une valeur immédiate.

Architecture recommandée :

```text
SessionProvider
├── Session invité
├── Session locale
└── Session Supabase, ultérieurement si nécessaire
```

Responsabilités possibles :

- vérifier la session au démarrage;
- sauvegarder la confirmation d’âge;
- sauvegarder les favoris ;
- synchroniser le profil lorsque l’authentification est activée ;
- permettre la reprise locale sans compte.

Les nouvelles dépendances ajoutées au projet peuvent servir à cette couche, mais ne doivent être intégrées que lorsque les écrans correspondants existent réellement.

### 3.5 Domaine de jeu

La logique de jeu doit être séparée des composants d’affichage.

Structure proposée :

```text
src/
├── types/
│   ├── game.ts
│   ├── player.ts
│   ├── challenge.ts
│   └── settings.ts
├── data/
│   └── challenges/
├── services/
│   ├── storage.ts
│   ├── game.service.ts
│   └── auth.service.ts
├── hooks/
│   ├── use-game.ts
│   ├── use-favorites.ts
│   └── use-settings.ts
├── stores/
│   └── game.store.ts
└── components/
    ├── game/
    │   ├── dice.tsx
    │   ├── player-turn.tsx
    │   ├── challenge-card.tsx
    │   └── result-card.tsx
    └── ui/
```

Modèle de données minimal :

```ts
type GameMode = "friends" | "couples";
type GameChoice = "action" | "truth";
type Intensity = "soft" | "fun" | "hot" | "extreme";

type Player = {
  id: string;
  name: string;
};

type GameSettings = {
  players: Player[];
  mode: GameMode;
  intensity: Intensity[];
  allowPassing: boolean;
};

type Challenge = {
  id: string;
  type: GameChoice;
  category: string;
  intensity: Intensity;
  mode: GameMode[];
  text: string;
};

type GameState = {
  settings: GameSettings;
  players: Player[];
  currentPlayerIndex: number;
  completedChallenges: number;
  skippedChallenges: number;
  turnHistory: string[];
};
```

### 3.6 Réduction de l’état partagé

Pour éviter les dépendances inutiles en V1 :

- conserver les données de partie dans un store léger ou dans un provider de partie;
- conserver les favoris avec AsyncStorage ou SecureStore selon leur sensibilité;
- conserver les réglages dans AsyncStorage;
- ne pas utiliser React Query sans appels réseau réels;
- ne pas utiliser Supabase avant que l’authentification ou la synchronisation ne soit nécessaire;
- ne pas dupliquer les règles de jeu dans chaque écran.

React Hook Form et Zod peuvent être utilisés pour les formulaires d’inscription, de profil ou de configuration lorsque ces écrans sont construits.

## 4. Flux de données

### 4.1 Configuration de partie

```text
PlaySetupScreen
    |
    v
Zod valide GameSettings
    |
    v
GameStore initialise la partie
    |
    v
GameScreen lit le joueur actif
```

### 4.2 Tour de jeu

```text
GameScreen
    |
    +-- Lance le dé
    |
    v
GameService choisit une Action ou une Vérité
    |
    v
ChallengeScreen / TruthScreen
    |
    +-- Terminé -> ajoute un point ou met à jour l’état -> Result
    +-- Passer -> ajoute l’événement au tour -> joueur suivant
```

### 4.3 Favoris

```text
Challenge/Truth
    |
    v
useFavorites.toggle(challengeId)
    |
    v
Storage local
    |
    v
FavoritesScreen
```

## 5. Thème et UI

### 5.1 Organisation recommandée

La palette DareMe doit remplacer les couleurs génériques actuelles dans `src/constants/theme.ts`.

Ajouter une hiérarchie claire :

```text
Couleurs
├── brand
├── accent
├── background
├── surface
├── surfaceSelected
├── text
├── textSecondary
├── border
├── success
├── warning
└── danger
```

Chaque couleur doit exister en thèmes clair et sombre. Les composants doivent recevoir des rôles sémantiques, pas des valeurs hexadécimales individuelles.

### 5.2 Composants UI communs

Créer progressivement :

- `Button`
- `Card`
- `IconButton`
- `SegmentedControl`
- `Counter`
- `IntensitySelector`
- `PlayerChip`
- `ChallengeCard`
- `Dice`
- `Modal`
- `EmptyState`

Les écrans doivent composer ces composants au lieu de dupliquer les styles.

## 6. Stockage

### 6.1 Stockage local recommandé

| Donnée | Stockage recommandé |
|---|---|
| Confirmation d’âge | SecureStore |
| Session locale | SecureStore |
| Préférences | AsyncStorage |
| Favoris | AsyncStorage |
| Historique de parties | AsyncStorage ou base locale |
| Partie en cours | Provider/store + persistance optionnelle |
| Session Supabase | SecureStore |

### 6.2 Règle de sécurité

Ne jamais placer de secret, clé d’administration ou jeton serveur dans `app.json`, `app.config.js` ou le code mobile. Les secrets doivent rester côté serveur ou dans l’environnement EAS.

## 7. Configuration et environnement

### 7.1 Application

- `app.json` contient les réglages statiques de base.
- `app.config.js` applique les variantes development, preview et production.
- `APP_VARIANT` détermine le nom et l’identifiant Android.
- `app.json` contient le slug EAS, le `projectId`, l’URL Update et la politique de runtime.
- Les plugins natifs sont déclarés dans `app.json`; les dossiers `ios/` et `android/` ne doivent pas être maintenus à la main.

### 7.2 Profils EAS

| Profil | Usage | Distribution | Android | Channel |
|---|---|---|---|---|
| development | développement avec dev client | interne | APK | development |
| preview | tests internes | interne | APK | preview |
| production | publication | conforme au profil Play Store | App Bundle | production |

Les variantes ajoutent actuellement :

| Variante | Nom | Package Android |
|---|---|---|
| development | DareMe Dev | `com.dareme.dev` |
| preview | DareMe Preview | `com.dareme.preview` |
| production | DareMe | `com.lordsama.dareme` |

## 8. Dépendances du projet

### 8.1 Déjà utilisées ou proches de l’état actuel

- Expo Router
- React Native Reanimated
- Expo Splash Screen
- Expo Secure Store
- Expo Updates
- Expo Image
- Expo Symbols
- Expo Haptics
- React Native Gesture Handler
- React Native Web

### 8.2 Préparées mais pas encore intégrées

- AsyncStorage
- React Hook Form
- Zod
- React Query
- React Navigation
- React Native SVG
- Expo Notifications
- Expo Media Library
- Expo File System
- Burnt
- UUID

Ces dépendances ne doivent être utilisées qu’au moment où leur fonctionnalité correspondante est implémentée. Expo Router fournit déjà une partie de la navigation prévue.

## 9. Architecture V2 éventuelle

Lorsque la V1 sera stable, la suite pourra ajouter :

- amis;
- classement;
- succès;
- notifications;
- Premium;
- profils synchronisés;
- historique réseau;
- fonctions sociales.

Structure possible :

```text
src/app/
├── (auth)/
├── (app)/
└── (social)/
    ├── friends.tsx
    ├── leaderboard.tsx
    ├── achievements.tsx
    ├── notifications.tsx
    └── premium.tsx
```

Ces écrans doivent rester hors du parcours principal tant qu’ils ne sont pas nécessaires à la V1.

## 10. Règles d’évolution

1. Les écrans restent des composants de route légers.
2. Les règles de jeu restent hors des écrans.
3. Les appels réseau restent dans les services ou hooks dédiés.
4. Les couleurs passent par des tokens sémantiques du thème.
5. Les composants ne dupliquent pas la logique métier.
6. Les variantes plateformes sont limitées aux adaptations réellement nécessaires.
7. Les paramètres de route sont typés.
8. Les contenus proviennent d’un modèle normalisé de défi.
9. Les données utilisateur sensibles utilisent un stockage adapté.
10. Chaque écran doit supporter la restriction 18+, le consentement et le droit de passer.

## 11. Ordre de mise en œuvre recommandé

1. Nettoyer les écrans Expo de démonstration.
2. Finaliser le thème DareMe.
3. Ajouter les layouts Expo Router `(auth)` et `(app)`.
4. Ajouter le splash, la bienvenue et la vérification 18+.
5. Ajouter l’accueil et la configuration de partie.
6. Implémenter les types, le store et le service de jeu.
7. Ajouter les écrans game, challenge, truth et result.
8. Ajouter les favoris et le stockage local.
9. Ajouter le profil, les paramètres et les informations.
10. Ajouter les tests, les validations d’accessibilité et les tests Android/iOS/Web.
11. Préparer les assets de publication et publier la version preview.
