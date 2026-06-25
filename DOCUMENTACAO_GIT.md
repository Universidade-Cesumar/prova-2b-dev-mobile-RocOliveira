# Documentacao Git do Projeto

Este guia resume o fluxo recomendado de Git para o projeto de almoxarifado mobile.

## 1. Clonar o repositorio

```bash
git clone https://github.com/Universidade-Cesumar/prova-2b-dev-mobile-RocOliveira.git
cd prova-2b-dev-mobile-RocOliveira
```

## 2. Configuracao inicial de usuario

```bash
git config user.name "Seu Nome"
git config user.email "seu-email@exemplo.com"
```

## 3. Atualizar branch principal local

```bash
git checkout master
git pull origin master
```

## 4. Fluxo recomendado de desenvolvimento

1. Crie uma branch para sua tarefa.
2. Faça mudancas pequenas e commit por responsabilidade.
3. Rode testes antes de publicar.
4. Envie a branch para o GitHub.
5. Abra Pull Request quando aplicavel.

### Criar branch

```bash
git checkout -b feat/sprint-3-dashboard
```

### Ver status e diferencas

```bash
git status
git diff
```

### Commit granular (exemplos)

```bash
git add App.js
git commit -m "feat: implementar dashboard da sprint 3"

git add README.md
git commit -m "docs: atualizar README com sprint 3"

git add package-lock.json
git commit -m "chore: atualizar lockfile"
```

## 5. Publicar no remoto

### Enviar branch de feature

```bash
git push origin feat/sprint-3-dashboard
```

### Enviar direto na master (quando permitido)

```bash
git push origin master
```

## 6. Atualizar com mudancas remotas

```bash
git checkout master
git pull origin master
```

## 7. Resolver conflitos

```bash
git status
# editar arquivos com conflito
git add .
git commit -m "fix: resolver conflitos de merge"
```

## 8. Padrao de mensagens de commit

Use prefixos semanticos:

- feat: nova funcionalidade
- fix: correcao de bug
- docs: documentacao
- chore: manutencao/infra
- test: testes
- refactor: refatoracao sem alterar regra de negocio

Exemplos:

- feat: adicionar filtro de busca em tempo real
- fix: tratar falha de conexao no carregamento
- docs: incluir instrucoes do Expo Go no README

## 9. Checklist antes do push

- Projeto executa com `npm start`
- Testes passam com `npm test --silent`
- Commits estao granulares e descritivos
- Arquivos temporarios locais nao foram commitados

## 10. Arquivos que nao devem ir para commit

- Logs locais em `.expo/dev/logs/`
- Artefatos temporarios de editor
- Pastas de build/cache nao versionadas
