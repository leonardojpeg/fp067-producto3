import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, Image } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function Players({ navigation }) {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('Todas');

  const positions = ['Todas', 'Base', 'Escolta', 'Alero', 'Ala-Pívot', 'Pívot'];

  useEffect(() => {
    const playersRef = collection(db, 'players');
    const unsubscribe = onSnapshot(playersRef, (snapshot) => {
      const playersList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPlayers(playersList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching players: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let result = players;
    
    if (searchText) {
      const text = searchText.toLowerCase().trim();
      result = result.filter(p => 
        (p.nombre && p.nombre.toLowerCase().includes(text)) || 
        (p.apellidos && p.apellidos.toLowerCase().includes(text)) ||
        (p.equipo && p.equipo.toLowerCase().includes(text))
      );
    }
    
    if (selectedPosition !== 'Todas') {
      result = result.filter(p => 
        p.posicion && p.posicion.toLowerCase() === selectedPosition.toLowerCase()
      );
    }
    
    setFilteredPlayers(result);
  }, [searchText, selectedPosition, players]);

  const getImageUri = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    // Map local assets from the web version to public URLs for the mobile app
    if (url.includes('austinreaves')) return 'https://cdn.nba.com/headshots/nba/latest/1040x760/1630559.png';
    if (url.includes('anthonydavis')) return 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6583.png';
    if (url.includes('ruihachimura')) return 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4066648.png';
    if (url.includes('dangelorussell')) return 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3136776.png';
    if (url.includes('lebronjames')) return 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png';
    return null;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('Detail', { player: item })}
    >
      {getImageUri(item.imagen) ? (
        <Image source={{ uri: getImageUri(item.imagen) }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]}>
          <Text style={styles.placeholderText}>{item.nombre?.charAt(0) || '?'}</Text>
        </View>
      )}
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.nombre} {item.apellidos}</Text>
        <Text style={styles.position}>{item.posicion}</Text>
        <Text style={styles.team}>{item.equipo}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FF5733" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre, apellido o equipo..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      
      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={positions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.filterButton, selectedPosition === item && styles.filterButtonActive]}
              onPress={() => setSelectedPosition(item)}
            >
              <Text style={[styles.filterText, selectedPosition === item && styles.filterTextActive]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={filteredPlayers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>No se encontraron jugadores.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#FF5733',
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  filtersContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: '#FF5733',
  },
  filterText: {
    color: '#666',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
  },
  list: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
  },
  imagePlaceholder: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  position: {
    fontSize: 14,
    color: '#FF5733',
    fontWeight: '600',
    marginBottom: 4,
  },
  team: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  }
});
