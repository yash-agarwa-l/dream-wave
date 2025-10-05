// 4. Add Settings Screen - app/settings.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  useColorScheme,
  AppState,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_PREFERENCE_KEY = 'dreamwave_theme_preference';

export default function SettingsScreen() {
  const systemColorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(systemColorScheme === 'dark');
  const [useSystemTheme, setUseSystemTheme] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [dreamAnalysis, setDreamAnalysis] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  // Load saved theme preferences
  useEffect(() => {
    const loadThemePreferences = async () => {
      try {
        const themePreference = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
        if (themePreference) {
          const { darkMode: savedDarkMode, useSystemTheme: savedUseSystemTheme } = JSON.parse(themePreference);
          setUseSystemTheme(savedUseSystemTheme);
          setDarkMode(savedUseSystemTheme ? systemColorScheme === 'dark' : savedDarkMode);
        }
      } catch (error) {
        console.log('Error loading theme preferences:', error);
      }
    };
    
    loadThemePreferences();
  }, [systemColorScheme]);

  // Monitor system theme changes
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active' && useSystemTheme) {
        setDarkMode(systemColorScheme === 'dark');
      }
    });

    return () => {
      subscription.remove();
    };
  }, [systemColorScheme, useSystemTheme]);

  // Save theme preferences
  const toggleDarkMode = async (value: boolean) => {
    setDarkMode(value);
    try {
      await AsyncStorage.setItem(
        THEME_PREFERENCE_KEY,
        JSON.stringify({ darkMode: value, useSystemTheme: false })
      );
      setUseSystemTheme(false);
    } catch (error) {
      console.log('Error saving theme preference:', error);
    }
  };

  // Toggle using system theme
  const toggleUseSystemTheme = async (value: boolean) => {
    setUseSystemTheme(value);
    if (value) {
      setDarkMode(systemColorScheme === 'dark');
    }
    try {
      await AsyncStorage.setItem(
        THEME_PREFERENCE_KEY,
        JSON.stringify({ darkMode: value ? systemColorScheme === 'dark' : darkMode, useSystemTheme: value })
      );
    } catch (error) {
      console.log('Error saving system theme preference:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => {
          // Handle logout logic
          Alert.alert('Logged out', 'You have been logged out successfully');
        }}
      ]
    );
  };

  return (
    <SafeAreaView className={`flex-1 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <View className={`${darkMode ? 'bg-gray-800' : 'bg-white'} px-6 py-4 shadow-sm`}>
        <View className="flex-row items-center">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="mr-4 p-2"
          >
            <Ionicons name="arrow-back" size={24} color={darkMode ? '#ffffff' : '#374151'} />
          </TouchableOpacity>
          <Text className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Settings</Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Profile Section */}
        <View className="mx-4 mt-6">
          <View className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-sm`}>
            <View className="flex-row items-center">
              <View className="w-16 h-16 bg-primary-100 rounded-full items-center justify-center">
                <Ionicons name="person" size={32} color="#6366f1" />
              </View>
              <View className="ml-4 flex-1">
                <Text className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Dream Explorer</Text>
                <Text className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>dreamexplorer@example.com</Text>
              </View>
              <TouchableOpacity className="p-2">
                <Ionicons name="chevron-forward" size={20} color={darkMode ? '#9ca3af' : '#9ca3af'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* App Settings */}
        <View className="mx-4 mt-6">
          <Text className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>App Settings</Text>
          <View className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-sm overflow-hidden`}>
            
            {/* Use System Theme */}
            <View className={`flex-row items-center justify-between px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <View className="flex-row items-center flex-1">
                <Ionicons name="phone-portrait" size={20} color="#6366f1" />
                <View className="ml-3">
                  <Text className={`${darkMode ? 'text-white' : 'text-gray-900'} font-medium`}>Use System Theme</Text>
                  <Text className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Follow device settings</Text>
                </View>
              </View>
              <Switch
                value={useSystemTheme}
                onValueChange={toggleUseSystemTheme}
                trackColor={{ false: darkMode ? '#4b5563' : '#e5e7eb', true: '#6366f1' }}
                thumbColor={Platform.OS === 'ios' ? '' : '#ffffff'}
              />
            </View>
            
            {/* Dark Mode - Only enabled if system theme is off */}
            <View className={`flex-row items-center justify-between px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'} ${useSystemTheme ? 'opacity-50' : ''}`}>
              <View className="flex-row items-center flex-1">
                <Ionicons name="moon" size={20} color="#6366f1" />
                <View className="ml-3">
                  <Text className={`${darkMode ? 'text-white' : 'text-gray-900'} font-medium`}>Dark Mode</Text>
                  <Text className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Enable dark theme</Text>
                </View>
              </View>
              <Switch
                disabled={useSystemTheme}
                value={darkMode}
                onValueChange={toggleDarkMode}
                trackColor={{ false: darkMode ? '#4b5563' : '#e5e7eb', true: '#6366f1' }}
                thumbColor={Platform.OS === 'ios' ? '' : '#ffffff'}
              />
            </View>

            {/* Notifications */}
            <View className={`flex-row items-center justify-between px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <View className="flex-row items-center flex-1">
                <Ionicons name="notifications" size={20} color="#6366f1" />
                <View className="ml-3">
                  <Text className={`${darkMode ? 'text-white' : 'text-gray-900'} font-medium`}>Dream Notifications</Text>
                  <Text className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Get notified when dreams are detected</Text>
                </View>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: darkMode ? '#4b5563' : '#e5e7eb', true: '#6366f1' }}
                thumbColor={Platform.OS === 'ios' ? '' : '#ffffff'}
              />
            </View>

            {/* Dream Analysis */}
            <View className={`flex-row items-center justify-between px-6 py-4 ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <View className="flex-row items-center flex-1">
                <Ionicons name="analytics" size={20} color="#6366f1" />
                <View className="ml-3">
                  <Text className={`${darkMode ? 'text-white' : 'text-gray-900'} font-medium`}>AI Dream Analysis</Text>
                  <Text className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Enable advanced dream interpretation</Text>
                </View>
              </View>
              <Switch
                value={dreamAnalysis}
                onValueChange={setDreamAnalysis}
                trackColor={{ false: darkMode ? '#4b5563' : '#e5e7eb', true: '#6366f1' }}
                thumbColor={Platform.OS === 'ios' ? '' : '#ffffff'}
              />
            </View>
          </View>
        </View>

        {/* Privacy Settings */}
        <View className="mx-4 mt-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Privacy & Data</Text>
          <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
            
            {/* Data Sharing */}
            <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-100">
              <View className="flex-row items-center flex-1">
                <Ionicons name="share" size={20} color="#6366f1" />
                <View className="ml-3">
                  <Text className="text-gray-900 font-medium">Anonymous Data Sharing</Text>
                  <Text className="text-gray-500 text-sm">Help improve DreamWave AI</Text>
                </View>
              </View>
              <Switch
                value={dataSharing}
                onValueChange={setDataSharing}
                trackColor={{ false: '#e5e7eb', true: '#6366f1' }}
                thumbColor={dataSharing ? '#ffffff' : '#ffffff'}
              />
            </View>

            {/* Privacy Policy */}
            <TouchableOpacity className="flex-row items-center px-6 py-4 border-b border-gray-100">
              <Ionicons name="shield-checkmark" size={20} color="#6366f1" />
              <View className="ml-3 flex-1">
                <Text className="text-gray-900 font-medium">Privacy Policy</Text>
                <Text className="text-gray-500 text-sm">View our privacy policy</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            {/* Data Export */}
            <TouchableOpacity className="flex-row items-center px-6 py-4">
              <Ionicons name="download" size={20} color="#6366f1" />
              <View className="ml-3 flex-1">
                <Text className="text-gray-900 font-medium">Export My Data</Text>
                <Text className="text-gray-500 text-sm">Download your dream data</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>

        {/* About Section */}
        <View className="mx-4 mt-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">About</Text>
          <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
            
            <TouchableOpacity className="flex-row items-center px-6 py-4 border-b border-gray-100">
              <Ionicons name="information-circle" size={20} color="#6366f1" />
              <View className="ml-3 flex-1">
                <Text className="text-gray-900 font-medium">App Version</Text>
                <Text className="text-gray-500 text-sm">1.0.0 (Build 1)</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center px-6 py-4 border-b border-gray-100">
              <Ionicons name="help-circle" size={20} color="#6366f1" />
              <View className="ml-3 flex-1">
                <Text className="text-gray-900 font-medium">Help & Support</Text>
                <Text className="text-gray-500 text-sm">Get help with DreamWave AI</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center px-6 py-4">
              <Ionicons name="star" size={20} color="#6366f1" />
              <View className="ml-3 flex-1">
                <Text className="text-gray-900 font-medium">Rate DreamWave AI</Text>
                <Text className="text-gray-500 text-sm">Share your feedback</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Game Integration Section */}
        <View className="mx-4 mt-6">
          <Text className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Game Integration</Text>
          <View className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-sm overflow-hidden`}>
            <TouchableOpacity className={`flex-row items-center px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <Ionicons name="game-controller" size={20} color="#6366f1" />
              <View className="ml-3 flex-1">
                <Text className={`${darkMode ? 'text-white' : 'text-gray-900'} font-medium`}>External Game Sources</Text>
                <Text className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Connect to Unity or other game engines</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={darkMode ? '#9ca3af' : '#9ca3af'} />
            </TouchableOpacity>
            
            <TouchableOpacity className={`flex-row items-center px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <Ionicons name="build" size={20} color="#6366f1" />
              <View className="ml-3 flex-1">
                <Text className={`${darkMode ? 'text-white' : 'text-gray-900'} font-medium`}>Developer Mode</Text>
                <Text className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Access game creation tools</Text>
              </View>
              <Switch
                value={false}
                onValueChange={() => Alert.alert("Developer Mode", "This feature will be available in a future update.")}
                trackColor={{ false: darkMode ? '#4b5563' : '#e5e7eb', true: '#6366f1' }}
                thumbColor={Platform.OS === 'ios' ? '' : '#ffffff'}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <View className="mx-4 mt-6 mb-8">
          <TouchableOpacity 
            onPress={handleLogout}
            className="bg-red-50 rounded-2xl p-4 border border-red-200"
          >
            <View className="flex-row items-center justify-center">
              <Ionicons name="log-out" size={20} color="#ef4444" />
              <Text className="ml-3 text-red-600 font-medium">Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}