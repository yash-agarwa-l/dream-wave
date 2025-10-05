// app/(tabs)/index.tsx (Dashboard Screen - Samsung Health Style)
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { mockDataService } from '../../src/services/mockDataService.js';

const { width: screenWidth } = Dimensions.get('window');

export default function DashboardScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [liveData, setLiveData] = useState(mockDataService.generateLiveSleepData());
  const [dreamData, setDreamData] = useState(mockDataService.generateDreamDetectionData());

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setLiveData(mockDataService.generateLiveSleepData());
      setDreamData(mockDataService.generateDreamDetectionData());
      setRefreshing(false);
    }, 1000);
  }, []);

  // Auto-refresh every 5 seconds (ORIGINAL FEATURE)
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(mockDataService.generateLiveSleepData());
      setDreamData(mockDataService.generateDreamDetectionData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>DreamWave Sleep</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.starButton}>
              <Ionicons name="star-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => router.push('/settings')}
              style={styles.menuButton}
            >
              <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Main Sleep Tracking Card */}
          <View style={styles.mainCard}>
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <Ionicons name="bed" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.cardTitleContainer}>
                <Text style={styles.cardTitle}>Sleep Tracking</Text>
                <Text style={styles.cardSubtitle}>Advanced sleep monitoring</Text>
              </View>
              <View style={styles.cardRight}>
                <TouchableOpacity style={styles.helpButton}>
                  <Text style={styles.helpButtonText}>?</Text>
                </TouchableOpacity>
                <View style={styles.progressContainer}>
                  <View style={[styles.progressBar, { width: `${dreamData.confidence * 100}%` }]} />
                </View>
              </View>
            </View>
          </View>

          {/* Live Metrics Card */}
          <View style={styles.mainCard}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconContainer, { backgroundColor: '#4A90E2' }]}>
                <Ionicons name="pulse" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.cardTitleContainer}>
                <Text style={styles.cardTitle}>Live Metrics</Text>
                <Text style={styles.cardSubtitle}>Real-time sleep data</Text>
              </View>
              <View style={styles.cardRight}>
                <TouchableOpacity style={styles.helpButton}>
                  <Text style={styles.helpButtonText}>?</Text>
                </TouchableOpacity>
                <View style={styles.progressContainer}>
                  <View style={[styles.progressBar, { width: '75%', backgroundColor: '#4A90E2' }]} />
                </View>
              </View>
            </View>
          </View>

          {/* Sleep Analysis Categories */}
          <View style={styles.categoriesContainer}>
            <TouchableOpacity style={[styles.categoryCard, { backgroundColor: '#8B4513' }]}>
              <View style={styles.categoryIcon}>
                <Ionicons name="analytics" size={32} color="#FFA500" />
              </View>
              <Text style={styles.categoryTitle}>Sleep{'\n'}Analysis</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.categoryCard, { backgroundColor: '#4A4A8A' }]}>
              <View style={styles.categoryIcon}>
                <Ionicons name="moon" size={32} color="#9370DB" />
              </View>
              <Text style={styles.categoryTitle}>Dream{'\n'}Detection</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.categoryCard, { backgroundColor: '#2F5F5F' }]}>
              <View style={styles.categoryIcon}>
                <Ionicons name="heart" size={32} color="#20B2AA" />
              </View>
              <Text style={styles.categoryTitle}>Heart Rate{'\n'}Monitor</Text>
            </TouchableOpacity>
          </View>

          {/* Weekly Progress Card */}
          <View style={styles.mainCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTime}>
                {(liveData.currentStatus.stageDuration / 60).toFixed(1)}h
              </Text>
              <Text style={styles.progressLabel}>Sleep this week</Text>
            </View>
            <Text style={styles.progressSubtext}>
              Track your sleep patterns to optimize rest
            </Text>
          </View>

          {/* Sleep Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <View style={[styles.statIcon, { backgroundColor: '#FF9F43' }]}>
                  <Ionicons name="bed" size={16} color="white" />
                </View>
                <Text style={styles.statTitle}>Sleep Duration</Text>
              </View>
              <Text style={styles.statValue}>
                {(liveData.currentStatus.stageDuration / 60).toFixed(1)} hrs
              </Text>
              <View style={styles.statProgress}>
                <View style={[styles.statProgressFill, { width: '80%', backgroundColor: '#FF9F43' }]} />
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <View style={[styles.statIcon, { backgroundColor: '#FF6B9D' }]}>
                  <Ionicons name="heart" size={16} color="white" />
                </View>
                <Text style={styles.statTitle}>Heart Rate</Text>
              </View>
              <Text style={styles.statValue}>
                {liveData.liveMetrics.heartRate || 72} BPM
              </Text>
              <View style={styles.statProgress}>
                <View style={[styles.statProgressFill, { width: '65%', backgroundColor: '#FF6B9D' }]} />
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <View style={[styles.statIcon, { backgroundColor: '#74C0FC' }]}>
                  <Ionicons name="analytics" size={16} color="white" />
                </View>
                <Text style={styles.statTitle}>Sleep Quality</Text>
              </View>
              <Text style={styles.statValue}>8.2/10</Text>
              <View style={styles.statProgress}>
                <View style={[styles.statProgressFill, { width: '82%', backgroundColor: '#74C0FC' }]} />
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <View style={[styles.statIcon, { backgroundColor: '#9370DB' }]}>
                  <Ionicons name="sparkles" size={16} color="white" />
                </View>
                <Text style={styles.statTitle}>Dream Score</Text>
              </View>
              <Text style={styles.statValue}>
                {(dreamData.confidence * 100).toFixed(0)}%
              </Text>
              <View style={styles.statProgress}>
                <View style={[styles.statProgressFill, { width: `${dreamData.confidence * 100}%`, backgroundColor: '#9370DB' }]} />
              </View>
            </View>
          </View>

          {/* Sleep Optimization Card */}
          <View style={styles.mainCard}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconContainer, { backgroundColor: '#32CD32' }]}>
                <Ionicons name="leaf" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.cardTitleContainer}>
                <Text style={styles.cardTitle}>Sleep Optimization</Text>
                <Text style={styles.cardSubtitle}>Improve sleep quality</Text>
              </View>
              <View style={styles.cardRight}>
                <TouchableOpacity style={styles.helpButton}>
                  <Text style={styles.helpButtonText}>?</Text>
                </TouchableOpacity>
                <View style={styles.progressContainer}>
                  <View style={[styles.progressBar, { width: '90%', backgroundColor: '#32CD32' }]} />
                </View>
              </View>
            </View>
          </View>

          {/* Content Generation Progress */}
          <View style={styles.mainCard}>
            <Text style={styles.sectionTitle}>Content Generation Progress</Text>
            {mockDataService.generateContentQueue().map((item, index) => (
              <View key={index} style={styles.contentItem}>
                <View style={styles.contentHeader}>
                  <Text style={styles.contentItemTitle}>{item.title}</Text>
                  <Text style={styles.contentStatus}>{item.status}</Text>
                </View>
                {item.progress && (
                  <View style={styles.contentProgressContainer}>
                    <View style={[styles.contentProgressFill, { 
                      width: `${item.progress}%`,
                      backgroundColor: ['#FF6B6B', '#74C0FC', '#FFD93D'][index % 3]
                    }]} />
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* Sleep Recommendations */}
          <View style={styles.mainCard}>
            <Text style={styles.sectionTitle}>Sleep Recommendations</Text>
            
            <View style={styles.recommendationItem}>
              <View style={[styles.recommendationIcon, { backgroundColor: '#FF6B6B' }]}>
                <Ionicons name="thermometer" size={16} color="white" />
              </View>
              <View style={styles.recommendationContent}>
                <Text style={styles.recommendationTitle}>Optimize Environment</Text>
                <Text style={styles.recommendationText}>
                  Cool temperature and darkness for better sleep
                </Text>
              </View>
              <View style={styles.recommendationProgress}>
                <View style={[styles.recommendationProgressFill, { width: '70%', backgroundColor: '#FF6B6B' }]} />
              </View>
            </View>

            <View style={styles.recommendationItem}>
              <View style={[styles.recommendationIcon, { backgroundColor: '#74C0FC' }]}>
                <Ionicons name="time" size={16} color="white" />
              </View>
              <View style={styles.recommendationContent}>
                <Text style={styles.recommendationTitle}>REM Cycle Tracking</Text>
                <Text style={styles.recommendationText}>
                  Monitor deep sleep phases for better recovery
                </Text>
              </View>
              <View style={styles.recommendationProgress}>
                <View style={[styles.recommendationProgressFill, { width: '85%', backgroundColor: '#74C0FC' }]} />
              </View>
            </View>
          </View>

          {/* Weekly Sleep Chart */}
          <View style={styles.mainCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.sectionTitle}>Weekly Sleep Pattern</Text>
              
              {/* Time Period Selector */}
              <View style={styles.periodSelector}>
                <TouchableOpacity style={[styles.periodButton, styles.activePeriod]}>
                  <Text style={styles.activePeriodText}>Week</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.periodButton}>
                  <Text style={styles.periodButtonText}>Month</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.periodButton}>
                  <Text style={styles.periodButtonText}>Quarter</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Chart */}
            <View style={styles.chartContainer}>
              <View style={styles.weekDays}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                  <View key={index} style={styles.dayColumn}>
                    <Text style={styles.dayLabel}>{day}</Text>
                    <View style={styles.dayBar}>
                      {index === 3 ? (
                        <View style={styles.activeDay}>
                          <Text style={styles.activeDayValue}>
                            {(liveData.currentStatus.stageDuration / 60).toFixed(1)}
                          </Text>
                        </View>
                      ) : (
                        <View style={styles.inactiveDay} />
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Sleep Quality Legend */}
            <View style={styles.qualityLegend}>
              <View style={styles.qualityRow}>
                <View style={[styles.qualityDot, { backgroundColor: '#FF6B6B' }]} />
                <Text style={styles.qualityText}>Good</Text>
                <View style={[styles.qualityDot, { backgroundColor: '#FFD93D' }]} />
                <Text style={styles.qualityText}>No disruption</Text>
              </View>
              <View style={styles.qualityRow}>
                <View style={[styles.qualityDot, { backgroundColor: '#74C0FC' }]} />
                <Text style={styles.qualityText}>REM phase</Text>
                <View style={[styles.qualityDot, { backgroundColor: '#98D8C8' }]} />
                <Text style={styles.qualityText}>Dream detected</Text>
              </View>
            </View>
          </View>

          {/* Sleep Performance Rankings */}
          <View style={styles.mainCard}>
            <Text style={styles.sectionTitle}>Sleep Performance Rankings</Text>
            
            <View style={styles.tabSelector}>
              <TouchableOpacity style={[styles.tab, styles.activeTab]}>
                <Text style={styles.activeTabText}>Rankings</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tab}>
                <Text style={styles.tabText}>Activity</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.rankingItem}>
              <View style={styles.rankBadge}>
                <Text style={styles.rankNumber}>1</Text>
              </View>
              <View style={styles.userAvatar}>
                <Ionicons name="person" size={20} color="#FF9F43" />
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>You</Text>
                <Text style={styles.userScore}>Score: {(dreamData.confidence * 1000).toFixed(0)} pts</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#999" />
            </View>

            <View style={styles.performanceStats}>
              <View style={styles.performanceItem}>
                <Text style={styles.performanceValue}>
                  {liveData.currentStatus.stageDuration}h
                </Text>
                <Text style={styles.performanceLabel}>Sleep</Text>
              </View>
              <View style={styles.performanceItem}>
                <Text style={styles.performanceValue}>
                  {(dreamData.confidence * 10).toFixed(1)}
                </Text>
                <Text style={styles.performanceLabel}>Dreams</Text>
              </View>
              <View style={styles.performanceItem}>
                <Text style={styles.performanceValue}>
                  {liveData.liveMetrics.heartRate || 72}
                </Text>
                <Text style={styles.performanceLabel}>Avg HR</Text>
              </View>
              <View style={styles.performanceItem}>
                <Text style={styles.performanceValue}>8.2</Text>
                <Text style={styles.performanceLabel}>Quality</Text>
              </View>
            </View>
          </View>

          {/* Action Button */}
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Check Your Sleep Patterns</Text>
          </TouchableOpacity>
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
  starButton: {
    padding: 8,
  },
  menuButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  mainCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#4A4A4A',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#999999',
  },
  cardRight: {
    alignItems: 'flex-end',
    gap: 8,
  },
  helpButton: {
    backgroundColor: '#2A5A5A',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  progressContainer: {
    width: 80,
    height: 6,
    backgroundColor: '#333333',
    borderRadius: 3,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 3,
  },
  categoriesContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  categoryCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  categoryIcon: {
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 18,
  },
  progressHeader: {
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTime: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  progressLabel: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 8,
  },
  progressSubtext: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    width: '48%',
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  statTitle: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  statProgress: {
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
  },
  statProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  chartHeader: {
    marginBottom: 20,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 2,
    marginTop: 12,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 6,
  },
  activePeriod: {
    backgroundColor: '#FFFFFF',
  },
  activePeriodText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 12,
  },
  periodButtonText: {
    color: '#999999',
    fontWeight: '500',
    fontSize: 12,
  },
  chartContainer: {
    marginBottom: 20,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 100,
  },
  dayColumn: {
    alignItems: 'center',
    flex: 1,
  },
  dayLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 8,
  },
  dayBar: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 20,
  },
  activeDay: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 35,
    width: 20,
  },
  activeDayValue: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  inactiveDay: {
    backgroundColor: '#333333',
    borderRadius: 6,
    height: 15,
    width: 12,
  },
  qualityLegend: {
    gap: 8,
  },
  qualityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  qualityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  qualityText: {
    fontSize: 11,
    color: '#999999',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  tabSelector: {
    flexDirection: 'row',
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 2,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  activeTabText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 12,
  },
  tabText: {
    color: '#999999',
    fontWeight: '500',
    fontSize: 12,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  rankBadge: {
    backgroundColor: '#FFD93D',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
  },
  userAvatar: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  userScore: {
    fontSize: 11,
    color: '#999999',
  },
  performanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  performanceItem: {
    alignItems: 'center',
  },
  performanceValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  performanceLabel: {
    fontSize: 10,
    color: '#999999',
    marginTop: 2,
  },
  contentItem: {
    marginBottom: 12,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  contentItemTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  contentStatus: {
    fontSize: 11,
    color: '#999999',
  },
  contentProgressContainer: {
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
  },
  contentProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  recommendationIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  recommendationContent: {
    flex: 1,
    marginRight: 12,
  },
  recommendationTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  recommendationText: {
    fontSize: 11,
    color: '#999999',
    lineHeight: 14,
  },
  recommendationProgress: {
    width: 60,
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
  },
  recommendationProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  actionButton: {
    backgroundColor: '#2A5A5A',
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});