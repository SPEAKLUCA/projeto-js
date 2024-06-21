import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import ListaScreen from './ListaScreen';  // Certifique-se de criar e ajustar ListaScreen.js conforme mostrado anteriormente

const Stack = createStackNavigator();

export default function App() {
  const [listData, setListData] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cadastro">
        <Stack.Screen name="Cadastro">
          {props => <CadastroScreen {...props} listData={listData} setListData={setListData} />}
        </Stack.Screen>
        <Stack.Screen name="Lista">
          {props => <ListaScreen {...props} listData={listData} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function CadastroScreen({ navigation, listData, setListData }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [idade, setIdade] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBlurCep = async () => {
    if (cep.trim().length !== 8) {
      alert('Por favor, insira um CEP válido.');
      return;
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const { logradouro, bairro, localidade, uf } = response.data;
      const enderecoCompleto = `${logradouro}, ${bairro}, ${localidade} - ${uf}`;
      setEndereco(enderecoCompleto);
    } catch (error) {
      console.error('Erro ao obter o endereço:', error);
      alert('Erro ao obter o endereço. Por favor, verifique o CEP e tente novamente.');
    }
  };

  const handleCadastro = async () => {
    if (!nome.trim() || !cpf.trim() || !idade.trim() || !cep.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      const newCliente = { nome, cpf, idade, cep, endereco };
      const response = await axios.post('http://localhost:3000/clientes', newCliente);

      setListData(prevListData => [
        ...prevListData,
        response.data
      ]);

      setNome('');
      setCpf('');
      setIdade('');
      setCep('');
      setEndereco('');
    } catch (error) {
      console.error('Erro ao cadastrar o cliente:', error);
      alert('Erro ao cadastrar o cliente. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastre um novo cliente</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Idade"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="CEP"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
        onBlur={handleBlurCep}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço completo"
        value={endereco}
        onChangeText={setEndereco}
        editable={false}
      />
      {loading ? <ActivityIndicator size="large" color="#ff6347" /> : <Button title="Cadastrar" onPress={handleCadastro} color="#4682b4" />}
      <Button
        title="Ver Clientes Cadastrados"
        onPress={() => navigation.navigate('Lista')}
        style={styles.buttonSpacing}
        color="#4682b4"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 30, // Increased horizontal padding
  },
  title: {
    fontSize: 28, // Increased font size
    marginBottom: 30, // Increased margin bottom
    color: '#fff', // White text color
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15, // Increased padding
    marginBottom: 30, // Increased margin bottom
    width: '100%',
    backgroundColor: '#fff',
    fontSize: 18, // Increased font size
  },
  buttonSpacing: {
    marginTop: 20, // Increased margin top
  },
});
