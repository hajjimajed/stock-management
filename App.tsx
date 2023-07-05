import React, { useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthProvider } from './contexts/auth.context';
import { TogglesProvider } from './contexts/toggles.context';

import Home from './routes/home/home.component';
import Signup from './routes/signup/signup.component';
import Signin from './routes/signin/signin.component';
import Setting from './routes/setting/setting.component';
import Inventory from './routes/inventory/inventory.component';
import Scanner from './routes/scanner/scanner.component';
import Splash from './components/splash/splash.component';

import BottomBar from './components/bottom-bar/bottom-bar.component';

const Stack = createStackNavigator();


function App(): JSX.Element {
  return (
    <AuthProvider>
      <TogglesProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
            <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
            <Stack.Screen name="Inventory" component={Inventory} options={{ headerShown: false }} />
            <Stack.Screen name="Scanner" component={Scanner} options={{ headerShown: false }} />
          </Stack.Navigator>
          <BottomBar />
        </NavigationContainer>
      </TogglesProvider>
    </AuthProvider>
  );
}



export default App;
