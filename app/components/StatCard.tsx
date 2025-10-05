import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type StatCardProps = {
  iconName: React.ComponentProps<typeof Ionicons>['name'];
  iconColor: string;
  title: string;
  value: string;
  progress: number; // 0 to 100
};

export function StatCard({ iconName, iconColor, title, value, progress }: StatCardProps) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <View style={[styles.statIcon, { backgroundColor: iconColor }]}>
          <Ionicons name={iconName} size={16} color="white" />
        </View>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <View style={styles.statProgress}>
        <View style={[styles.statProgressFill, { width: `${progress}%`, backgroundColor: iconColor }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    width: '48%', // This allows two cards per row with a gap
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
});