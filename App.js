import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import VideoPlayer from './screens/VideoScreen';
import { useDispatch, useSelector } from 'react-redux';
import reduxStore from './redux';
import CryoptoScreen from './screens/CryptoScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getScreen } from './redux/actions';

const Tab = createBottomTabNavigator();

const store = reduxStore();

function MyTabs() {
  const dispatch = useDispatch();
  const { screenName } = useSelector(
    (state) => state.screenSaver
  );
  useEffect(() => {
    dispatch(getScreen());
  }, []);

  if (screenName && screenName != undefined) {
    return (
      <Tab.Navigator
        initialRouteName={screenName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Video') {
              iconName = 'videocam-outline';
            } else if (route.name === 'Cryptos') {
              iconName = 'settings-outline';
            }

            // You can return any component that you like here!
            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: '#0059B3',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Video" component={VideoPlayer} />
        <Tab.Screen
          name="Cryptos"
          component={CryoptoScreen}
        />
      </Tab.Navigator>
    );
  } else {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
