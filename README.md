# Almoxarifado de Enfermagem

Aplicativo mobile em React Native com Expo para controle de materiais de enfermagem.

## Entregas por Sprint

### Sprint 1 - Fundacao e Inventario

Implementacoes principais:

- Estrutura inicial do app em React Native com Expo
- Cadastro de materiais com nome e quantidade
- Lista de materiais com `FlatList`
- Contrato tecnico inicial atendido:
	- `input-nome`
	- `input-quantidade`
	- `btn-cadastrar`
	- `lista-materials`

Evidencias de validacao:

- Testes da sprint 1 em `__tests__/sprint1.test.js`

### Sprint 2 - Validacao Logica

Implementacoes principais:

- Funcao de validacao de retirada em `src/utils/validacoes.js`
- Regra de negocio para permitir retirada somente quando:
	- quantidade > 0
	- quantidade <= estoque
- Integracao da regra de validacao no fluxo de baixa de materiais

Evidencias de validacao:

- Testes da sprint 2 em `__tests__/sprint2.test.js`

### Sprint 3 - Dashboard, Alertas e Resiliencia

Implementacoes principais:

- Filtro de pesquisa em tempo real com `testID="input-busca"`
- Dashboard com totalizador com `testID="total-itens"`
- Indicador visual de estoque critico para materiais com quantidade menor que 10
- Aplicacao de `accessibilityLabel="estoque-critico"` no card em situacao critica
- Tratamento de erros de rede com `try/catch` e alertas amigaveis na interface

Evidencias de validacao:

- Testes da sprint 3 em `__tests__/sprint3.test.js`

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

## Resultado dos Testes

Status atual da validacao automatizada:

- 3 suites aprovadas
- 6 testes aprovados

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

## Documentacao de Git

Consulte o guia completo de versionamento em `DOCUMENTACAO_GIT.md`.

## Observacoes

- A URL da API pode ser ajustada em `App.js`.
- Em falhas de conexao, o app exibe mensagem amigavel e continua estavel.
