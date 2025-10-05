import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// Simple Anxiety Maze Game
export default function AnxietyMazeGame() {
  const [gameState, setGameState] = useState('menu'); // menu, playing, completed, failed
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });
  const [walls, setWalls] = useState<Array<{ x: number; y: number; width: number; height: number }>>([]);
  const [target, setTarget] = useState({ x: width - 100, y: height - 200 });
  const [gameSpeed, setGameSpeed] = useState(1);
  const [anxiety, setAnxiety] = useState(0);

  const playerAnim = useRef(new Animated.Value(0)).current;
  const anxietyAnim = useRef(new Animated.Value(0)).current;

  // Generate maze walls (simplified version)
  useEffect(() => {
    const newWalls = [];
    for (let i = 0; i < 15; i++) {
      newWalls.push({
        x: Math.random() * (width - 100),
        y: Math.random() * (height - 300) + 150,
        width: 60 + Math.random() * 40,
        height: 20 + Math.random() * 20,
      });
    }
    setWalls(newWalls);
  }, []);

  // Game timer
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (gameState === 'playing' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('failed');
            return 0;
          }
          return prev - 1;
        });
        
        // Increase anxiety over time
        setAnxiety(prev => Math.min(prev + 2, 100));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameState, timeLeft]);

  // Anxiety effect animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anxietyAnim, {
          toValue: anxiety / 100,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(anxietyAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [anxiety]);

  const movePlayer = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (gameState !== 'playing') return;

    const moveDistance = 20;
    let newX = playerPosition.x;
    let newY = playerPosition.y;

    switch (direction) {
      case 'up':
        newY = Math.max(100, playerPosition.y - moveDistance);
        break;
      case 'down':
        newY = Math.min(height - 200, playerPosition.y + moveDistance);
        break;
      case 'left':
        newX = Math.max(20, playerPosition.x - moveDistance);
        break;
      case 'right':
        newX = Math.min(width - 60, playerPosition.x + moveDistance);
        break;
    }

    // Check wall collisions
    const playerRect = { x: newX, y: newY, width: 40, height: 40 };
    const collision = walls.some(wall => 
      playerRect.x < wall.x + wall.width &&
      playerRect.x + playerRect.width > wall.x &&
      playerRect.y < wall.y + wall.height &&
      playerRect.y + playerRect.height > wall.y
    );

    if (!collision) {
      setPlayerPosition({ x: newX, y: newY });
      
      // Reduce anxiety when moving (positive feedback)
      setAnxiety(prev => Math.max(prev - 1, 0));
      
      // Check if reached target
      if (Math.abs(newX - target.x) < 50 && Math.abs(newY - target.y) < 50) {
        setGameState('completed');
        setScore(timeLeft * 10 + (100 - anxiety));
      }
    } else {
      // Hit wall - increase anxiety
      setAnxiety(prev => Math.min(prev + 5, 100));
      
      // Shake animation
      Animated.sequence([
        Animated.timing(playerAnim, {
          toValue: -5,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(playerAnim, {
          toValue: 5,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(playerAnim, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(60);
    setAnxiety(20);
    setPlayerPosition({ x: 50, y: 50 });
  };

  const resetGame = () => {
    setGameState('menu');
    setScore(0);
    setTimeLeft(60);
    setAnxiety(0);
    setPlayerPosition({ x: 50, y: 50 });
  };

  if (gameState === 'menu') {
    return (
      <SafeAreaView className="flex-1 bg-gray-900">
        <LinearGradient
          colors={['#1f2937', '#374151']}
          className="flex-1 items-center justify-center px-6"
        >
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-red-500 rounded-full items-center justify-center mb-4">
              <Ionicons name="warning" size={40} color="white" />
            </View>
            <Text className="text-white text-3xl font-bold text-center mb-2">
              Escape the Anxiety Maze
            </Text>
            <Text className="text-gray-300 text-center text-lg">
              Navigate through your fears to find inner peace
            </Text>
          </View>

          <View className="bg-white/10 rounded-2xl p-6 mb-8 w-full">
            <Text className="text-white text-lg font-semibold mb-3">How to Play:</Text>
            <Text className="text-gray-300 text-sm mb-2">• Navigate using the control buttons</Text>
            <Text className="text-gray-300 text-sm mb-2">• Avoid walls to reduce anxiety</Text>
            <Text className="text-gray-300 text-sm mb-2">• Reach the green target before time runs out</Text>
            <Text className="text-gray-300 text-sm">• Lower anxiety = higher score</Text>
          </View>

          <TouchableOpacity
            onPress={startGame}
            className="bg-primary-500 px-8 py-4 rounded-full mb-4"
          >
            <Text className="text-white text-lg font-semibold">Start Game</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-gray-700 px-8 py-3 rounded-full"
          >
            <Text className="text-white">Back to Games</Text>
          </TouchableOpacity>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  if (gameState === 'completed') {
    return (
      <SafeAreaView className="flex-1 bg-green-900">
        <LinearGradient
          colors={['#065f46', '#047857']}
          className="flex-1 items-center justify-center px-6"
        >
          <Ionicons name="checkmark-circle" size={80} color="white" />
          <Text className="text-white text-3xl font-bold mt-4 text-center">
            Anxiety Conquered!
          </Text>
          <Text className="text-green-200 text-xl mt-2">Score: {score}</Text>
          
          <View className="bg-white/20 rounded-2xl p-6 mt-8 w-full">
            <Text className="text-white text-lg font-semibold mb-2">Dream Analysis</Text>
            <Text className="text-green-200 text-sm">
              You successfully navigated through your anxiety maze. This represents your ability 
              to overcome challenges and find inner strength even under pressure.
            </Text>
          </View>

          <View className="flex-row mt-8 space-x-4">
            <TouchableOpacity
              onPress={startGame}
              className="bg-white px-6 py-3 rounded-full"
            >
              <Text className="text-green-600 font-semibold">Play Again</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={resetGame}
              className="bg-green-600 px-6 py-3 rounded-full"
            >
              <Text className="text-white font-semibold">Main Menu</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  if (gameState === 'failed') {
    return (
      <SafeAreaView className="flex-1 bg-red-900">
        <LinearGradient
          colors={['#7f1d1d', '#991b1b']}
          className="flex-1 items-center justify-center px-6"
        >
          <Ionicons name="close-circle" size={80} color="white" />
          <Text className="text-white text-3xl font-bold mt-4 text-center">
            Time's Up
          </Text>
          <Text className="text-red-200 text-lg mt-2">
            Anxiety overwhelmed you this time
          </Text>
          
          <View className="bg-white/20 rounded-2xl p-6 mt-8 w-full">
            <Text className="text-white text-lg font-semibold mb-2">Reflection</Text>
            <Text className="text-red-200 text-sm">
              Sometimes anxiety wins, and that's okay. Each attempt teaches us more about 
              our patterns and helps us build resilience for the next challenge.
            </Text>
          </View>

          <View className="flex-row mt-8 space-x-4">
            <TouchableOpacity
              onPress={startGame}
              className="bg-white px-6 py-3 rounded-full"
            >
              <Text className="text-red-600 font-semibold">Try Again</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={resetGame}
              className="bg-red-600 px-6 py-3 rounded-full"
            >
              <Text className="text-white font-semibold">Main Menu</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  // Playing state - Game UI
  return (
    <SafeAreaView className="flex-1 bg-gray-800">
      {/* Game Header */}
      <View className="bg-black/50 px-6 py-4 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View className="flex-row items-center space-x-6">
          <View className="items-center">
            <Text className="text-white text-sm">Time</Text>
            <Text className="text-white text-xl font-bold">{timeLeft}s</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-sm">Anxiety</Text>
            <Text className={`text-xl font-bold ${anxiety > 70 ? 'text-red-400' : anxiety > 40 ? 'text-yellow-400' : 'text-green-400'}`}>
              {anxiety}%
            </Text>
          </View>
        </View>
      </View>

      {/* Game Area */}
      <View className="flex-1 relative">
        {/* Anxiety overlay effect */}
        <Animated.View 
          className="absolute inset-0 bg-red-500"
          style={{
            opacity: anxietyAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.3],
            }),
          }}
        />

        {/* Walls */}
        {walls.map((wall, index) => (
          <View
            key={index}
            className="absolute bg-gray-400"
            style={{
              left: wall.x,
              top: wall.y,
              width: wall.width,
              height: wall.height,
            }}
          />
        ))}

        {/* Target */}
        <View
          className="absolute bg-green-500 rounded-full items-center justify-center"
          style={{
            left: target.x,
            top: target.y,
            width: 40,
            height: 40,
          }}
        >
          <Ionicons name="flag" size={20} color="white" />
        </View>

        {/* Player */}
        <Animated.View
          className="absolute bg-blue-500 rounded-full items-center justify-center"
          style={{
            left: playerPosition.x,
            top: playerPosition.y,
            width: 40,
            height: 40,
            transform: [{ translateX: playerAnim }],
          }}
        >
          <Ionicons name="person" size={20} color="white" />
        </Animated.View>

        {/* Controls */}
        <View className="absolute bottom-8 left-0 right-0 px-6">
          <View className="items-center">
            {/* Up button */}
            <TouchableOpacity
              onPress={() => movePlayer('up')}
              className="bg-white/20 rounded-full p-4 mb-2"
            >
              <Ionicons name="chevron-up" size={24} color="white" />
            </TouchableOpacity>
            
            {/* Left and Right buttons */}
            <View className="flex-row items-center space-x-8">
              <TouchableOpacity
                onPress={() => movePlayer('left')}
                className="bg-white/20 rounded-full p-4"
              >
                <Ionicons name="chevron-back" size={24} color="white" />
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => movePlayer('right')}
                className="bg-white/20 rounded-full p-4"
              >
                <Ionicons name="chevron-forward" size={24} color="white" />
              </TouchableOpacity>
            </View>
            
            {/* Down button */}
            <TouchableOpacity
              onPress={() => movePlayer('down')}
              className="bg-white/20 rounded-full p-4 mt-2"
            >
              <Ionicons name="chevron-down" size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          {/* Anxiety meter */}
          <View className="mt-6 px-4">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-white text-xs">Anxiety Level</Text>
              <Text className="text-white text-xs">{anxiety}%</Text>
            </View>
            <View className="bg-white/20 rounded-full h-2">
              <View 
                className="bg-red-500 rounded-full h-2"
                style={{ width: `${anxiety}%` }}
              />
            </View>
          </View>
        </View>
        
        {/* Help tip */}
        <View className="absolute top-4 right-4 bg-black/40 px-3 py-2 rounded-lg">
          <Text className="text-white text-xs">
            Reach the green flag to escape
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}