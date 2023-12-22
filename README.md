# TrybeTunes

TrybeTunes é uma aplicação web que permite aos usuários reproduzir músicas de diversas bandas e artistas, criar uma lista de músicas favoritas e editar o perfil do usuário logado. Para isso foi utilizada a API do ITunes, dispoível em https://developer.apple.com/documentation/applemusicapi/.

## Funcionalidades

- Fazer login
- Pesquisar por uma banda ou artista
- Listar os álbuns disponíveis dessa banda ou artista
- Visualizar as músicas de um álbum selecionado
- Reproduzir uma prévia das músicas deste álbum
- Favoritar e desfavoritar músicas
- Ver a lista de músicas favoritas
- Ver o perfil da pessoa logada
- Editar o perfil da pessoa logada

## Tecnologias Utilizadas

- JavaScript
- Node.js
- NPM
- React

## Estrutura do Projeto

O projeto tem a seguinte estrutura de diretórios e arquivos:

    src/
    App.jsx
    components/
        Header.jsx
        Loading.jsx
        MusicCard.jsx
    index.css
    index.js
    pages/
        Album.jsx
        Favorites.jsx
        Login.jsx
        NotFound.jsx
        Profile.jsx
        ProfileEdit.jsx
        Search.jsx
    services/
        favoriteSongsAPI.js
        musicsAPI.js
        searchAlbumsAPI.js
        userAPI.js
    setupTests.js

## Como Executar

Para executar este projeto localmente, siga estas etapas:

1. Clone o repositório
2. Instale as dependências com `npm install`
3. Inicie o servidor de desenvolvimento com `npm start`

## Contribuição

Este projeto é para fins educacionais, portanto, pull requests não serão aceitos.

## Licença

MIT
