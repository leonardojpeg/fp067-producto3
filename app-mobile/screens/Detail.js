import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';

export default function Detail({ route, navigation }) {
  const { player } = route.params || {};

  if (!player) {
    return (
      <View style={styles.centered}>
        <Text>No hay información del jugador.</Text>
        <Button title="Volver" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>{player.name || player.nombre}</Text>
        <Text style={styles.subtitle}>{player.position || player.posicion}</Text>
        
        <View style={styles.statsContainer}>
          {player.points !== undefined && (
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>PTS</Text>
              <Text style={styles.statValue}>{player.points}</Text>
            </View>
          )}
          {player.rebounds !== undefined && (
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>REB</Text>
              <Text style={styles.statValue}>{player.rebounds}</Text>
            </View>
          )}
          {player.assists !== undefined && (
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>AST</Text>
              <Text style={styles.statValue}>{player.assists}</Text>
            </View>
          )}
        </View>

        <Text style={styles.description}>
          {player.description || player.descripcion || 'Sin descripción disponible para este jugador.'}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          title="Ver Highlights" 
          onPress={() => navigation.navigate('Media', { player })}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
  },
  statBox: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  buttonContainer: {
    marginTop: 10,
  }
});
