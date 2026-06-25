# Almoxarifado de Enfermagem

Aplicativo mobile em React Native com Expo para controle de materiais de enfermagem.

## Entrega Sprint 3

Implementacoes solicitadas:

- Filtro de pesquisa em tempo real com `testID="input-busca"`
- Dashboard com totalizador com `testID="total-itens"`
- Indicador visual de estoque critico para materiais com quantidade menor que 10
- Aplicacao de `accessibilityLabel="estoque-critico"` no card em situacao critica
- Tratamento de erros de rede com `try/catch` e alertas amigaveis na interface

## Tecnologias

- React Native
- Expo
- JavaScript
- MockAPI
- Jest e Testing Library React Native

## Contrato Tecnico Obrigatorio

- `input-nome`
- `input-quantidade`
- `btn-cadastrar`
- `lista-materials`
- `input-busca`
- `total-itens`
- `accessibilityLabel="estoque-critico"` quando quantidade < 10

## Como Executar (Expo Go)

1. Instale as dependencias:

```bash
npm install --legacy-peer-deps
```

2. Inicie o projeto:

```bash
npm start
```

3. Abra no Expo Go:

- Android: leia o QR Code com o app Expo Go
- iOS: leia o QR Code com a camera e abra no Expo Go

## Testes

```bash
npm test
```

## Screenshots

Crie a pasta `screenshots/` e adicione capturas da aplicacao em execucao:

- `screenshots/tela-inicial.png`
- `screenshots/filtro-busca.png`
- `screenshots/estoque-critico.png`
- `screenshots/cadastro-material.png`

Depois, referencie as imagens no README:

```md
![Tela inicial](screenshots/tela-inicial.png)
![Filtro de busca](screenshots/filtro-busca.png)
![Estoque critico](screenshots/estoque-critico.png)
![Cadastro de material](screenshots/cadastro-material.png)
```

## Publicacao

- Repositorio GitHub publicado com historico de commits por sprint
- Postagem no LinkedIn descrevendo a evolucao do projeto, desafios e aprendizados

## Documentacao de Git

Consulte o guia completo de versionamento em `DOCUMENTACAO_GIT.md`.

## Observacoes

- A URL da API pode ser ajustada em `App.js`.
- Em falhas de conexao, o app exibe mensagem amigavel e continua estavel.
