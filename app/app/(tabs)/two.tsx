// Settings Screen - Samsung Health Style
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [dreamTracking, setDreamTracking] = useState(true);
  const [dataSync, setDataSync] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [autoGenerate, setAutoGenerate] = useState(true);

  const settingsData = {
    profile: {
      name: "Dream User",
      email: "user@dreamwave.com",
      memberSince: "January 2024"
    },
    stats: {
      totalDreams: 156,
      storiesGenerated: 42,
      gamesPlayed: 18,
      sleepHours: 1247
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.searchButton}>
              <Ionicons name="search" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton}>
              <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Profile Overview Card */}
          <View style={styles.overviewCard}>
            <View style={styles.profileHeader}>
              <View style={[styles.profileAvatar, { backgroundColor: '#4A90E2' }]}>
                <Ionicons name="person" size={32} color="#FFFFFF" />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{settingsData.profile.name}</Text>
                <Text style={styles.profileEmail}>{settingsData.profile.email}</Text>
                <Text style={styles.profileMember}>Member since {settingsData.profile.memberSince}</Text>
              </View>
              <TouchableOpacity style={styles.editButton}>
                <Ionicons name="create-outline" size={20} color="#4A90E2" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick Stats */}
          <View style={styles.statsCard}>
            <Text style={styles.sectionTitle}>Your Dream Stats</Text>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: '#9370DB' }]}>
                  <Ionicons name="moon" size={16} color="white" />
                </View>
                <Text style={styles.statValue}>{settingsData.stats.totalDreams}</Text>
                <Text style={styles.statLabel}>Total Dreams</Text>
              </View>

              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: '#FF69B4' }]}>
                  <Ionicons name="book" size={16} color="white" />
                </View>
                <Text style={styles.statValue}>{settingsData.stats.storiesGenerated}</Text>
                <Text style={styles.statLabel}>Stories</Text>
              </View>

              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: '#32CD32' }]}>
                  <Ionicons name="game-controller" size={16} color="white" />
                </View>
                <Text style={styles.statValue}>{settingsData.stats.gamesPlayed}</Text>
                <Text style={styles.statLabel}>Games</Text>
              </View>

              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: '#FFD93D' }]}>
                  <Ionicons name="time" size={16} color="white" />
                </View>
                <Text style={styles.statValue}>{Math.round(settingsData.stats.sleepHours / 24)}</Text>
                <Text style={styles.statLabel}>Sleep Days</Text>
              </View>
            </View>
          </View>

          {/* App Settings */}
          <View style={styles.settingsCard}>
            <Text style={styles.sectionTitle}>App Settings</Text>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <View style={[styles.settingIcon, { backgroundColor: '#FF6B6B' }]}>
                  <Ionicons name="notifications" size={20} color="white" />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Push Notifications</Text>
                  <Text style={styles.settingDescription}>Get notified about dream insights</Text>
                </View>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#333333', true: '#4A90E2' }}
                thumbColor={notifications ? '#FFFFFF' : '#999999'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <View style={[styles.settingIcon, { backgroundColor: '#9370DB' }]}>
                  <Ionicons name="bed" size={20} color="white" />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Dream Tracking</Text>
                  <Text style={styles.settingDescription}>Automatically track sleep patterns</Text>
                </View>
              </View>
              <Switch
                value={dreamTracking}
                onValueChange={setDreamTracking}
                trackColor={{ false: '#333333', true: '#4A90E2' }}
                thumbColor={dreamTracking ? '#FFFFFF' : '#999999'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <View style={[styles.settingIcon, { backgroundColor: '#32CD32' }]}>
                  <Ionicons name="sync" size={20} color="white" />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Data Sync</Text>
                  <Text style={styles.settingDescription}>Sync data across devices</Text>
                </View>
              </View>
              <Switch
                value={dataSync}
                onValueChange={setDataSync}
                trackColor={{ false: '#333333', true: '#4A90E2' }}
                thumbColor={dataSync ? '#FFFFFF' : '#999999'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <View style={[styles.settingIcon, { backgroundColor: '#FFD93D' }]}>
                  <Ionicons name="sparkles" size={20} color="white" />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Auto-Generate Content</Text>
                  <Text style={styles.settingDescription}>Create stories and games automatically</Text>
                </View>
              </View>
              <Switch
                value={autoGenerate}
                onValueChange={setAutoGenerate}
                trackColor={{ false: '#333333', true: '#4A90E2' }}
                thumbColor={autoGenerate ? '#FFFFFF' : '#999999'}
              />
            </View>
          </View>

          {/* Privacy & Data */}
          <View style={styles.settingsCard}>
            <Text style={styles.sectionTitle}>Privacy & Data</Text>
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <View style={[styles.menuIcon, { backgroundColor: '#74C0FC' }]}>
                  <Ionicons name="shield-checkmark" size={20} color="white" />
                </View>
                <View style={styles.menuText}>
                  <Text style={styles.menuTitle}>Privacy Policy</Text>
                  <Text style={styles.menuDescription}>How we protect your data</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#666666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <View style={[styles.menuIcon, { backgroundColor: '#FF9F43' }]}>
                  <Ionicons name="download" size={20} color="white" />
                </View>
                <View style={styles.menuText}>
                  <Text style={styles.menuTitle}>Export Data</Text>
                  <Text style={styles.menuDescription}>Download your dream data</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#666666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <View style={[styles.menuIcon, { backgroundColor: '#FF6B6B' }]}>
                  <Ionicons name="trash" size={20} color="white" />
                </View>
                <View style={styles.menuText}>
                  <Text style={styles.menuTitle}>Delete Account</Text>
                  <Text style={styles.menuDescription}>Permanently remove your account</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#666666" />
            </TouchableOpacity>
          </View>

          {/* Support & Help */}
          <View style={styles.settingsCard}>
            <Text style={styles.sectionTitle}>Support & Help</Text>
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <View style={[styles.menuIcon, { backgroundColor: '#4A90E2' }]}>
                  <Ionicons name="help-circle" size={20} color="white" />
                </View>
                <View style={styles.menuText}>
                  <Text style={styles.menuTitle}>Help Center</Text>
                  <Text style={styles.menuDescription}>Get answers to common questions</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#666666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <View style={[styles.menuIcon, { backgroundColor: '#98D8C8' }]}>
                  <Ionicons name="chatbubbles" size={20} color="white" />
                </View>
                <View style={styles.menuText}>
                  <Text style={styles.menuTitle}>Contact Support</Text>
                  <Text style={styles.menuDescription}>Get help from our team</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#666666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <View style={[styles.menuIcon, { backgroundColor: '#9370DB' }]}>
                  <Ionicons name="star" size={20} color="white" />
                </View>
                <View style={styles.menuText}>
                  <Text style={styles.menuTitle}>Rate App</Text>
                  <Text style={styles.menuDescription}>Help us improve DreamWave</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#666666" />
            </TouchableOpacity>
          </View>

          {/* About */}
          <View style={styles.aboutCard}>
            <Text style={styles.aboutTitle}>DreamWave Sleep</Text>
            <Text style={styles.aboutVersion}>Version 1.0.0</Text>
            <Text style={styles.aboutDescription}>
              Transform your dreams into interactive stories and games with advanced AI-powered sleep analysis.
            </Text>
            
            <View style={styles.aboutLinks}>
              <TouchableOpacity style={styles.aboutLink}>
                <Text style={styles.aboutLinkText}>Terms of Service</Text>
              </TouchableOpacity>
              <Text style={styles.aboutSeparator}>•</Text>
              <TouchableOpacity style={styles.aboutLink}>
                <Text style={styles.aboutLinkText}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchButton: {
    padding: 8,
  },
  menuButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  overviewCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 2,
  },
  profileMember: {
    fontSize: 12,
    color: '#999999',
  },
  editButton: {
    padding: 8,
  },
  statsCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#999999',
  },
  settingsCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: '#999999',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 12,
    color: '#999999',
  },
  aboutCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  aboutVersion: {
    fontSize: 14,
    color: '#4A90E2',
    marginBottom: 12,
  },
  aboutDescription: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  aboutLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aboutLink: {
    paddingVertical: 4,
  },
  aboutLinkText: {
    fontSize: 12,
    color: '#4A90E2',
  },
  aboutSeparator: {
    fontSize: 12,
    color: '#666666',
    marginHorizontal: 8,
  },
});