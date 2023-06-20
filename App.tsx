import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthProvider } from './contexts/auth.context';

import Home from './routes/home/home.component';
import Signup from './routes/signup/signup.component';
import Signin from './routes/signin/signin.component';
import Setting from './routes/setting/setting.component';
import Inventory from './routes/inventory/inventory.component';

const Stack = createStackNavigator();

function App(): JSX.Element {


  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen name="Inventory" component={Inventory} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}



export default App;
