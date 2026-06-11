import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';

const API_URL = 'https://6456d497f803f345763408ee.mockapi.io/almoxarifado/materials';

export default function App() {
  const [materiais, setMateriais] = useState([]);
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    carregarMateriais();
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

  const materiaisFiltrados = materiais.filter((item) => item.nome.toLowerCase().includes(busca.toLowerCase()));
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
            <View style={styles.materialCard}>
              <Text style={styles.materialName}>{item.nome}</Text>
              <Text style={styles.materialQuantity}>Quantidade: {item.quantidade}</Text>
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
});

