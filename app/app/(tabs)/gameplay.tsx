// app/(tabs)/gameplay.tsx (Games Screen - Samsung Health Style)
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { mockDataService } from '../../src/services/mockDataService';
import { gameIntegrationService } from '../../src/services/gameIntegrationService';
import { router } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');

export default function GameplayScreen() {
  const [games, setGames] = useState(mockDataService.generateGameContent());
  const [availableEngines, setAvailableEngines] = useState([]);

  useEffect(() => {
    // Check available game engines on component mount
    const engines = gameIntegrationService.getAvailableGameEngines();
    setAvailableEngines(engines);
  }, []);

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: '#32CD32',
      medium: '#FFD93D',
      hard: '#FF6B6B',
    };
    return colors[difficulty] || '#999999';
  };

  const handlePlayGame = async (game) => {
    try {
      if (game.title === 'Escape the Anxiety Maze') {
        // For the anxiety maze game, navigate to our React Native implementation
        router.push('/game');
      } else {
        // For other games, try to use external game engine
        if (availableEngines.length > 0) {
          // Prepare game data from dream parameters
          const gameData = {
            type: game.type,
            settings: { difficulty: game.difficulty },
            dreamParams: {
              intensity: Math.random() * 100,
              dominantEmotion: game.emotion,
              theme: game.type,
              elements: ['water', 'path', 'obstacle'],
              complexity: Math.floor(Math.random() * 10) + 1
            },
            seed: Date.now()
          };
          
          // Initialize the game engine
          const success = await gameIntegrationService.initializeGame(game.title.toLowerCase().replace(/\s/g, '_'), gameData);
          
          if (success) {
            gameIntegrationService.launchGame();
            
            // In a real implementation, we would render the Unity view or WebGL canvas
            // For now, we'll just show a mock result after a delay
            setTimeout(async () => {
              const result = await gameIntegrationService.getMockGameResult();
              Alert.alert(
                'Game Completed',
                `Score: ${result.score}\nInsight: ${result.insights[0]}`,
                [{ text: 'OK' }]
              );
            }, 2000);
          }
        } else {
          Alert.alert(
            'Game Engine Not Available',
            'No compatible game engine found. Please install the required components.',
            [{ text: 'OK' }]
          );
        }
      }
    } catch (error) {
      console.error('Error launching game:', error);
      Alert.alert('Error', 'Failed to launch game. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Dream Games</Text>
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
          {/* Games Overview Card */}
          <View style={styles.overviewCard}>
            <View style={styles.overviewHeader}>
              <View style={[styles.overviewIcon, { backgroundColor: '#9370DB' }]}>
                <Ionicons name="game-controller" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.overviewContent}>
                <Text style={styles.overviewTitle}>Dream Games</Text>
                <Text style={styles.overviewSubtitle}>Interactive experiences from dreams</Text>
              </View>
              <View style={styles.overviewRight}>
                <TouchableOpacity style={styles.helpButton}>
                  <Text style={styles.helpButtonText}>?</Text>
                </TouchableOpacity>
                <View style={styles.progressContainer}>
                  <View style={[styles.progressBar, { 
                    width: `${(games.filter(g => g.isCompleted).length / games.length) * 100}%`,
                    backgroundColor: '#9370DB'
                  }]} />
                </View>
              </View>
            </View>
          </View>

          {/* Game Statistics */}
          <View style={styles.statsCard}>
            <Text style={styles.sectionTitle}>Game Statistics</Text>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: '#9370DB' }]}>
                  <Ionicons name="game-controller" size={16} color="white" />
                </View>
                <Text style={styles.statLabel}>Total Games</Text>
                <Text style={styles.statValue}>{games.length}</Text>
              </View>

              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: '#32CD32' }]}>
                  <Ionicons name="checkmark-circle" size={16} color="white" />
                </View>
                <Text style={styles.statLabel}>Completed</Text>
                <Text style={styles.statValue}>{games.filter(g => g.isCompleted).length}</Text>
              </View>

              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: '#FFD93D' }]}>
                  <Ionicons name="star" size={16} color="white" />
                </View>
                <Text style={styles.statLabel}>Avg Rating</Text>
                <Text style={styles.statValue}>
                  {(games.reduce((sum, game) => sum + parseFloat(game.rating), 0) / games.length).toFixed(1)}
                </Text>
              </View>

              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: '#74C0FC' }]}>
                  <Ionicons name="trophy" size={16} color="white" />
                </View>
                <Text style={styles.statLabel}>High Score</Text>
                <Text style={styles.statValue}>95%</Text>
              </View>
            </View>
          </View>

          {/* Available Games */}
          <View style={styles.gamesCard}>
            <Text style={styles.sectionTitle}>Available Games</Text>
            
            {games.map((game, index) => (
              <View key={game.id} style={styles.gameCard}>
                <View style={styles.gameHeader}>
                  <View style={[styles.gameIcon, { 
                    backgroundColor: ['#FF9F43', '#9370DB', '#74C0FC', '#32CD32', '#FF6B9D'][index % 5]
                  }]}>
                    <Ionicons 
                      name={game.isCompleted ? "checkmark-circle" : "game-controller"} 
                      size={20} 
                      color="#FFFFFF" 
                    />
                  </View>
                  
                  <View style={styles.gameInfo}>
                    <View style={styles.gameTitleRow}>
                      <Text style={styles.gameTitle}>{game.title}</Text>
                      {game.isCompleted && (
                        <View style={styles.completedBadge}>
                          <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                        </View>
                      )}
                    </View>
                    <Text style={styles.gameType}>{game.type.replace('_', ' ').toUpperCase()}</Text>
                    <Text style={styles.gameDescription}>{game.description}</Text>
                  </View>
                </View>

                <View style={styles.gameDetails}>
                  <View style={styles.gameMetrics}>
                    <View style={styles.metricItem}>
                      <View style={[styles.difficultyDot, { 
                        backgroundColor: getDifficultyColor(game.difficulty) 
                      }]} />
                      <Text style={styles.metricText}>{game.difficulty}</Text>
                    </View>
                    
                    <View style={styles.metricItem}>
                      <Ionicons name="time" size={14} color="#999999" />
                      <Text style={styles.metricText}>{game.duration}</Text>
                    </View>
                    
                    <View style={styles.metricItem}>
                      <Ionicons name="star" size={14} color="#FFD93D" />
                      <Text style={styles.metricText}>{game.rating}</Text>
                    </View>
                  </View>

                  <TouchableOpacity 
                    style={styles.playButton}
                    onPress={() => handlePlayGame(game)}
                  >
                    <Ionicons name="play" size={16} color="#FFFFFF" />
                    <Text style={styles.playButtonText}>
                      {game.isCompleted ? 'Play Again' : 'Play'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Game Progress */}
                <View style={styles.gameProgress}>
                  <View style={styles.progressBarContainer}>
                    <View style={[styles.gameProgressFill, {
                      width: game.isCompleted ? '100%' : `${Math.random() * 60 + 20}%`,
                      backgroundColor: getDifficultyColor(game.difficulty)
                    }]} />
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Game Categories */}
          <View style={styles.categoriesCard}>
            <Text style={styles.sectionTitle}>Game Categories</Text>
            
            <View style={styles.categoriesGrid}>
              <TouchableOpacity style={[styles.categoryCard, { backgroundColor: '#8B4513' }]}>
                <View style={styles.categoryIconContainer}>
                  <Ionicons name="maze" size={32} color="#D2691E" />
                </View>
                <Text style={styles.categoryTitle}>Puzzle{'\n'}Games</Text>
                <Text style={styles.categoryCount}>3 games</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.categoryCard, { backgroundColor: '#4A4A8A' }]}>
                <View style={styles.categoryIconContainer}>
                  <Ionicons name="flash" size={32} color="#9370DB" />
                </View>
                <Text style={styles.categoryTitle}>Action{'\n'}Games</Text>
                <Text style={styles.categoryCount}>2 games</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.categoryCard, { backgroundColor: '#2F5F5F' }]}>
                <View style={styles.categoryIconContainer}>
                  <Ionicons name="brain" size={32} color="#20B2AA" />
                </View>
                <Text style={styles.categoryTitle}>Mind{'\n'}Games</Text>
                <Text style={styles.categoryCount}>1 game</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.activityCard}>
            <Text style={styles.sectionTitle}>Recent Game Activity</Text>
            
            {games.slice(0, 3).map((game, index) => (
              <View key={`activity-${game.id}`} style={styles.activityItem}>
                <View style={[styles.activityIcon, { 
                  backgroundColor: ['#FF6B6B', '#74C0FC', '#98D8C8'][index % 3]
                }]} />
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{game.title}</Text>
                  <Text style={styles.activityText}>
                    {game.isCompleted ? 'Completed' : 'Available to play'} • {game.difficulty} difficulty
                  </Text>
                </View>
                <Text style={styles.activityRating}>{game.rating} ★</Text>
              </View>
            ))}
          </View>

          {/* Coming Soon Card */}
          <LinearGradient
            colors={['#9370DB', '#FF6B9D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.comingSoonCard}
          >
            <View style={styles.comingSoonContent}>
              <Ionicons name="construct" size={40} color="white" />
              <Text style={styles.comingSoonTitle}>More Games Coming Soon</Text>
              <Text style={styles.comingSoonText}>
                We're developing memory palaces, lucid dreaming trainers, and emotion-based puzzles.
              </Text>
            </View>
          </LinearGradient>

          {/* Engine Info */}
          <View style={styles.engineCard}>
            <View style={styles.engineHeader}>
              <Ionicons name="cog" size={20} color="#74C0FC" />
              <Text style={styles.engineTitle}>Game Engine Status</Text>
            </View>
            <Text style={styles.engineText}>
              Available engines: {availableEngines.join(', ') || 'React Native (Native)'}
            </Text>
            <View style={styles.engineIndicator}>
              <View style={[styles.engineDot, { 
                backgroundColor: availableEngines.length > 0 ? '#32CD32' : '#FFD93D' 
              }]} />
              <Text style={styles.engineStatus}>
                {availableEngines.length > 0 ? 'Ready' : 'Basic Mode'}
              </Text>
            </View>
          </View>

          {/* Performance Metrics */}
          <View style={styles.performanceCard}>
            <Text style={styles.sectionTitle}>Your Performance</Text>
            
            <View style={styles.performanceGrid}>
              <View style={styles.performanceItem}>
                <Text style={styles.performanceValue}>24</Text>
                <Text style={styles.performanceLabel}>Games Played</Text>
                <View style={styles.performanceBar}>
                  <View style={[styles.performanceBarFill, { width: '80%', backgroundColor: '#32CD32' }]} />
                </View>
              </View>

              <View style={styles.performanceItem}>
                <Text style={styles.performanceValue}>18</Text>
                <Text style={styles.performanceLabel}>Completed</Text>
                <View style={styles.performanceBar}>
                  <View style={[styles.performanceBarFill, { width: '75%', backgroundColor: '#74C0FC' }]} />
                </View>
              </View>

              <View style={styles.performanceItem}>
                <Text style={styles.performanceValue}>87%</Text>
                <Text style={styles.performanceLabel}>Success Rate</Text>
                <View style={styles.performanceBar}>
                  <View style={[styles.performanceBarFill, { width: '87%', backgroundColor: '#FFD93D' }]} />
                </View>
              </View>

              <View style={styles.performanceItem}>
                <Text style={styles.performanceValue}>12h</Text>
                <Text style={styles.performanceLabel}>Play Time</Text>
                <View style={styles.performanceBar}>
                  <View style={[styles.performanceBarFill, { width: '60%', backgroundColor: '#FF9F43' }]} />
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
  gamesCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  gameCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  gameHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  gameIcon: {
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  gameInfo: {
    flex: 1,
  },
  gameTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  completedBadge: {
    backgroundColor: '#32CD32',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameType: {
    fontSize: 10,
    color: '#999999',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  gameDescription: {
    fontSize: 12,
    color: '#CCCCCC',
    lineHeight: 16,
  },
  gameDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  gameMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  difficultyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  metricText: {
    fontSize: 12,
    color: '#999999',
    textTransform: 'capitalize',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
  },
  playButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  gameProgress: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
  },
  gameProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  categoriesCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  categoryCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  categoryIconContainer: {
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
  },
  activityCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityIcon: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  activityText: {
    fontSize: 12,
    color: '#999999',
  },
  activityRating: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFD93D',
  },
  comingSoonCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
  },
  comingSoonContent: {
    alignItems: 'center',
  },
  comingSoonTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  comingSoonText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 18,
  },
  engineCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  engineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  engineTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  engineText: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 8,
  },
  engineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  engineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  engineStatus: {
    fontSize: 12,
    color: '#CCCCCC',
    fontWeight: '500',
  },
  performanceCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  performanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  performanceItem: {
    width: '48%',
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
  },
  performanceValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  performanceLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 8,
  },
  performanceBar: {
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
  },
  performanceBarFill: {
    height: '100%',
    borderRadius: 2,
  },
});