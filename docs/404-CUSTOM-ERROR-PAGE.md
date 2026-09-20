# Page 404 personnalisée

## Objectif

Toutes les URL inexistantes doivent afficher la page `404.html` Swing Digital tout en conservant un statut HTTP `404`.

À éviter : rediriger les erreurs vers `/404.html` en `200`. Cela rend la page visible, mais affaiblit le signal SEO.

## État à vérifier sur l'origine de production

La page `src/404.html` est générée dans `dist/` et porte `noindex, follow`. Le statut HTTP et le corps réellement servis par l'origine OVH restent à vérifier après le premier déploiement Git ; un build local ne prouve pas le comportement du serveur.

```bash
curl -sI https://www.swingdigitalproduction.com/404.html
```

peut répondre `200` pour l'accès direct à la ressource.

```bash
curl -sI https://www.swingdigitalproduction.com/page-inexistante-test-404.html
curl -sL https://www.swingdigitalproduction.com/page-inexistante-test-404.html
```

doit répondre `404` et afficher le corps HTML Swing Digital, pas la page technique de l'hébergeur.

## Critères de validation

```bash
curl -sI https://www.swingdigitalproduction.com/page-inexistante-test-404.html
```

doit contenir :

```text
404
```

```bash
curl -sL https://www.swingdigitalproduction.com/page-inexistante-test-404.html | rg "page-404-hero|Page introuvable"
```

doit trouver le HTML de la page custom.

```bash
curl -sL https://www.swingdigitalproduction.com/page-inexistante-test-404.html | rg "Nothing matches the given URI|Error response"
```

ne doit rien retourner.

## Apache

Si l'origine est Apache et accepte `.htaccess`, ajouter dans le document root publié :

```apache
ErrorDocument 404 /404.html
```

Puis vérifier :

```bash
curl -sI https://www.swingdigitalproduction.com/page-inexistante-test-404.html
curl -sL https://www.swingdigitalproduction.com/page-inexistante-test-404.html | rg "page-404-hero"
```

Note : ne pas rediriger avec `Redirect 404 /404.html`. Le bon comportement est de servir le document d'erreur en conservant le statut `404`.

## Nginx

Dans le bloc `server` :

```nginx
error_page 404 /404.html;

location = /404.html {
    root /chemin/vers/dist;
    internal;
}
```

Si `internal` empêche l'accès direct à `/404.html`, le retirer pour conserver l'URL de prévisualisation publique :

```nginx
error_page 404 /404.html;

location = /404.html {
    root /chemin/vers/dist;
}
```

## Serveur statique Python

Si l'origine utilise un serveur statique Python ou équivalent, `SimpleHTTPRequestHandler` ne sert pas automatiquement `404.html`.

Il faut utiliser un handler qui remplace le corps de réponse `404` par le fichier `404.html` :

```python
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class Custom404Handler(SimpleHTTPRequestHandler):
    def send_error(self, code, message=None, explain=None):
        if code == 404 and Path("404.html").is_file():
            body = Path("404.html").read_bytes()
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return

        super().send_error(code, message, explain)


ThreadingHTTPServer(("127.0.0.1", 8080), Custom404Handler).serve_forever()
```

Le principe est important : le statut reste `404`, seul le corps HTML change.

## Cloudflare Worker

À utiliser uniquement si l'origine ne permet pas de configurer son document d'erreur.

```javascript
export default {
  async fetch(request) {
    const response = await fetch(request);

    if (response.status !== 404) {
      return response;
    }

    const url = new URL(request.url);
    const custom404 = await fetch(`${url.origin}/404.html`);
    const headers = new Headers(custom404.headers);
    headers.set("content-type", "text/html; charset=utf-8");

    return new Response(custom404.body, {
      status: 404,
      statusText: "Not Found",
      headers,
    });
  },
};
```

Vérifier ensuite que Cloudflare ne transforme pas la réponse en `200`.

## Checklist de mise en ligne

1. Identifier le serveur réel de l'origine OVH de production.
2. Appliquer une seule recette : Apache, Nginx, serveur statique custom ou Cloudflare Worker.
3. Déployer.
4. Tester une URL inexistante avec `curl -sI`.
5. Tester le corps de réponse avec `rg "page-404-hero"`.
6. Vérifier qu'aucune page technique en anglais n'est servie.
7. Vérifier que `/404.html` reste en `noindex, follow`.
8. Relancer `npm run prod:preflight -- https://www.swingdigitalproduction.com`.
