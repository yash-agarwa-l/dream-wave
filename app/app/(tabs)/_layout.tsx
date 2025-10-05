// app/(tabs)/_layout.tsx (Samsung Health Style)
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#4A90E2', // Samsung Health blue
        tabBarInactiveTintColor: '#666666',
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'rgba(26, 26, 26, 0.9)', // Dark with transparency
            borderTopWidth: 1,
            borderTopColor: '#333333',
            elevation: 0,
            height: 84,
            paddingTop: 8,
            paddingBottom: 20,
          },
          default: {
            backgroundColor: '#1A1A1A', // Dark background
            borderTopWidth: 1,
            borderTopColor: '#333333',
            elevation: 8,
            height: 60,
            paddingTop: 8,
            paddingBottom: 8,
          },
        }),
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            <BlurView
              intensity={80}
              tint="dark"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                backgroundColor: 'rgba(26, 26, 26, 0.8)',
              }}
            />
          ) : null,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 2,
        },
        tabBarItemStyle: {
          paddingTop: 4,
          paddingBottom: Platform.OS === 'ios' ? 0 : 4,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          
          // Adjust icon size for better visual hierarchy
          const iconSize = focused ? size + 2 : size;

          if (route.name === 'index') {
            iconName = focused ? 'analytics' : 'analytics-outline';
          } else if (route.name === 'storyline') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'gameplay') {
            iconName = focused ? 'game-controller' : 'game-controller-outline';
          } else if (route.name === 'journal') {
            iconName = focused ? 'journal' : 'journal-outline';
          } else {
            iconName = 'ellipse-outline';
          }

          return (
            <Ionicons 
              name={iconName} 
              size={iconSize} 
              color={color}
              style={{
                marginBottom: Platform.OS === 'ios' ? 0 : 2,
              }}
            />
          );
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarBadge: undefined, // Can be used for notifications
        }}
      />
      <Tabs.Screen
        name="storyline"
        options={{
          title: 'Stories',
          tabBarLabel: 'Stories',
        }}
      />
      <Tabs.Screen
        name="gameplay"
        options={{
          title: 'Games',
          tabBarLabel: 'Games',
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: 'Journal',
          tabBarLabel: 'Journal',
        }}
      />
    </Tabs>
  );
}