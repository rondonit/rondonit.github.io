# Blog pessoal — rondonit.github.io

Blog em Markdown com Jekyll e Minimal Mistakes (`4.28.1`), tema escuro e conteúdo
demonstrativo em português e inglês.

O layout segue a estrutura de [some-natalie.dev](https://some-natalie.dev/):
barra lateral fixa com foto circular, nome, apresentação e navegação vertical,
com cards para os posts. No celular, um botão abre a barra lateral; o menu pode
ser fechado com o botão, com Escape ou ao tocar fora. Sem JavaScript, o perfil
e a navegação continuam visíveis acima do conteúdo.

O menu mantém quatro páginas por idioma:

| Página | Português | Inglês |
| --- | --- | --- |
| Home | `/pt/` | `/en/` |
| Posts | `/pt/posts/` | `/en/posts/` |
| Links e ferramentas | `/pt/links/` | `/en/links/` |
| About | `/pt/about/` | `/en/about/` |

A raiz `/` encaminha para `/pt/`. O seletor 🇧🇷 PT / 🇺🇸 EN no canto superior
leva à tradução da página ou do post atual. Se a tradução não existir, leva à
home do outro idioma. As listas de posts mostram somente o idioma selecionado.
O seletor funciona com links comuns, sem depender de JavaScript.

## Preview local sem instalar Ruby no Fedora

Abra esta pasta no VS Code com **Dev Containers** e Docker disponíveis.
Execute **Dev Containers: Reopen in Container** e aguarde a instalação automática.
Depois execute no terminal do container:

```bash
bundle exec jekyll serve --host 0.0.0.0
```

Abra a porta **4000** encaminhada pelo VS Code. Confira `/pt/` e `/en/`.
Ao alterar `_config.yml`, reinicie o servidor.

No Codespaces, use o mesmo comando. Se o ambiente já existia antes do
devcontainer, execute **Codespaces: Rebuild Container**. Ao terminar, use
**Codespaces: Stop Codespace**.

Se `_site/` já foi gerado durante a revisão, você também pode abrir essa cópia:

```bash
python3 -m http.server 4000 --bind 127.0.0.1 --directory _site
```

Nesse caso, abra `http://localhost:4000`. A cópia estática não se atualiza ao editar
o Markdown; para reconstruir, use `bundle exec jekyll build` no container.
`_site/` e as dependências em `vendor/` são ignorados pelo Git.

## Personalização

| Arquivo ou pasta | O que editar |
| --- | --- |
| `_data/i18n.yml` | Nome, descrição e textos da interface em cada idioma |
| `_data/profile.yml` | Foto, biografia, localização e GitHub da barra lateral |
| `_data/navigation.yml` | As quatro opções do menu de cada idioma |
| `_data/languages.yml` | Idiomas, bandeiras e páginas iniciais |
| `_data/resources.yml` | Links e ferramentas favoritos, separados por idioma |
| `_pages/pt/` e `_pages/en/` | Textos da home, posts, links e about |
| `_posts/` | Posts em Markdown |
| `assets/css/main.scss` | Cores, espaçamentos e layout responsivo |
| `_config.yml` | URL, tema e configurações do Jekyll |

Os recursos sem `url` são exibidos como placeholders sem link. Para adicionar
um favorito real, preencha seu nome, descrição e endereço em `_data/resources.yml`:

```yaml
- name: "[Nome da ferramenta]"
  description: "[Como você usa esta ferramenta.]"
  url: "https://example.com"
```

Os textos, projetos mencionados nos posts e favoritos são exemplos, não uma
biografia ou recomendações reais. Substitua-os quando quiser personalizar o site.

A foto inicial é uma silhueta demonstrativa em `assets/images/avatar-placeholder.svg`.
Para usar sua foto, coloque o arquivo em `assets/images/` e altere `avatar` em
`_data/profile.yml`. Nome e informações são traduzidos pelos arquivos de dados;
as mesmas foto e URL do GitHub são usadas nos dois idiomas.

## Posts e traduções

Use um arquivo por idioma, com o mesmo `translation_key` para ligar as versões.
O nome do arquivo deve seguir `AAAA-MM-DD-titulo.md`. Por exemplo:

```yaml
---
title: "[Título do post]"
date: 2026-10-23 09:00:00 -0300
excerpt: "[Resumo do post.]"
lang: pt
locale: pt-BR
translation_key: meu-post
nav_key: posts
permalink: /pt/posts/meu-post/
---
```

Na versão inglesa, mantenha `translation_key: meu-post` e ajuste `lang: en`,
`locale: en-US`, o texto e `permalink: /en/posts/my-post/`.
Cada par deve ter uma única versão por idioma. As URLs podem ter slugs diferentes.
As páginas usam o mesmo mecanismo de tradução e metadados `hreflang`.

Escolha datas e horários passados para os posts aparecerem no build normal.
Para ver rascunhos localmente, acrescente `--drafts` ao comando de preview.
Arquivos em um repositório público são públicos, inclusive `_drafts` e textos
com `published: false`. Notas privadas devem ficar em um repositório privado separado.

## Publicação na conta pessoal

O destino é exclusivamente `rondonit/rondonit.github.io`. Antes de publicar:

```bash
git remote -v
gh api user --jq .login
git config --get user.email
git status --short
git diff
```

Confira também os novos arquivos: `git diff` não mostra arquivos ainda não
rastreados. A autenticação do GitHub e a autoria dos commits são configurações
separadas. Use a conta **rondonit** e um e-mail pessoal ou o e-mail privado do
GitHub dessa conta. Ajustes de identidade devem usar `git config --local`,
preservando a configuração global e os repositórios de trabalho.

O workflow `.github/workflows/jekyll-gh-pages.yml` faz build e deploy em pushes
para `main`. Em **Settings → Pages → Source**, a opção é **GitHub Actions**.
Acompanhe o resultado na aba **Actions**. O site fica em
`https://rondonit.github.io`.

O Gemfile fixa `github-pages` em `232` para evitar resolver dependências antigas
incompatíveis com Ruby recente. Os layouts locais simplificam o tema e mantêm o
seletor dependente da página atual, sem cache de navegação entre páginas.

## Referências

- [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/)
- [Blogging with Codespaces](https://some-natalie.dev/blog/blogging-with-codespaces/)
- [Blogging with Codespaces, part 2](https://some-natalie.dev/blog/revising-devcontainer/)
