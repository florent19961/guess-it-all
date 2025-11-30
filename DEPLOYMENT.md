# Guide de Déploiement - Guess It All

## 🚀 Options de déploiement

### Option 1 : Vercel (Recommandé - Gratuit et rapide)

1. Créez un compte sur [Vercel](https://vercel.com)
2. Installez Vercel CLI :
   ```bash
   npm install -g vercel
   ```
3. Dans le dossier du projet, exécutez :
   ```bash
   vercel
   ```
4. Suivez les instructions à l'écran
5. Votre application sera déployée sur une URL Vercel (ex: guess-it-all.vercel.app)

**Configuration automatique** : Vercel détecte automatiquement Vite et configure tout.

---

### Option 2 : Netlify (Gratuit et simple)

1. Créez un compte sur [Netlify](https://netlify.com)
2. Installez Netlify CLI :
   ```bash
   npm install -g netlify-cli
   ```
3. Build le projet :
   ```bash
   npm run build
   ```
4. Déployez :
   ```bash
   netlify deploy --prod --dir=dist
   ```
5. Votre application sera déployée sur une URL Netlify (ex: guess-it-all.netlify.app)

**Ou via l'interface web** :
- Drag & drop le dossier `dist/` sur netlify.com
- Configuration automatique

---

### Option 3 : GitHub Pages (Gratuit)

1. Ajoutez dans `vite.config.js` :
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/guess-it-all/', // Nom de votre repo
   })
   ```

2. Installez gh-pages :
   ```bash
   npm install --save-dev gh-pages
   ```

3. Ajoutez dans `package.json` :
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. Déployez :
   ```bash
   npm run deploy
   ```

5. Activez GitHub Pages dans les paramètres du repo → Pages → Branch: gh-pages

---

### Option 4 : Hébergement traditionnel (Apache/Nginx)

1. Build le projet :
   ```bash
   npm run build
   ```

2. Le dossier `dist/` contient tous les fichiers statiques

3. Uploadez le contenu de `dist/` sur votre serveur

4. Configuration Nginx (exemple) :
   ```nginx
   server {
       listen 80;
       server_name votredomaine.com;
       root /var/www/guess-it-all;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

5. Configuration Apache (exemple - `.htaccess`) :
   ```apache
   <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteBase /
       RewriteRule ^index\.html$ - [L]
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteRule . /index.html [L]
   </IfModule>
   ```

---

## 🔧 Optimisations de production

### 1. Compression des assets

Déjà activée par défaut dans Vite. Vérifiez que votre serveur gère gzip/brotli.

### 2. Cache des assets

Configurez les headers HTTP :
```
Cache-Control: public, max-age=31536000, immutable (pour les assets avec hash)
Cache-Control: no-cache (pour index.html)
```

### 3. CDN (optionnel)

Utilisez Cloudflare ou un CDN similaire pour améliorer les performances globales.

### 4. Service Worker (PWA)

Pour ajouter le support hors ligne, installez `vite-plugin-pwa` :

```bash
npm install -D vite-plugin-pwa
```

Ajoutez dans `vite.config.js` :
```js
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Guess It All',
        short_name: 'GuessIt',
        description: 'Jeu de devinettes multijoueurs',
        theme_color: '#1e293b',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
```

---

## 📊 Analytics (optionnel)

### Google Analytics

1. Créez une propriété GA4
2. Ajoutez dans `index.html` :
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

### Plausible (Alternative privacy-friendly)

1. Créez un compte sur [Plausible](https://plausible.io)
2. Ajoutez dans `index.html` :
   ```html
   <script defer data-domain="votredomaine.com" src="https://plausible.io/js/script.js"></script>
   ```

---

## 🔐 Sécurité

### Headers de sécurité recommandés

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### HTTPS

Toujours utiliser HTTPS en production (gratuit avec Let's Encrypt ou inclus dans Vercel/Netlify).

---

## ✅ Checklist avant déploiement

- [ ] `npm run build` fonctionne sans erreur
- [ ] Tester le build localement : `npm run preview`
- [ ] Vérifier que les fonts Google sont bien chargées
- [ ] Tester sur mobile/tablet
- [ ] Vérifier LocalStorage fonctionne
- [ ] Vérifier les performances (Lighthouse score > 90)
- [ ] Configurer un nom de domaine personnalisé (optionnel)
- [ ] Configurer Analytics (optionnel)

---

## 🎉 Déploiement rapide (Vercel - 2 minutes)

```bash
# 1. Build
npm run build

# 2. Installer Vercel CLI
npm install -g vercel

# 3. Déployer
vercel --prod

# C'est tout ! ✅
```

Votre application est maintenant en ligne et accessible à tous ! 🚀
