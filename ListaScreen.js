import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function ListaScreen({ listData }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Clientes Cadastrados</Text>
      <FlatList
        style={styles.list}
        data={listData}
        keyExtractor={item => item.id.toString()} // Ensure item.id is converted to string for keyExtractor
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>Nome: {item.nome}</Text>
            <Text style={styles.listItemText}>CPF: {item.cpf}</Text>
            <Text style={styles.listItemText}>Idade: {item.idade}</Text>
            <Text style={styles.listItemText}>CEP: {item.cep}</Text>
            <Text style={styles.listItemText}>Endereço: {item.endereco}</Text>
          </View>
        )}
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
  list: {
    width: '100%',
  },
  listItem: {
    padding: 20, // Increased padding
    backgroundColor: '#fff',
    marginBottom: 20, // Increased margin bottom
    borderRadius: 10, // Increased border radius
    borderWidth: 2, // Increased border width
    borderColor: '#ccc',
  },
  listItemText: {
    fontSize: 18, // Increased font size
    marginBottom: 10, // Increased margin bottom
  },
});
