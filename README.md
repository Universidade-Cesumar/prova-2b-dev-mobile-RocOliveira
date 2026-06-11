# Almoxarifado de Enfermagem

Projeto em React Native / Expo para controlar o estoque de materiais de enfermagem. A aplicação exibe uma lista de materiais, permite o cadastro de novos insumos e pesquisa por nome, consumindo uma API MockAPI.

## Tecnologias usadas

- React Native
- Expo
- JavaScript
- MockAPI para backend fake
- Jest + @testing-library/react-native para testes automatizados

## Funcionalidades implementadas

- Listagem de materiais com `FlatList` e `testID="lista-materials"`
- Formulário de cadastro com `TextInput` para nome (`testID="input-nome"`) e quantidade (`testID="input-quantidade"`)
- Botão de cadastrar com `testID="btn-cadastrar"`
- Campo de busca com `testID="input-busca"`
- Totalizador de itens com `testID="total-itens"`
- Validação de quantidade inteira positiva
- Consumo de API MockAPI para carga e cadastro de materiais

## Como rodar

1. Instale as dependências:

```bash
npm install
```

2. Inicie o Expo:

```bash
npm start
```

3. Abra no emulador ou no aplicativo Expo Go pelo QR Code.

## Observações

- O projeto utiliza a propriedade `testID` conforme regras do contrato técnico.
- A URL do MockAPI está configurada em `App.js`. Caso seja necessário, substitua por sua própria rota do MockAPI.
