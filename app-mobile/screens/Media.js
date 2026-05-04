import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

export default function Media({ route, navigation }) {
  const { player } = route.params || {};

  const getVideoUri = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    // Si es un archivo local "assets/videos/...", no lo podemos reproducir directamente 
    // sin tener el archivo físico o un enlace de Firebase Storage.
    return null;
  };

  // URL del video usando el campo correcto 'video' y mapeando los locales
  const videoSource = getVideoUri(player?.video);

  const videoPlayer = useVideoPlayer(videoSource || '', player => {
    player.loop = true;
    player.play();
  });

  if (!videoSource) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Este jugador no tiene un video de highlights disponible.</Text>
        <Button title="Volver" onPress={() => navigation.goBack()} color="#FF5733" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Highlights: {player?.nombre} {player?.apellidos}</Text>
      
      <View style={styles.videoContainer}>
        <VideoView 
          style={styles.video} 
          player={videoPlayer} 
          allowsFullscreen 
          allowsPictureInPicture 
        />
      </View>

      <View style={styles.controlsContainer}>
        <Button
          title={videoPlayer.playing ? 'Pausar Video' : 'Reproducir Video'}
          color="#FF5733"
          onPress={() => {
            if (videoPlayer.playing) {
              videoPlayer.pause();
            } else {
              videoPlayer.play();
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#111',
    borderRadius: 8,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  controlsContainer: {
    marginTop: 30,
    width: '100%',
    paddingHorizontal: 20,
  }
});
