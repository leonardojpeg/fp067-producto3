import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';

import Players from './screens/Players';
import Detail from './screens/Detail';
import Media from './screens/Media';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Players"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FF5733', // Color de equipo de ejemplo (Naranja/Rojo)
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Players" 
          component={Players} 
          options={{ title: 'Jugadores del Equipo' }} 
        />
        <Stack.Screen 
          name="Detail" 
          component={Detail} 
          options={({ navigation, route }) => ({
            title: route.params?.player?.name || route.params?.player?.nombre || 'Detalle',
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('Players')}
                title="Inicio"
                color="#fff"
              />
            ),
          })}
        />
        <Stack.Screen 
          name="Media" 
          component={Media} 
          options={({ navigation }) => ({
            title: 'Highlights',
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('Players')}
                title="Inicio"
                color="#fff"
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
