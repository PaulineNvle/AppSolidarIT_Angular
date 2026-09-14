# AppSolidarIT_Angular

Application web de catalogue de services IT, organisée par **thèmes** et **produits**. Elle permet de consulter, ajouter, modifier et supprimer des fiches produits classées par thématique.

Le projet est composé de deux parties :

- Un **frontend Angular 17** (`appsolidarit_angular.client`) affichant une page d'accueil avec les thèmes, une liste de produits par thème, une page de détail, ainsi que des formulaires d'ajout / édition.
- Une **API backend ASP.NET Core (.NET 8)** (`AppSolidarIT_Angular.Server`) exposant les endpoints REST pour les thèmes et les produits, avec Entity Framework Core (approche *Database First*) et SQL Server.

Un petit projet console (`ConsoleAppDatabase`) sert de point d'entrée pour les migrations de base de données.

## Sommaire

- [Démarche projet](#démarche-projet)
  - [1. Analyse et modélisation des besoins](#1-analyse-et-modélisation-des-besoins)
  - [2. Scénario de solution](#2-scénario-de-solution)
  - [3. Architecture logicielle](#3-architecture-logicielle)
  - [4. Suivi du projet](#4-suivi-du-projet)
- [Architecture](#architecture)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Lancer le projet](#lancer-le-projet)
- [Structure du projet](#structure-du-projet)
- [Modèle de données](#modèle-de-données)
- [API — Endpoints](#api--endpoints)
- [Technologies utilisées](#technologies-utilisées)

## Démarche projet

Ce projet a été réalisé dans le cadre d'un stage chez **Solidaris**, en suivant une démarche en **cycle en V** : les besoins et les spécifications sont figés en amont, avant le développement, chaque phase étant validée avant de passer à la suivante et faisant l'objet d'une vérification en phase de test/intégration.

### 1. Analyse et modélisation des besoins

Le besoin métier identifié : les collaborateurs de Solidaris disposent d'un grand nombre d'outils et services IT internes (`MySolidaris`, `SMA`, `eMut`, `iCRM`, `iShare`, `Guichet`, `DriveMut`, `SolidarITAsAService`, etc.), sans point d'entrée unique pour les recenser. Le besoin exprimé se résume ainsi :

- **Côté utilisateur métier** : pouvoir retrouver rapidement, depuis une page d'accueil, l'outil adapté à un besoin donné, classé par thématique (gestion de contacts, transport, gestion des avantages, etc.).
- **Côté administrateur** : pouvoir maintenir ce catalogue dans le temps (ajouter, modifier, supprimer un thème ou un produit) sans intervention sur le code.

Cette expression de besoin a été formalisée en amont du développement (phase de spécifications du cycle en V), puis traduite en exigences fonctionnelles :

| Besoin | Exigence fonctionnelle |
|---|---|
| Consulter les catégories d'outils disponibles | Page d'accueil listant les thèmes |
| Trouver les outils liés à une thématique | Liste des produits filtrée par thème |
| Comprendre à quoi sert un outil avant de l'utiliser | Fiche détail par produit |
| Maintenir le catalogue à jour | Formulaires de création / édition / suppression de produits et thèmes |

### 2. Scénario de solution

À partir de ces besoins, le scénario de solution retenu est une application web en trois couches (présentation / API / données), avec le parcours utilisateur suivant :

1. L'utilisateur arrive sur la **page d'accueil** (`/`) et voit l'ensemble des thèmes.
2. Il sélectionne un thème → il accède à la **liste des produits** de ce thème (`/product/:themeId`).
3. Il clique sur un produit → il consulte sa **fiche détail** (`/details/:id`).
4. Un administrateur peut, depuis l'interface, **ajouter** (`/dialog/add`) ou **éditer** (`/dialog/edit/:id`) un produit.

Ce scénario a guidé le découpage fonctionnel du frontend en composants Angular dédiés (`homepage`, `product-list`, `details-product`, `add-product`, `edit`), chacun consommant l'API via un service HTTP dédié (`productService`, `ThemeService`).

### 3. Architecture logicielle

Le scénario de solution a été traduit en une architecture 3-tiers classique :

```
┌──────────────────────────┐      HTTPS / REST (JSON)      ┌───────────────────────────┐      EF Core      ┌─────────────────┐
│   Angular 17 (client)     │ ─────────────────────────────▶│  ASP.NET Core 8 (API)     │ ─────────────────▶│  SQL Server      │
│   Composants standalone   │◀───────────────────────────── │  Controllers / Services   │◀───────────────── │  (LocalDB)       │
└──────────────────────────┘                                └───────────────────────────┘                    └─────────────────┘
```

- **Couche présentation** : Angular, composants standalone par fonctionnalité (voir [Structure du projet](#structure-du-projet)).
- **Couche application/API** : ASP.NET Core, avec séparation `Controllers` (exposition REST) / `Services` / `Entities` (modèle EF Core).
- **Couche persistance** : SQL Server, mappé en *Database First* via Entity Framework Core (`PortfolioDbfirstContext`).
- **Communication** : API REST en JSON, CORS ouvert en développement, Swagger pour la documentation/exploration de l'API.

Le détail des endpoints et du modèle de données est repris dans les sections [Modèle de données](#modèle-de-données) et [API — Endpoints](#api--endpoints).

### 4. Suivi du projet

Le suivi du projet s'appuie sur :

- **Une méthodologie en cycle en V**, adaptée à un besoin cadré dès le départ par Solidaris : expression des besoins → spécifications → conception (architecture ci-dessus) → développement → tests/vérification par rapport aux exigences initiales.
- **Jira** comme outil de suivi : les besoins fonctionnels ont été déclinés en tickets/user stories, permettant de tracer l'avancement de chaque fonctionnalité (catalogue, fiche produit, CRUD produit/thème) et de justifier, à chaque étape, que le développement correspondait bien aux exigences validées en amont.
- **Git** pour le suivi de version du code, en cohérence avec les jalons du cycle en V (une fonctionnalité livrée correspond à un ou plusieurs tickets Jira clos).

## Architecture

```
Angular (client, port 4200) ⇄ API ASP.NET Core (Server) ⇄ SQL Server (LocalDB)
```

En développement, le serveur ASP.NET Core (`AppSolidarIT_Angular.Server`) sert de point d'entrée : il démarre automatiquement le serveur de développement Angular via un **SpaProxy** et redirige les requêtes non-API vers celui-ci.

## Prérequis

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (version compatible avec Angular 17, ex. Node 18 LTS ou plus)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
- SQL Server LocalDB (installé avec Visual Studio, ou [SQL Server Express LocalDB](https://learn.microsoft.com/sql/database-engine/configure-windows/sql-server-express-localdb))
- Visual Studio 2022 (recommandé, pour ouvrir `AppSolidarIT_Angular.sln`) ou VS Code + CLI .NET

## Installation

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/PaulineNvle/AppSolidarIT_Angular.git
   cd AppSolidarIT_Angular
   ```

2. **Restaurer les dépendances .NET**

   ```bash
   dotnet restore
   ```

3. **Installer les dépendances du client Angular**

   ```bash
   cd appsolidarit_angular.client
   npm install
   cd ..
   ```

4. **Configurer la base de données**

   La chaîne de connexion par défaut (dans `AppSolidarIT_Angular.Server/appsettings.json`) pointe vers une instance LocalDB :

   ```json
   "ConnectionStrings": {
     "PortfolioContext": "Server=(localdb)\\MSSQLLocalDb;Database=PortfolioDBFirst;Trusted_Connection=True;encrypt=false;TrustServerCertificate=true"
   }
   ```

   Adaptez cette valeur si vous utilisez une autre instance SQL Server. Le contexte EF Core (`PortfolioDbfirstContext`) étant en approche *Database First*, la base `PortfolioDBFirst` doit exister au préalable (créez-la et créez les tables correspondant aux entités `Product`, `Theme`, `User`, `Role`, `Team` avant de lancer l'application).

## Lancer le projet

### Option 1 — Visual Studio (recommandé)

Ouvrez `AppSolidarIT_Angular.sln` et lancez le projet **AppSolidarIT_Angular.Server** (F5). Le SpaProxy démarre automatiquement le serveur Angular en parallèle.

### Option 2 — Ligne de commande

Dans un terminal, à la racine du dépôt :

```bash
dotnet run --project AppSolidarIT_Angular.Server
```

Le backend démarre (par défaut sur `https://localhost:7xxx`, port défini dans `Properties/launchSettings.json`) et lance automatiquement le client Angular via SpaProxy sur `https://localhost:4200`.

Pour lancer uniquement le frontend en développement :

```bash
cd appsolidarit_angular.client
npm start
```

La documentation Swagger de l'API est disponible en environnement de développement à l'adresse `/swagger`.

## Structure du projet

```
AppSolidarIT_Angular/
├── AppSolidarIT_Angular.Server/       # API ASP.NET Core (.NET 8)
│   ├── Controllers/                   # ProductController, ThemeController
│   ├── Entities/                      # Modèles EF Core (Product, Theme, User, Role, Team)
│   ├── Services/                      # ProductService, ThemeService
│   └── Program.cs                     # Point d'entrée, configuration CORS/EF/Swagger
│
├── ConsoleAppDatabase/                # Projet console pour les migrations de BDD
│
├── appsolidarit_angular.client/       # Frontend Angular 17
│   └── src/app/
│       ├── components/products/
│       │   ├── homepage/              # Page d'accueil (liste des thèmes)
│       │   ├── product-list/          # Liste des produits d'un thème
│       │   ├── details-product/       # Détail d'un produit
│       │   ├── add-product/           # Formulaire d'ajout
│       │   ├── edit/                  # Formulaire d'édition
│       │   └── service/               # Services HTTP (productService, ThemeService)
│       └── core/navigation/header/    # Barre de navigation
│
└── AppSolidarIT_Angular.sln           # Solution Visual Studio
```

## Modèle de données

- **Theme** : `Id`, `Name`, `DescriptionShort`, `Image`, et une collection de `Products`.
- **Product** : `Id`, `Label`, `ThemeId`, `DescriptionShort`, `DescriptionLong`, `Image`, rattaché à un `Theme`.
- **User** : `Id`, `FirstName`, `LastName`, `Email`, `Avatar`, `Role`, rattaché à des `Teams`.
- **Team** : lien entre un `User` et un `ProductId`.
- **Role** : `Id`, `Type`.

## API — Endpoints

### Thèmes (`/api/Theme`)

| Méthode | Route              | Description                       |
|---------|---------------------|-----------------------------------|
| GET     | `/api/Theme`        | Récupère tous les thèmes          |
| GET     | `/api/Theme/{id}`   | Récupère un thème par son id      |
| POST    | `/api/Theme`        | Crée un nouveau thème             |
| PUT     | `/api/Theme/{id}`   | Met à jour un thème               |
| DELETE  | `/api/Theme/{id}`   | Supprime un thème                 |

### Produits (`/api/Product`)

| Méthode | Route                          | Description                                          |
|---------|----------------------------------|-------------------------------------------------------|
| GET     | `/api/Product`                  | Récupère tous les produits (filtre optionnel `?themeId=`) |
| GET     | `/api/Product/{id}`             | Récupère le détail d'un produit                       |
| POST    | `/api/Product`                  | Crée un nouveau produit                                |
| PUT     | `/api/Product/{id}`             | Met à jour un produit                                  |
| DELETE  | `/api/Product/{id}`             | Supprime un produit                                    |

## Technologies utilisées

**Frontend**
- Angular 17 (composants *standalone*)
- Angular Material & Material Web
- Bootstrap 5
- RxJS

**Backend**
- ASP.NET Core 8 (Web API)
- Entity Framework Core 8 (SQL Server, Database First)
- Swagger / Swashbuckle

**Base de données**
- SQL Server LocalDB
