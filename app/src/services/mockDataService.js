// ============== MOCK DATA SERVICE ==============

class MockDataService {
  static generateLiveSleepData() {
    const sleepStages = ['Wake', 'N1', 'N2', 'N3', 'REM'];
    const isAsleep = Math.random() > 0.3;
    
    return {
      currentStatus: {
        isAsleep,
        sleepStage: isAsleep ? sleepStages[Math.floor(Math.random() * 4) + 1] : 'Wake',
        stageDuration: Math.floor(Math.random() * 90) + 10,
        totalSleepTime: Math.floor(Math.random() * 480) + 300, // 5-13 hours
        nextAwakening: new Date(Date.now() + Math.random() * 3600000).toISOString(),
      },
      liveMetrics: {
        heartRate: Math.floor(Math.random() * 30) + 60, // 60-90 BPM
        hrv: Math.floor(Math.random() * 50) + 30, // 30-80 ms
        movement: Math.random() * 0.5, // 0-0.5 (low movement during sleep)
        skinTemperature: (Math.random() * 2 + 35).toFixed(1), // 35-37°C
        breathingRate: Math.floor(Math.random() * 8) + 12, // 12-20 breaths/min
      }
    };
  }

  static generateDreamDetectionData() {
    const statuses = ['no_dream', 'analyzing', 'REM_detected'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      status,
      confidence: Math.random(),
      duration: Math.floor(Math.random() * 20) + 5,
      preliminaryResults: status === 'REM_detected' ? {
        dominantEmotion: ['anxiety', 'joy', 'curiosity', 'fear', 'excitement'][Math.floor(Math.random() * 5)],
        themeDetected: ['academic_stress', 'adventure', 'family_gathering', 'work_presentation', 'flying_dream'][Math.floor(Math.random() * 5)]
      } : null
    };
  }

  static generateContentQueue() {
    const contentTypes = [
      {
        type: 'story',
        title: 'The Examination Chamber',
        status: Math.random() > 0.5 ? 'generating' : 'ready',
        progress: Math.random() > 0.5 ? Math.floor(Math.random() * 100) : null
      },
      {
        type: 'game',
        title: 'Escape the Anxiety Maze',
        status: Math.random() > 0.5 ? 'ready' : 'queued',
        progress: Math.random() > 0.5 ? Math.floor(Math.random() * 100) : null
      },
      {
        type: 'story',
        title: 'Flying Through Clouds',
        status: 'completed',
        progress: null
      }
    ];
    
    return contentTypes.slice(0, Math.floor(Math.random() * 3) + 1);
  }

  static generateDreamHistory() {
    const emotions = ['anxiety', 'joy', 'fear', 'excitement', 'curiosity', 'sadness'];
    const themes = ['academic_stress', 'flying', 'family', 'work', 'adventure', 'chase'];
    
    return Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      dreamsCount: Math.floor(Math.random() * 3) + 1,
      totalRem: Math.floor(Math.random() * 60) + 60,
      dominantEmotion: emotions[Math.floor(Math.random() * emotions.length)],
      themes: themes.slice(0, Math.floor(Math.random() * 3) + 1),
      contentGenerated: {
        stories: Math.floor(Math.random() * 3),
        games: Math.floor(Math.random() * 2),
        images: Math.floor(Math.random() * 5) + 1
      },
      userRating: parseFloat((Math.random() * 2 + 3).toFixed(1)) // 3.0-5.0
    }));
  }

  static generateStoryContent() {
    const stories = [
      {
        id: '1',
        title: 'The Examination Chamber',
        genre: 'psychological_thriller',
        emotion: 'anxiety',
        theme: 'academic_stress',
        content: `You find yourself in an endless examination hall where the walls keep shifting and moving. Every time you try to write something down, the pencil becomes heavier in your hand. The clock on the wall ticks backward, and whispers echo from empty seats around you. What started as a simple test has become a labyrinth of your deepest fears about failure and judgment.`,
        duration: '12 minutes',
        rating: 4.2,
        createdAt: '2025-08-29T03:45:00Z',
        isCompleted: false
      },
      {
        id: '2',
        title: 'Flight Through Starlight',
        genre: 'adventure',
        emotion: 'joy',
        theme: 'flying_dream',
        content: `The moment you realize you can fly, the world transforms beneath you. Cities become patterns of light, mountains fold like paper, and the sky opens into infinite possibilities. You soar through clouds that taste like childhood memories and dance with birds that speak in colors. This is freedom in its purest form.`,
        duration: '8 minutes',
        rating: 4.8,
        createdAt: '2025-08-28T02:30:00Z',
        isCompleted: true
      },
      {
        id: '3',
        title: 'The Endless Corridor',
        genre: 'mystery',
        emotion: 'curiosity',
        theme: 'exploration',
        content: `Doors line both sides of an impossibly long hallway, each one leading to a different memory from your past. Some doors are locked, others creak open at your touch. Behind one door, you find your childhood bedroom exactly as it was. Behind another, a conversation you wish you'd had differently. The corridor seems to stretch infinitely, but you know the door you're looking for is somewhere ahead.`,
        duration: '15 minutes',
        rating: 4.5,
        createdAt: '2025-08-27T04:15:00Z',
        isCompleted: false
      }
    ];
    
    return stories;
  }

  static generateGameContent() {
    return [
      {
        id: '1',
        title: 'Escape the Anxiety Maze',
        type: 'puzzle_escape',
        emotion: 'anxiety',
        difficulty: 'medium',
        description: 'Navigate through a shifting maze that represents your academic fears. Solve puzzles to unlock paths forward.',
        duration: '10 minutes',
        rating: 4.1,
        isCompleted: false
      },
      {
        id: '2',
        title: 'Sky Dancing',
        type: 'flight_simulator',
        emotion: 'joy',
        difficulty: 'easy',
        description: 'Soar through dreamlike landscapes and collect starlight orbs while mastering the art of dream flight.',
        duration: '8 minutes',
        rating: 4.9,
        isCompleted: true
      }
    ];
  }
}

// Export an instance of the class for easy importing
export const mockDataService = MockDataService;
