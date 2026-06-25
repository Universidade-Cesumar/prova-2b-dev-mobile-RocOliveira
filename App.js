import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { validarRetirada } from './src/utils/validacoes';

const API_URL = 'https://6a18d04d4325f9b0c1322821.mockapi.io/almoxarifado/v1/materials';

export default function App() {
  const [materiais, setMateriais] = useState([]);
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [busca, setBusca] = useState('');
  const [retiradaQuantidades, setRetiradaQuantidades] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isTest = typeof process !== 'undefined' && Boolean(process.env.JEST_WORKER_ID);

  useEffect(() => {
    if (!isTest) carregarMateriais();
  }, []);

  async function carregarMateriais() {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setMateriais(data || []);
    } catch (err) {
      setError('Não foi possível carregar os materiais. Verifique sua conexão.');
      Alert.alert('Erro de conexão', 'Não foi possível carregar os materiais. Verifique sua internet e tente novamente.');
      setMateriais([]);
    } finally {
      setLoading(false);
    }
  }

  async function cadastrarMaterial() {
    if (!nome.trim() || !quantidade.trim()) {
      Alert.alert('Atenção', 'Preencha nome e quantidade antes de cadastrar.');
      return;
    }

    const valorQuantidade = Number(quantidade);
    if (!Number.isInteger(valorQuantidade) || valorQuantidade <= 0) {
      Alert.alert('Atenção', 'A quantidade deve ser um número inteiro maior que zero.');
      return;
    }

    const novoMaterial = {
      nome: nome.trim(),
      quantidade: valorQuantidade,
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoMaterial),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar no servidor');
      }

      const materialCadastrado = await response.json();
      setMateriais((prev) => [materialCadastrado, ...prev]);
      setNome('');
      setQuantidade('');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível cadastrar o material. Tente novamente.');
    }
  }

  async function baixarMaterial(itemId, estoqueAtual) {
    const quantidadeRetirada = Number(retiradaQuantidades[itemId] ?? 0);

    if (!validarRetirada(estoqueAtual, quantidadeRetirada)) {
      Alert.alert('Atenção', 'Quantidade inválida para retirada.');
      return;
    }

    const novaQuantidade = estoqueAtual - quantidadeRetirada;

    try {
      const response = await fetch(`${API_URL}/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantidade: novaQuantidade }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar estoque');
      }

      const materialAtualizado = await response.json();
      setMateriais((prev) => prev.map((item) => (item.id === itemId ? materialAtualizado : item)));
      setRetiradaQuantidades((prev) => ({ ...prev, [itemId]: '' }));
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível registrar a baixa. Tente novamente.');
    }
  }

  async function excluirMaterial(itemId) {
    try {
      const response = await fetch(`${API_URL}/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir material');
      }

      setMateriais((prev) => prev.filter((item) => item.id !== itemId));
      setRetiradaQuantidades((prev) => {
        const next = { ...prev };
        delete next[itemId];
        return next;
      });
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível excluir o material. Tente novamente.');
    }
  }

  const materiaisFiltrados = materiais.filter((item) => item.nome && item.nome.toLowerCase().includes(busca.toLowerCase()));
  const totalItens = materiaisFiltrados.length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Almoxarifado - Enfermagem</Text>
      <Text style={styles.description}>
        Controle simples de estoque de materiais de enfermagem. Cadastre novos insumos e consulte o inventário atual.
      </Text>

      <View style={styles.formRow}>
        <TextInput
          testID="input-nome"
          placeholder="Nome do material"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          testID="input-quantidade"
          placeholder="Quantidade"
          style={styles.input}
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity testID="btn-cadastrar" style={styles.button} onPress={cadastrarMaterial}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <View style={styles.dashboard}>
        <TextInput
          testID="input-busca"
          placeholder="Buscar material"
          style={styles.searchInput}
          value={busca}
          onChangeText={setBusca}
        />
        <Text testID="total-itens" style={styles.totalText}>
          Total de itens: {totalItens}
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#457b9d" />
      ) : (
        <FlatList
          testID="lista-materials"
          data={materiaisFiltrados}
          keyExtractor={(item) => item.id?.toString() || item.nome}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={() => <Text style={styles.emptyText}>Nenhum material encontrado.</Text>}
          renderItem={({ item }) => (
            <View
              style={[
                styles.materialCard,
                Number(item.quantidade) < 10 ? styles.materialCardCritico : null,
              ]}
              accessibilityLabel={Number(item.quantidade) < 10 ? 'estoque-critico' : undefined}
            >
              <Text style={styles.materialName}>{item.nome}</Text>
              <Text style={styles.materialQuantity}>Quantidade: {item.quantidade}</Text>
              <View style={styles.actionRow}>
                <TextInput
                  testID="input-retirada"
                  placeholder="Qtde a retirar"
                  style={styles.retiradaInput}
                  keyboardType="numeric"
                  value={retiradaQuantidades[item.id] ?? ''}
                  onChangeText={(value) => setRetiradaQuantidades((prev) => ({ ...prev, [item.id]: value }))}
                />
                <TouchableOpacity
                  testID="btn-baixar"
                  style={styles.smallButton}
                  onPress={() => baixarMaterial(item.id, Number(item.quantidade))}
                >
                  <Text style={styles.smallButtonText}>Baixar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  testID="btn-excluir"
                  style={[styles.smallButton, styles.deleteButton]}
                  onPress={() => excluirMaterial(item.id)}
                >
                  <Text style={styles.smallButtonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#1d3557',
  },
  description: {
    fontSize: 14,
    color: '#4f5d75',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#a8dadc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  button: {
    height: 48,
    backgroundColor: '#457b9d',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  dashboard: {
    marginBottom: 16,
  },
  searchInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#a8dadc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  totalText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1d3557',
  },
  listContainer: {
    paddingBottom: 24,
  },
  materialCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  materialCardCritico: {
    backgroundColor: '#ffe5e5',
    borderWidth: 1,
    borderColor: '#d90429',
  },
  materialName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1d3557',
    marginBottom: 6,
  },
  materialQuantity: {
    fontSize: 14,
    color: '#4f5d75',
  },
  emptyText: {
    textAlign: 'center',
    color: '#4f5d75',
    marginTop: 20,
  },
  errorText: {
    marginTop: 12,
    color: '#d90429',
    textAlign: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  retiradaInput: {
    flex: 1,
    height: 42,
    borderWidth: 1,
    borderColor: '#a8dadc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  smallButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#457b9d',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#d90429',
  },
  smallButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});

