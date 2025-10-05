// app/(tabs)/journal.tsx (Journal Screen - Samsung Health Style)
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { mockDataService } from '../../src/services/mockDataService';

const { width: screenWidth } = Dimensions.get('window');

export default function JournalScreen() {
  const [dreamHistory] = useState(mockDataService.generateDreamHistory());
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const getEmotionIcon = (emotion) => {
    const icons = {
      anxiety: 'alert-circle',
      joy: 'happy',
      fear: 'warning',
      excitement: 'flash',
      curiosity: 'search',
      sadness: 'sad',
    };
    return icons[emotion] || 'help-circle';
  };

  const getEmotionColor = (emotion) => {
    const colors = {
      anxiety: '#FF6B6B',
      joy: '#32CD32',
      fear: '#FF9F43',
      excitement: '#9370DB',
      curiosity: '#74C0FC',
      sadness: '#4A90E2',
    };
    return colors[emotion] || '#999999';
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Dream Journal</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.calendarButton}>
              <Ionicons name="calendar" size={24} color="#FFFFFF" />
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
          {/* Journal Overview Card */}
          <View style={styles.overviewCard}>
            <View style={styles.overviewHeader}>
              <View style={[styles.overviewIcon, { backgroundColor: '#9370DB' }]}>
                <Ionicons name="journal" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.overviewContent}>
                <Text style={styles.overviewTitle}>Dream Journal</Text>
                <Text style={styles.overviewSubtitle}>Sleep and dream insights</Text>
              </View>
              <View style={styles.overviewRight}>
                <TouchableOpacity style={styles.helpButton}>
                  <Text style={styles.helpButtonText}>?</Text>
                </TouchableOpacity>
                <View style={styles.progressContainer}>
                  <View style={[styles.progressBar, { 
                    width: `${(dreamHistory.length / 30) * 100}%`,
                    backgroundColor: '#9370DB'
                  }]} />
                </View>
              </View>
            </View>
          </View>

          {/* Period Selector */}
          <View style={styles.periodCard}>
            <Text style={styles.sectionTitle}>Time Period</Text>
            <View style={styles.periodSelector}>
              {['week', 'month', 'year'].map((period) => (
                <TouchableOpacity
                  key={period}
                  onPress={() => setSelectedPeriod(period)}
                  style={[
                    styles.periodButton,
                    selectedPeriod === period && styles.activePeriod
                  ]}
                >
                  <Text style={[
                    styles.periodButtonText,
                    selectedPeriod === period && styles.activePeriodText
                  ]}>
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Journal Statistics */}
          <View style={styles.statsCard}>
            <Text style={styles.sectionTitle}>Journal Statistics</Text>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: '#9370DB' }]}>
                  <Ionicons name="journal" size={16} color="white" />
                </View>
                <Text style={styles.statLabel}>Total Entries</Text>
                <Text style={styles.statValue}>{dreamHistory.length}</Text>
              </View>

              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: '#32CD32' }]}>
                  <Ionicons name="moon" size={16} color="white" />
                </View>
                <Text style={styles.statLabel}>Dreams Recorded</Text>
                <Text style={styles.statValue}>
                  {dreamHistory.reduce((sum, entry) => sum + entry.dreamsCount, 0)}
                </Text>
              </View>

              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: '#FFD93D' }]}>
                  <Ionicons name="star" size={16} color="white" />
                </View>
                <Text style={styles.statLabel}>Avg Rating</Text>
                <Text style={styles.statValue}>
                  {(dreamHistory.reduce((sum, entry) => sum + entry.userRating, 0) / dreamHistory.length).toFixed(1)}
                </Text>
              </View>

              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: '#74C0FC' }]}>
                  <Ionicons name="time" size={16} color="white" />
                </View>
                <Text style={styles.statLabel}>Total REM</Text>
                <Text style={styles.statValue}>
                  {dreamHistory.reduce((sum, entry) => sum + entry.totalRem, 0)}m
                </Text>
              </View>
            </View>
          </View>

          {/* Dream History */}
          <View style={styles.historyCard}>
            <Text style={styles.sectionTitle}>Recent Dream Entries</Text>
            
            {dreamHistory.map((entry, index) => (
              <View key={index} style={styles.dreamEntry}>
                <View style={styles.entryHeader}>
                  <View style={styles.entryDateContainer}>
                    <Text style={styles.entryDate}>
                      {new Date(entry.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </Text>
                    <View style={styles.entryRating}>
                      <Ionicons name="star" size={12} color="#FFD93D" />
                      <Text style={styles.ratingText}>{entry.userRating}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.entryMetrics}>
                    <Text style={styles.metricText}>{entry.dreamsCount} dreams</Text>
                    <Text style={styles.metricSeparator}>•</Text>
                    <Text style={styles.metricText}>{entry.totalRem}min REM</Text>
                  </View>
                </View>

                <View style={styles.emotionSection}>
                  <View style={styles.emotionContainer}>
                    <View style={[styles.emotionIcon, { 
                      backgroundColor: getEmotionColor(entry.dominantEmotion) 
                    }]}>
                      <Ionicons 
                        name={getEmotionIcon(entry.dominantEmotion)} 
                        size={14} 
                        color="#FFFFFF" 
                      />
                    </View>
                    <Text style={styles.emotionText}>
                      {entry.dominantEmotion.charAt(0).toUpperCase() + entry.dominantEmotion.slice(1)}
                    </Text>
                  </View>
                </View>

                <View style={styles.themesSection}>
                  <Text style={styles.themesLabel}>Dream Themes:</Text>
                  <View style={styles.themesContainer}>
                    {entry.themes.map((theme, themeIndex) => (
                      <View key={themeIndex} style={styles.themeTag}>
                        <Text style={styles.themeText}>
                          {theme.replace('_', ' ')}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.contentSection}>
                  <Text style={styles.contentLabel}>Generated Content</Text>
                  <View style={styles.contentGrid}>
                    <View style={styles.contentItem}>
                      <Ionicons name="book" size={14} color="#74C0FC" />
                      <Text style={styles.contentCount}>{entry.contentGenerated.stories}</Text>
                      <Text style={styles.contentType}>Stories</Text>
                    </View>
                    <View style={styles.contentItem}>
                      <Ionicons name="game-controller" size={14} color="#9370DB" />
                      <Text style={styles.contentCount}>{entry.contentGenerated.games}</Text>
                      <Text style={styles.contentType}>Games</Text>
                    </View>
                    <View style={styles.contentItem}>
                      <Ionicons name="image" size={14} color="#FF9F43" />
                      <Text style={styles.contentCount}>{entry.contentGenerated.images}</Text>
                      <Text style={styles.contentType}>Images</Text>
                    </View>
                  </View>
                </View>

                {/* Entry Progress Bar */}
                <View style={styles.entryProgress}>
                  <View style={[styles.entryProgressFill, {
                    width: `${(entry.userRating / 5) * 100}%`,
                    backgroundColor: getEmotionColor(entry.dominantEmotion)
                  }]} />
                </View>
              </View>
            ))}
          </View>

          {/* Insights Card */}
          <View style={styles.insightsCard}>
            <Text style={styles.sectionTitle}>Dream Insights</Text>
            
            <View style={styles.insightItem}>
              <View style={[styles.insightIcon, { backgroundColor: '#32CD32' }]}>
                <Ionicons name="trending-up" size={16} color="white" />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Most Common Emotion</Text>
                <Text style={styles.insightText}>
                  Joy appears most frequently in your dreams
                </Text>
              </View>
            </View>

            <View style={styles.insightItem}>
              <View style={[styles.insightIcon, { backgroundColor: '#74C0FC' }]}>
                <Ionicons name="time" size={16} color="white" />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Sleep Pattern</Text>
                <Text style={styles.insightText}>
                  Your REM sleep averages {Math.round(dreamHistory.reduce((sum, entry) => sum + entry.totalRem, 0) / dreamHistory.length)} minutes
                </Text>
              </View>
            </View>

            <View style={styles.insightItem}>
              <View style={[styles.insightIcon, { backgroundColor: '#FF9F43' }]}>
                <Ionicons name="bulb" size={16} color="white" />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Content Creation</Text>
                <Text style={styles.insightText}>
                  Your dreams have generated {dreamHistory.reduce((sum, entry) => sum + entry.contentGenerated.stories + entry.contentGenerated.games + entry.contentGenerated.images, 0)} pieces of content
                </Text>
              </View>
            </View>
          </View>

          {/* Monthly Summary */}
          <View style={styles.summaryCard}>
            <Text style={styles.sectionTitle}>Monthly Summary</Text>
            
            <View style={styles.summaryGrid}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>28</Text>
                <Text style={styles.summaryLabel}>Days Tracked</Text>
                <View style={styles.summaryProgress}>
                  <View style={[styles.summaryProgressFill, { width: '93%', backgroundColor: '#32CD32' }]} />
                </View>
              </View>

              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>4.2</Text>
                <Text style={styles.summaryLabel}>Avg Quality</Text>
                <View style={styles.summaryProgress}>
                  <View style={[styles.summaryProgressFill, { width: '84%', backgroundColor: '#74C0FC' }]} />
                </View>
              </View>

              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>156</Text>
                <Text style={styles.summaryLabel}>Total Dreams</Text>
                <View style={styles.summaryProgress}>
                  <View style={[styles.summaryProgressFill, { width: '78%', backgroundColor: '#9370DB' }]} />
                </View>
              </View>

              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>89</Text>
                <Text style={styles.summaryLabel}>Content Items</Text>
                <View style={styles.summaryProgress}>
                  <View style={[styles.summaryProgressFill, { width: '89%', backgroundColor: '#FFD93D' }]} />
                </View>
              </View>
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
  calendarButton: {
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
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overviewIcon: {
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  overviewContent: {
    flex: 1,
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  overviewSubtitle: {
    fontSize: 12,
    color: '#999999',
  },
  overviewRight: {
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
    borderRadius: 3,
  },
  periodCard: {
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
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 2,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activePeriod: {
    backgroundColor: '#FFFFFF',
  },
  periodButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#999999',
  },
  activePeriodText: {
    color: '#000000',
    fontWeight: '600',
  },
  statsCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
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
  statLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  historyCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  dreamEntry: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  entryDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  entryDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  entryRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    color: '#CCCCCC',
  },
  entryMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricText: {
    fontSize: 12,
    color: '#999999',
  },
  metricSeparator: {
    fontSize: 12,
    color: '#666666',
    marginHorizontal: 6,
  },
  emotionSection: {
    marginBottom: 12,
  },
  emotionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emotionIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  emotionText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  themesSection: {
    marginBottom: 12,
  },
  themesLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 6,
  },
  themesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  themeTag: {
    backgroundColor: '#333333',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  themeText: {
    fontSize: 10,
    color: '#CCCCCC',
    textTransform: 'capitalize',
  },
  contentSection: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  contentLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 8,
  },
  contentGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentItem: {
    alignItems: 'center',
    gap: 4,
  },
  contentCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  contentType: {
    fontSize: 10,
    color: '#999999',
  },
  entryProgress: {
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
    marginTop: 12,
  },
  entryProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  insightsCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  insightIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  insightText: {
    fontSize: 12,
    color: '#999999',
    lineHeight: 16,
  },
  summaryCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  summaryItem: {
    width: '48%',
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 8,
  },
  summaryProgress: {
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
  },
  summaryProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
});