import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import { mockDataService } from '../../src/services/mockDataService';
import { generateImageFromApi } from '../../src/services/image_service'; 

const { width: screenWidth } = Dimensions.get('window');

// Define the type for a story object for TypeScript
interface Story {
  id: string;
  title: string;
  content: string;
  emotion: string;
  genre: string;
  duration: string;
  rating: number; 
  isCompleted: boolean;
  theme: string;
  createdAt: string; // FIX: Added missing createdAt property
}

const getEmotionColor = (emotion: string): readonly [string, string] => {
    const emotionColors: { [key: string]: readonly [string, string] } = {
      'happy': ['#FFD700', '#FFA500'] as const,
      'sad': ['#6495ED', '#4682B4'] as const,
      'angry': ['#FF4500', '#8B0000'] as const,
      'fear': ['#800080', '#4B0082'] as const,
      'surprise': ['#00FFFF', '#008B8B'] as const,
      'calm': ['#87CEEB', '#4169E1'] as const,
      'excited': ['#FF69B4', '#C71585'] as const,
      'nostalgia': ['#DDA0DD', '#9370DB'] as const,
      'anxious': ['#FFD700', '#B8860B'] as const,
      'love': ['#FF69B4', '#DC143C'] as const,
      'neutral': ['#A9A9A9', '#696969'] as const
    };
  
    return emotionColors[emotion?.toLowerCase()] || ['#A9A9A9', '#696969'] as const;
};

export default function StorylineScreen() {
  const [stories] = useState<Story[]>(mockDataService.generateStoryContent());
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  // New state for image generation
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const openStory = (story: Story) => {
    setSelectedStory(story);
    setModalVisible(true);
    // Reset image state when a new story is opened
    setGeneratedImageUrl(null);
    setGenerationError(null);
  };

  const handleGenerateImage = async () => {
    if (!selectedStory) return;
  
    setIsGenerating(true);
    setGenerationError(null);
    setGeneratedImageUrl(null);
  
    try {
      // Create a concise prompt from the story content
      const prompt = `A vivid, artistic interpretation of the following dream: "${selectedStory.content.substring(0, 200)}". Style: ${selectedStory.genre.replace('_', ' ')}, Emotion: ${selectedStory.emotion}.`;
      const result = await generateImageFromApi(prompt);
      setGeneratedImageUrl(result.imageUrl);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setGenerationError(errorMessage);
      Alert.alert("Image Generation Failed", errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleShare = async () => {
    if (!generatedImageUrl) {
      Alert.alert("No Image", "Please generate an image first.");
      return;
    }
  
    try {
      // Define a temporary file path in the app's cache directory
      const fileUri = FileSystem.cacheDirectory + `${Date.now()}-dream-image.png`;
      
      // Extract the raw base64 data from the data URI
      const base64Code = generatedImageUrl.split("data:image/png;base64,")[1];
      
      // Write the base64 data to the temporary file
      await FileSystem.writeAsStringAsync(fileUri, base64Code, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Use the native Share API with the local file URI
      const shareOptions = {
        title: `A scene from my dream: ${selectedStory?.title}`,
        url: fileUri, // Use the local file URI for sharing
        message: `Check out this image generated from my dream story, "${selectedStory?.title}"! #DreamWave #AIart`,
      };
  
      await Share.share(shareOptions);

      // Clean up the temporary file
      await FileSystem.deleteAsync(fileUri, { idempotent: true });
  
    } catch (error) {
      Alert.alert('Error', 'Failed to share the image.');
      console.error('Sharing error:', error);
    }
  };
  
  const getEmotionSingleColor = (emotion: string) => {
    const colors: { [key: string]: string } = {
      'happy': '#FFD700',
      'sad': '#6495ED',
      'angry': '#FF4500',
      'fear': '#800080',
      'surprise': '#00FFFF',
      'calm': '#87CEEB',
      'excited': '#FF69B4',
      'nostalgia': '#DDA0DD',
      'anxious': '#FFD700',
      'love': '#FF69B4',
      'neutral': '#A9A9A9'
    };
    return colors[emotion?.toLowerCase()] || '#A9A9A9';
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.canGoBack() && router.back()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Dream Stories</Text>
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
          {/* Stories Overview Card */}
          <View style={styles.overviewCard}>
            <View style={styles.overviewHeader}>
              <View style={[styles.overviewIcon, { backgroundColor: '#FF69B4' }]}>
                <Ionicons name="book" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.overviewContent}>
                <Text style={styles.overviewTitle}>Dream Stories</Text>
                <Text style={styles.overviewSubtitle}>Generated from sleep patterns</Text>
              </View>
              <View style={styles.overviewRight}>
                <TouchableOpacity style={styles.helpButton}>
                  <Text style={styles.helpButtonText}>?</Text>
                </TouchableOpacity>
                <View style={styles.progressContainer}>
                  <View style={[styles.progressBar, { 
                    width: `${(stories.filter(s => s.isCompleted).length / stories.length) * 100}%`,
                    backgroundColor: '#FF69B4'
                  }]} />
                </View>
              </View>
            </View>
          </View>

          {/* Story Statistics */}
          <View style={styles.statsCard}>
            <Text style={styles.sectionTitle}>Story Statistics</Text>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: '#FF69B4' }]}>
                  <Ionicons name="book" size={16} color="white" />
                </View>
                <Text style={styles.statLabel}>Total Stories</Text>
                <Text style={styles.statValue}>{stories.length}</Text>
              </View>

              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: '#32CD32' }]}>
                  <Ionicons name="checkmark-circle" size={16} color="white" />
                </View>
                <Text style={styles.statLabel}>Completed</Text>
                <Text style={styles.statValue}>{stories.filter(s => s.isCompleted).length}</Text>
              </View>

              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: '#FFD93D' }]}>
                  <Ionicons name="star" size={16} color="white" />
                </View>
                <Text style={styles.statLabel}>Avg Rating</Text>
                <Text style={styles.statValue}>
                  {(stories.reduce((sum, story) => sum + story.rating, 0) / stories.length).toFixed(1)}
                </Text>
              </View>

              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: '#9370DB' }]}>
                  <Ionicons name="time" size={16} color="white" />
                </View>
                <Text style={styles.statLabel}>Read Time</Text>
                <Text style={styles.statValue}>2.5h</Text>
              </View>
            </View>
          </View>

          {/* Featured Story */}
          <View style={styles.featuredCard}>
            <Text style={styles.sectionTitle}>Featured Story</Text>
            
            {stories[0] && (
              <TouchableOpacity
                onPress={() => openStory(stories[0])}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={getEmotionColor(stories[0].emotion)}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.featuredStoryCard}
                >
                  <View style={styles.featuredHeader}>
                    <View style={styles.featuredBadge}>
                      <Text style={styles.featuredBadgeText}>
                        {stories[0].genre.replace('_', ' ').toUpperCase()}
                      </Text>
                    </View>
                    {stories[0].isCompleted && (
                      <View style={styles.completedIcon}>
                        <Ionicons name="checkmark-circle" size={20} color="white" />
                      </View>
                    )}
                  </View>
                  
                  <Text style={styles.featuredTitle}>{stories[0].title}</Text>
                  <Text style={styles.featuredContent}>
                    {stories[0].content.substring(0, 120)}...
                  </Text>
                  
                  <View style={styles.featuredFooter}>
                    <View style={styles.featuredMetrics}>
                      <View style={styles.metricItem}>
                        <Ionicons name="time" size={14} color="white" />
                        <Text style={styles.metricText}>{stories[0].duration}</Text>
                      </View>
                      <View style={styles.metricItem}>
                        <Ionicons name="star" size={14} color="#FFD93D" />
                        <Text style={styles.metricText}>{stories[0].rating}</Text>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="white" />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>

          {/* Story Collection */}
          <View style={styles.collectionCard}>
            <Text style={styles.sectionTitle}>Your Story Collection</Text>
            
            {stories.slice(1).map((story, index) => (
              <TouchableOpacity
                key={story.id}
                onPress={() => openStory(story)}
                style={styles.storyCard}
                activeOpacity={0.7}
              >
                <View style={styles.storyHeader}>
                  <View style={styles.storyIconContainer}>
                    <View style={[styles.emotionDot, { 
                      backgroundColor: getEmotionSingleColor(story.emotion) 
                    }]} />
                    <View style={[styles.storyIcon, { 
                      backgroundColor: ['#FF9F43', '#9370DB', '#74C0FC', '#32CD32', '#FF6B9D'][index % 5]
                    }]}>
                      <Ionicons name="book-outline" size={16} color="#FFFFFF" />
                    </View>
                  </View>
                  
                  <View style={styles.storyInfo}>
                    <View style={styles.storyTitleRow}>
                      <Text style={styles.storyGenre}>
                        {story.genre.replace('_', ' ').toUpperCase()}
                      </Text>
                      {story.isCompleted && (
                        <View style={styles.storyCompletedBadge}>
                          <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                        </View>
                      )}
                    </View>
                    
                    <Text style={styles.storyTitle}>{story.title}</Text>
                    <Text style={styles.storyPreview}>
                      {story.content.substring(0, 80)}...
                    </Text>
                    
                    <View style={styles.storyMetrics}>
                      <View style={styles.storyMetricItem}>
                        <Ionicons name="time" size={12} color="#999999" />
                        <Text style={styles.storyMetricText}>{story.duration}</Text>
                      </View>
                      <View style={styles.storyMetricItem}>
                        <Ionicons name="star" size={12} color="#FFD93D" />
                        <Text style={styles.storyMetricText}>{story.rating}</Text>
                      </View>
                    </View>
                  </View>
                  
                  <Ionicons name="chevron-forward" size={16} color="#666666" />
                </View>

                {/* Story Progress */}
                <View style={styles.storyProgress}>
                  <View style={[styles.storyProgressFill, {
                    width: story.isCompleted ? '100%' : `${Math.random() * 60 + 20}%`,
                    backgroundColor: getEmotionSingleColor(story.emotion)
                  }]} />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Story Categories */}
          <View style={styles.categoriesCard}>
            <Text style={styles.sectionTitle}>Story Categories</Text>
            
            <View style={styles.categoriesGrid}>
              <TouchableOpacity style={[styles.categoryCard, { backgroundColor: '#8B4513' }]}>
                <View style={styles.categoryIconContainer}>
                  <Ionicons name="heart" size={32} color="#FF69B4" />
                </View>
                <Text style={styles.categoryTitle}>Romance{'\n'}Dreams</Text>
                <Text style={styles.categoryCount}>4 stories</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.categoryCard, { backgroundColor: '#4A4A8A' }]}>
                <View style={styles.categoryIconContainer}>
                  <Ionicons name="flash" size={32} color="#9370DB" />
                </View>
                <Text style={styles.categoryTitle}>Adventure{'\n'}Tales</Text>
                <Text style={styles.categoryCount}>3 stories</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.categoryCard, { backgroundColor: '#2F5F5F' }]}>
                <View style={styles.categoryIconContainer}>
                  <Ionicons name="moon" size={32} color="#87CEEB" />
                </View>
                <Text style={styles.categoryTitle}>Mystery{'\n'}Dreams</Text>
                <Text style={styles.categoryCount}>2 stories</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.activityCard}>
            <Text style={styles.sectionTitle}>Recent Story Activity</Text>
            
            {stories.slice(0, 3).map((story, index) => (
              <View key={`activity-${story.id}`} style={styles.activityItem}>
                <View style={[styles.activityIcon, { 
                  backgroundColor: getEmotionSingleColor(story.emotion)
                }]} />
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{story.title}</Text>
                  <Text style={styles.activityText}>
                    {story.isCompleted ? 'Read' : 'Available'} • {story.genre.replace('_', ' ')} • {story.emotion}
                  </Text>
                </View>
                <Text style={styles.activityRating}>{story.rating} ★</Text>
              </View>
            ))}
          </View>

          {/* Reading Progress */}
          <View style={styles.progressCard}>
            <Text style={styles.sectionTitle}>Reading Progress</Text>
            
            <View style={styles.progressGrid}>
              <View style={styles.progressItem}>
                <Text style={styles.progressValue}>
                  {stories.filter(s => s.isCompleted).length}
                </Text>
                <Text style={styles.progressLabel}>Stories Read</Text>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBarFill, { 
                    width: `${(stories.filter(s => s.isCompleted).length / stories.length) * 100}%`, 
                    backgroundColor: '#32CD32' 
                  }]} />
                </View>
              </View>

              <View style={styles.progressItem}>
                <Text style={styles.progressValue}>2.5</Text>
                <Text style={styles.progressLabel}>Hours Read</Text>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBarFill, { width: '60%', backgroundColor: '#74C0FC' }]} />
                </View>
              </View>

              <View style={styles.progressItem}>
                <Text style={styles.progressValue}>
                  {Math.round(stories.reduce((sum, story) => sum + story.rating, 0) / stories.length * 20)}%
                </Text>
                <Text style={styles.progressLabel}>Satisfaction</Text>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBarFill, { width: '85%', backgroundColor: '#FFD93D' }]} />
                </View>
              </View>

              <View style={styles.progressItem}>
                <Text style={styles.progressValue}>5</Text>
                <Text style={styles.progressLabel}>Genres</Text>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBarFill, { width: '70%', backgroundColor: '#FF9F43' }]} />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Story Reader Modal */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <SafeAreaView style={styles.modalSafeArea}>
              {selectedStory && (
                <>
                  {/* Modal Header */}
                  <View style={styles.modalHeader}>
                    <View style={styles.modalHeaderContent}>
                      <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        style={styles.modalBackButton}
                      >
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                      </TouchableOpacity>
                      <Text style={styles.modalHeaderTitle}>Dream Story</Text>
                      <TouchableOpacity style={styles.modalBookmarkButton}>
                        <Ionicons name="bookmark-outline" size={24} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <ScrollView style={styles.modalScrollView}>
                    <View style={styles.modalContent}>
                      {/* Story Header */}
                      <View style={styles.modalStoryHeader}>
                        <View style={styles.modalGenreBadge}>
                          <View style={[styles.modalEmotionDot, { 
                            backgroundColor: getEmotionSingleColor(selectedStory.emotion) 
                          }]} />
                          <Text style={styles.modalGenreText}>
                            {selectedStory.genre.replace('_', ' ').toUpperCase()}
                          </Text>
                        </View>
                        
                        <Text style={styles.modalStoryTitle}>
                          {selectedStory.title}
                        </Text>
                        
                        <View style={styles.modalStoryMetrics}>
                          <View style={styles.modalMetricItem}>
                            <Ionicons name="time" size={16} color="#999999" />
                            <Text style={styles.modalMetricText}>{selectedStory.duration}</Text>
                          </View>
                          <View style={styles.modalMetricItem}>
                            <Ionicons name="star" size={16} color="#FFD93D" />
                            <Text style={styles.modalMetricText}>{selectedStory.rating}</Text>
                          </View>
                        </View>
                      </View>

                      {/* Story Content */}
                      <View style={styles.modalStoryContent}>
                        <Text style={styles.modalStoryText}>
                          {selectedStory.content}
                        </Text>
                      </View>

                      {/* NEW: Image Generation Section */}
                      <View style={styles.imageGenerationCard}>
                        <View style={styles.modalAnalysisHeader}>
                            <Ionicons name="image" size={20} color="#9370DB" />
                            <Text style={styles.modalAnalysisTitle}>Visualize Your Dream</Text>
                        </View>
                        <Text style={styles.modalAnalysisText}>
                          Use AI to create a unique image based on this story's themes and emotions.
                        </Text>

                        {/* Button */}
                        <TouchableOpacity
                            style={[styles.generateButton, isGenerating && styles.buttonDisabled]}
                            onPress={handleGenerateImage}
                            disabled={isGenerating}
                        >
                            <Ionicons name="sparkles" size={16} color="#FFFFFF" />
                            <Text style={styles.generateButtonText}>
                            {isGenerating ? 'Generating...' : 'Generate Image'}
                            </Text>
                        </TouchableOpacity>

                        {/* Image Display Area */}
                        <View style={styles.generatedImageContainer}>
                            {isGenerating && <ActivityIndicator size="large" color="#FFFFFF" />}
                            {generationError && !isGenerating && <Text style={styles.errorText}>{generationError}</Text>}
                            {generatedImageUrl && !isGenerating && (
                                <>
                                <Image source={{ uri: generatedImageUrl }} style={styles.generatedImage} resizeMode="contain" />
                                <View style={styles.shareButtonsContainer}>
                                    <TouchableOpacity style={[styles.shareButton, {backgroundColor: '#25D366'}]} onPress={handleShare}>
                                        <Ionicons name="logo-whatsapp" size={20} color="white" />
                                        <Text style={styles.shareButtonText}>Share</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.shareButton, {backgroundColor: '#C13584'}]} onPress={handleShare}>
                                        <Ionicons name="logo-instagram" size={20} color="white" />
                                        <Text style={styles.shareButtonText}>Share</Text>
                                    </TouchableOpacity>
                                </View>
                                </>
                            )}
                        </View>
                      </View>

                      {/* Dream Analysis */}
                      <View style={styles.modalAnalysisCard}>
                        <View style={styles.modalAnalysisHeader}>
                          <Ionicons name="analytics" size={20} color="#4A90E2" />
                          <Text style={styles.modalAnalysisTitle}>Dream Analysis</Text>
                        </View>
                        <Text style={styles.modalAnalysisText}>
                          This story was generated from your {selectedStory.theme.replace('_', ' ')} dreams, 
                          capturing the emotional essence of {selectedStory.emotion} from your sleep patterns.
                        </Text>
                      </View>
                    </View>
                  </ScrollView>
                </>
              )}
            </SafeAreaView>
          </View>
        </Modal>
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
  featuredCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  featuredStoryCard: {
    borderRadius: 16,
    padding: 20,
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  featuredBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  featuredBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  completedIcon: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 4,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  featuredContent: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
    marginBottom: 16,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  collectionCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  storyCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  storyHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  storyIconContainer: {
    alignItems: 'center',
    marginRight: 12,
  },
  emotionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  storyIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyInfo: {
    flex: 1,
  },
  storyTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  storyGenre: {
    fontSize: 10,
    color: '#999999',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  storyCompletedBadge: {
    backgroundColor: '#32CD32',
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  storyPreview: {
    fontSize: 12,
    color: '#CCCCCC',
    lineHeight: 16,
    marginBottom: 8,
  },
  storyMetrics: {
    flexDirection: 'row',
    gap: 12,
  },
  storyMetricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  storyMetricText: {
    fontSize: 12,
    color: '#999999',
  },
  storyProgress: {
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
    marginTop: 12,
  },
  storyProgressFill: {
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
    textTransform: 'capitalize',
  },
  activityRating: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFD93D',
  },
  progressCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  progressGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  progressItem: {
    width: '48%',
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
  },
  progressValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  modalSafeArea: {
    flex: 1,
  },
  modalHeader: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  modalHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalBackButton: {
    padding: 8,
  },
  modalHeaderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  modalBookmarkButton: {
    padding: 8,
  },
  modalScrollView: {
    flex: 1,
  },
  modalContent: {
    padding: 20,
  },
  modalStoryHeader: {
    marginBottom: 24,
  },
  modalGenreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalEmotionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  modalGenreText: {
    fontSize: 12,
    color: '#999999',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  modalStoryTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    lineHeight: 30,
  },
  modalStoryMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  modalMetricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  modalMetricText: {
    fontSize: 14,
    color: '#999999',
  },
  modalStoryContent: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  modalStoryText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  modalAnalysisCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#4A90E2',
    marginBottom: 24,
  },
  modalAnalysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalAnalysisTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  modalAnalysisText: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 20,
  },
    // New Styles for Image Generation
    imageGenerationCard: {
      backgroundColor: '#1A1A1A',
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: '#9370DB',
    },
    generateButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#9370DB',
      borderRadius: 8,
      padding: 14,
      marginTop: 16,
      gap: 8,
    },
    buttonDisabled: {
      backgroundColor: '#555',
    },
    generateButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    generatedImageContainer: {
      marginTop: 20,
      minHeight: 200,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2A2A2A',
      borderRadius: 12,
    },
    generatedImage: {
      width: '100%',
      aspectRatio: 1,
      borderRadius: 8,
    },
    errorText: {
      color: '#FF6B6B',
      textAlign: 'center',
      padding: 20,
    },
    shareButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: 16,
    },
    shareButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
      gap: 8,
    },
    shareButtonText: {
      color: 'white',
      fontWeight: '600',
    },
});


