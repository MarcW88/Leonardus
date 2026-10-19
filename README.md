# Caric'Art 🎨

Site vitrine statique pour l'activité de caricaturiste **Caric'Art** —
caricatures de célébrités, commandes sur mesure et future boutique d'œuvres.

Site 100 % HTML/CSS/JS, sans dépendances ni backend : parfait pour **GitHub Pages**.

## Structure

```
caricart/
├── index.html           Accueil
├── galerie.html         Galerie filtrable de toutes les œuvres
├── commandes.html       Commandes : fonctionnement, tarifs, FAQ
├── boutique.html        Boutique (œuvres à vendre, ouverture prochaine)
├── a-propos.html        Biographie, parcours, technique
├── contact.html         Formulaire de contact (mailto)
├── mentions-legales.html
├── 404.html
├── css/style.css        Toute la charte graphique
├── js/
│   ├── config.js        ⚙️ Réglages du site (voir ci-dessous)
│   ├── works.js         🖼️ Catalogue des œuvres (voir ci-dessous)
│   └── main.js          Logique : menu, galerie, lightbox, bandeau
└── images/works/        Images des caricatures (placeholders SVG à remplacer)
```

## Personnalisation rapide

### Ouvrir / fermer les commandes
Dans `js/config.js` :
```js
commandesOuvertes: true,   // false pour fermer
```
Le bandeau en haut de toutes les pages s'adapte automatiquement.

### Coordonnées & réseaux
Toujours dans `js/config.js` : `email`, `instagram`, `ville`, etc.

### Ajouter une caricature
1. Déposer l'image dans `images/works/` (jpg, png, webp ou svg).
2. Dans `js/works.js`, ajouter un bloc :
```js
{
  file: "images/works/ma-caricature.jpg",
  title: "Nom de la célébrité",
  category: "acteurs",        // acteurs | musique | ecrivains | sport | divers
  year: 2026,
  medium: "Encre & aquarelle",
  desc: "Petite description de l'œuvre.",
  forSale: true,              // apparaît dans la boutique
  price: "180 €",
},
```
L'œuvre apparaît automatiquement dans la galerie, les filtres et la boutique.

## Tester en local

```bash
cd caricart
python3 -m http.server 8000
```
Puis ouvrir http://localhost:8000

## Déployer sur GitHub Pages

```bash
cd caricart
git init
git add .
git commit -m "Site Caric'Art v1"
git branch -M main
git remote add origin https://github.com/<ton-compte>/caricart.git
git push -u origin main
```

Puis sur GitHub : **Settings → Pages → Source : Deploy from a branch → main → /(root)**.
Le site sera en ligne sur `https://<ton-compte>.github.io/caricart/`.

### Nom de domaine personnalisé (optionnel)
1. Acheter `caricart.be` chez un registrar.
2. Créer un fichier `CNAME` contenant `caricart.be` à la racine du repo.
3. Pointer les DNS (enregistrements `A` vers les IP GitHub Pages, ou `CNAME` vers `<compte>.github.io`).

## Évolution vers l'e-commerce

La page boutique affiche déjà les œuvres `forSale`. Pour vendre en ligne
sans changer d'hébergement, les options simples :

- **Snipcart** ou **Ecwid** : panier injecté en JS sur un site statique.
- **Shopify Buy Button** : boutons d'achat intégrés.
- **Stripe Payment Links** : un lien de paiement par œuvre (le plus simple).
- **Etsy** en parallèle : liens sortants depuis la boutique.

## Avant la mise en ligne

- [ ] Remplacer les 12 placeholders SVG par les vraies œuvres
- [ ] Compléter `js/config.js` (email, Instagram, ville)
- [ ] Compléter les mentions légales (nom, adresse, n° d'entreprise BCE/TVA)
- [ ] Choisir les vrais tarifs dans `commandes.html`
- [ ] Rédiger la vraie bio dans `a-propos.html`
