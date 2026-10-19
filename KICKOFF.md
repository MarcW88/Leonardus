# Kick-off — Projet Caric'Art

> Document de cadrage pour l'évolution du site Caric'Art vers une version
> approfondie, avec démarrage de l'analyse sémantique SEO.
> **Marché cible : Belgique 🇧🇪** (francophone en priorité, néerlandophone en phase 2).

---

## 1. Contexte & vision

Caric'Art est le projet de **Marc Williame**, caricaturiste belge dont le cœur de
métier est la caricature de célébrités (acteurs, chanteurs, écrivains, sportifs,
personnalités) et les portraits sur commande.

**Pivot stratégique :**
- ❌ Plus de produits dérivés concrets (mugs, t-shirts…)
- ✅ Commandes personnalisées **par périodes** (rareté = valeur)
- ✅ Vente d'œuvres originales de célébrités (futur e-commerce)
- ✅ Site vitrine étoffé → autorité et référencement

## 2. Spécificités du marché belge

| Aspect | Implication pour le site |
|---|---|
| **Domaine** | `.be` (caricart.be) — signal de proximité fort pour Google.be |
| **Langue** | Français en priorité (Wallonie + Bruxelles). Version NL envisageable pour la Flandre (marché plus gros, concurrence "karikaturist") |
| **Culture BD** | La Belgique est la patrie de la BD (Tintin, Spirou, Gaston). Forte affinité culturelle avec le dessin/caricature — angle éditorial différenciant |
| **Célébrités locales** | Intégrer des personnalités belges : Stromae, Angèle, Benoît Poelvoorde, François Damiens, Bouli Lanners, Virginie Efira, Amélie Nothomb, Eden Hazard, Eddy Merckx, Arno… + stars internationales |
| **Statut légal** | Indépendant / statut d'artiste belge. N° d'entreprise BCE + TVA (format `BE 0XXX.XXX.XXX`) — **pas de SIRET** (c'est français) |
| **Droit** | Droit d'auteur : Code de droit économique (livre XI). Mentions légales : loi sur le commerce électronique. RGPD |

## 3. Objectifs du site

1. **Visibilité organique** — se positionner sur les requêtes "caricaturiste + Belgique/ville"
2. **Conversion** — remplir les sessions de commandes à chaque ouverture
3. **Autorité artistique** — une galerie riche qui justifie la vente d'œuvres originales
4. **Préparer l'e-commerce** — catalogue structuré, prêt à brancher un tunnel d'achat

## 4. Cibles (personas)

| Persona | Besoin | Page d'entrée probable |
|---|---|---|
| **Le particulier** (cadeau mariage, anniversaire, départ retraite) | Une caricature personnalisée, rassurant sur le process et les délais | Pages villes, page commandes, blog "idée cadeau" |
| **L'entreprise / event** | Animation ou cadeau d'équipe, facture, droits d'usage | Page pro/événementiel |
| **Le collectionneur** | Œuvre originale d'une célébrité qu'il aime | Boutique, fiches œuvres |
| **Le fan d'une célébrité** | Cherche "caricature Stromae" etc. → découvre l'œuvre | Fiches œuvres / catégories |

## 5. Arborescence cible (site approfondi)

```
/                          Accueil (brand + promesse)
/galerie                   Galerie globale filtrable
/galerie/acteurs           ┐ Pages catégories dédiées
/galerie/musique           │ (landing SEO par univers)
/galerie/ecrivains         │
/galerie/sport             │
/galerie/personnalites     ┘
/galerie/celebrites-belges ★ Page différenciante : les Belges caricaturés
/oeuvre/<slug>             Fiches œuvres individuelles (SEO longue traîne
                           "caricature + nom de célébrité") — phase 2
/commande                  Commandes : process, tarifs, FAQ, statut
/commande/mariage          ┐ Landing par occasion — fort volume
/commande/anniversaire     │ de recherche, intention chaude
/commande/entreprise       ┘
/caricaturiste-<ville>     Pages locales : bruxelles, liege, namur,
                           charleroi, mons, bruges, gand, anvers, louvain…
                           ⚠️ Contenu unique par ville (pas de duplicata)
/boutique                  Œuvres à vendre (e-commerce phase 3)
/a-propos                  Bio, parcours, presse
/blog/*                    Articles éditoriaux (voir §6.4)
/contact
/mentions-legales
```

## 6. Analyse sémantique — plan de démarrage

### 6.1 Clusters de mots-clés (noyau sémantique)

**Cluster MÉTIER (positionnement)**
`caricaturiste belgique` · `caricaturiste bruxelles` · `caricaturiste liège` ·
`caricaturiste wallonie` · `dessinateur caricaturiste` · `artiste caricaturiste belge`

**Cluster SERVICE (intention commerciale chaude)**
`caricature sur commande` · `caricature mariage` · `caricaturiste mariage belgique` ·
`caricature anniversaire` · `caricature personnalisée` · `portrait caricature` ·
`caricature d'après photo` · `animation caricature événement` · `caricature entreprise`

**Cluster PRODUIT (e-commerce)**
`caricature célébrité` · `caricature originale à vendre` · `acheter caricature` ·
`tirage caricature signé` · `caricature stromae` (pattern : `caricature + <célébrité>`)

**Cluster INFORMATIONNEL (blog, longue traîne)**
`comment faire une caricature` · `prix caricature personnalisée` ·
`idée cadeau original mariage` · `différence caricature portrait` ·
`combien coûte un caricaturiste`

**Cluster NL (phase 2 — Flandre)**
`karikaturist belgië` · `karikatuur laten maken` · `karikatuur tekenaar huwelijk`

### 6.2 Méthodologie

1. **Graines** : la liste ci-dessus + brainstorming (occasions, célébrités, villes)
2. **Expansion** : Google Suggest, "Recherches associées", People Also Ask (google.be),
   AnswerThePublic, Keyword Planner, éventuellement Semrush/SEObserver/Ranxplorer
3. **Qualification** : volume mensuel BE, difficulté, intention (info/navig/transac)
4. **Clustering** : regrouper par intention de recherche
5. **Mapping** : 1 cluster = 1 page. Éviter le cannibalisme (deux pages sur le même mot-clé)
6. **Priorisation** : d'abord les requêtes transactionnelles locales
   (faible concurrence probable en Belgique)

### 6.3 Règles d'optimisation on-page

- 1 mot-clé principal + variantes par page ; title ≤ 60 car., meta desc ≤ 155 car.
- Structure Hn unique et hiérarchisée
- Données structurées schema.org : `ProfessionalService`/`VisualArtist` (page accueil),
  `Product` + `Offer` (fiches œuvres), `FAQPage` (page commandes), `LocalBusiness` (pages villes)
- Attributs `alt` descriptifs : "caricature de X par Caric'Art" — levier Google Images,
  **canal majeur** pour un caricaturiste
- Maillage interne : fiches œuvres ↔ catégories ↔ occasions ↔ pages villes

### 6.4 Calendrier éditorial (blog — premiers sujets)

1. "Comment se passe une commande de caricature ? (étape par étape)"
2. "Caricature de mariage : l'idée cadeau qui change tout"
3. "5 caricatures de célébrités belges qui ont fait vibrer"
4. "Prix d'une caricature personnalisée en Belgique : le guide honnête"
5. "Caricature vs portrait : quelle différence ?"

## 7. Évolution e-commerce (phase 3)

- Fiches œuvres = futures fiches produits (déjà structurées dans `js/works.js`)
- Options sans backend : **Stripe Payment Links** (1 lien/œuvre, le plus simple),
  Snipcart, Ecwid, Shopify Buy Button
- Obligations légales BE dès la 1re vente en ligne : CGV, droit de rétractation 14 j,
  mentions e-commerce, TVA, bouton "commander avec obligation de paiement"

## 8. Roadmap

| Phase | Contenu | Livrable |
|---|---|---|
| **1. Fondation** ✅ | Site v1 statique (fait) | 8 pages en ligne |
| **2. Approfondissement** | Analyse sémantique complète, pages villes, pages catégories, pages occasions, vraies œuvres intégrées | Document mots-clés + 10-15 nouvelles pages |
| **3. Conversion** | Fiches œuvres individuelles, schema.org, blog (5 articles) | Architecture SEO complète |
| **4. E-commerce** | Tunnel d'achat (Stripe Links ou équivalent), CGV, logistique envoi | Boutique fonctionnelle |
| **5. Croissance** | Version NL, backlinks locaux (mariage, presse, annuaires art), Google Business Profile | Autorité |

## 9. KPIs à suivre

- Position Google.be sur "caricaturiste belgique" + variantes villes
- Trafic organique mensuel (Search Console)
- Demandes de devis par session de commandes ouverte
- Taux de remplissage des créneaux de commande
- (Phase 4) Chiffre d'affaires boutique, panier moyen

## 10. Actions immédiates

- [ ] Lister toutes les vraies œuvres disponibles (scan + métadonnées)
- [ ] Lister les célébrités belges déjà caricaturées → page dédiée
- [ ] Produire le fichier d'analyse sémantique (tableur : mot-clé / volume / intention / page cible)
- [ ] Adapter les textes légaux existants au droit belge (fait dans le code)
- [ ] Réserver caricart.be + créer Google Business Profile
- [ ] Rédiger bio réelle + tarifs réels
