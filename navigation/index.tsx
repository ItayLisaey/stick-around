/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Platform } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import InTheatersScreen from '../screens/InTheatersScreen';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { SingleMovieScreen } from '../screens/SingleMovieScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import {
  InTheatersStackParamList,
  RootStackParamList,
  RootTabParamList,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Root'
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name='Modal' component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName='InTheatersStack'
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].background,
          borderTopColor: 'transparent',
        },
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name='InTheatersStack'
        component={InTheatersNavigator}
        options={{
          title: 'In Theaters',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name='film' color={color} />,
        }}
      />
      <BottomTab.Screen
        name='Search'
        component={TabTwoScreen}
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name='search' color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
const InTheatersStack = createNativeStackNavigator<InTheatersStackParamList>();

function InTheatersNavigator() {
  const colorScheme = useColorScheme();

  return (
    <InTheatersStack.Navigator>
      <InTheatersStack.Screen
        name='InTheaters'
        component={InTheatersScreen}
        options={({ navigation }) => ({
          animation: 'slide_from_right',
          title: 'In Theaters',
          headerShown: true,
          headerLargeTitle: true,
          headerTintColor: Colors[colorScheme].text,

          headerTransparent: false,
          headerStyle: {
            flexDirection: 'column',
            // height: 100,
            backgroundColor: Colors[colorScheme].background,
            borderBottomWidth: 10,
            borderBottomColor: 'blue',
          },
        })}
      />
      <InTheatersStack.Screen
        name='Movie'
        component={SingleMovieScreen}
        options={({ navigation, route }) => ({
          animation:
            Platform.OS === 'ios' ? 'slide_from_right' : 'fade_from_bottom',

          headerLargeTitle: true,
          title: route.params.title,
          headerShown: true,
          headerTransparent: false,
          headerTintColor: Colors[colorScheme].text,
          headerShadowVisible: false,
          headerStyle: {
            color: Colors[colorScheme].text,
            flexDirection: 'column',
            height: 100,
            backgroundColor: Colors[colorScheme].background,
          },
        })}
      />
    </InTheatersStack.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Feather>['name'];
  color: string;
}) {
  return <Feather size={20} {...props} />;
}
