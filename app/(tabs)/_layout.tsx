import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, useColorScheme } from 'react-native';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { supabase } from '@/lib/supabase-client';
import { User } from '@supabase/supabase-js';
export const UserContext = React.createContext<User | null>(null);


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<"success" | "loading" | "error">("loading");
  useEffect(() => {
    setStatus("loading");
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
        setStatus("success");
      } else {
        Alert.alert("Error Accessing User");
        setStatus("error");
      }
    });
  }, []);


  if (status === "loading") {
    return <View style={{
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <ActivityIndicator />
    </View>

  }

  if (status === "error") {
    return <Text>Error authenticating!</Text>
  }
  return (
    <UserContext.Provider value={user}>
      <Tabs
        // tabBar={ButtonTabs}
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
          },

          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
          }

        }}>
        <Tabs.Screen
          name="movies"
          options={{
            title: 'Movies',
            tabBarIcon: ({ color }) => <TabBarIcon name="film" color={color} />,
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: 'Account',
            tabBarIcon: ({ color }) => <TabBarIcon name="user-circle" color={color} />,
          }}
        />
      </Tabs>
    </UserContext.Provider >

  );
}
