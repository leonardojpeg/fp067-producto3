import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Image } from 'react-native';

export default function Detail({ route, navigation }) {
  const { player } = route.params || {};

  if (!player) {
    return (
      <View style={styles.centered}>
        <Text>No hay información del jugador.</Text>
        <Button title="Volver" onPress={() => navigation.goBack()} color="#FF5733" />
      </View>
    );
  }

  const getImageUri = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    if (url.includes('austinreaves')) return 'https://cdn.nba.com/headshots/nba/latest/1040x760/1630559.png';
    if (url.includes('anthonydavis')) return 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6583.png';
    if (url.includes('ruihachimura')) return 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4066648.png';
    if (url.includes('dangelorussell')) return 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3136776.png';
    if (url.includes('lebronjames')) return 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png';
    return null;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        {getImageUri(player.imagen) ? (
          <Image source={{ uri: getImageUri(player.imagen) }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]}>
            <Text style={styles.placeholderText}>{player.nombre?.charAt(0) || '?'}</Text>
          </View>
        )}
        
        <View style={styles.headerInfo}>
          <Text style={styles.title}>{player.nombre} {player.apellidos}</Text>
          <Text style={styles.subtitle}>{player.posicion} • #{player.dorsal}</Text>
          <Text style={styles.teamBadge}>{player.equipo}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>EDAD</Text>
            <Text style={styles.statValue}>{player.edad || '--'}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>ALTURA</Text>
            <Text style={styles.statValue}>{player.altura || '--'}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>ESTADO</Text>
            <Text style={[styles.statValue, { color: player.estado === 'Activo' ? '#4CAF50' : '#F44336' }]}>
              {player.estado || '--'}
            </Text>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitle}>Perfil</Text>
          <Text style={styles.description}>
            {player.perfil || 'Sin perfil o descripción disponible para este jugador.'}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          title="Ver Highlights en Video" 
          color="#FF5733"
          onPress={() => navigation.navigate('Media', { player })}
          disabled={!player.video}
        />
        {!player.video && (
          <Text style={styles.noVideoText}>Este jugador no tiene video disponible.</Text>
        )}
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
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 250,
  },
  imagePlaceholder: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 80,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerInfo: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  teamBadge: {
    backgroundColor: '#FF5733',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#fafafa',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statBox: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  descriptionContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#555',
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 30,
    borderRadius: 8,
    overflow: 'hidden',
  },
  noVideoText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 8,
    fontSize: 14,
  }
});
