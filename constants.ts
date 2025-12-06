import { Character, Exercise, Quest, Template } from './types';

export const LEVEL_BASE_XP = 1000;

export const EXERCISES: Exercise[] = [
  { id: 'ex_1', name: 'Barbell Squat', muscleGroup: 'Legs' },
  { id: 'ex_2', name: 'Bench Press', muscleGroup: 'Chest' },
  { id: 'ex_3', name: 'Deadlift', muscleGroup: 'Back' },
  { id: 'ex_4', name: 'Overhead Press', muscleGroup: 'Shoulders' },
  { id: 'ex_5', name: 'Pull Up', muscleGroup: 'Back' },
  { id: 'ex_6', name: 'Dumbbell Curl', muscleGroup: 'Biceps' },
  { id: 'ex_7', name: 'Tricep Extension', muscleGroup: 'Triceps' },
];

export const CHARACTERS: Character[] = [
  {
    id: 'char_1',
    name: 'Kael, The Saiyan Descendant',
    baseImage: 'https://picsum.photos/seed/anime1/400/600',
    transformations: [
      { levelRequired: 1, name: 'Base Form', image: 'https://picsum.photos/seed/anime1/400/600', auraColor: 'text-blue-400' },
      { levelRequired: 5, name: 'Awakened State', image: 'https://picsum.photos/seed/anime2/400/600', auraColor: 'text-yellow-400' },
      { levelRequired: 10, name: 'Super Warrior', image: 'https://picsum.photos/seed/anime3/400/600', auraColor: 'text-red-500' },
      { levelRequired: 20, name: 'God Mode', image: 'https://picsum.photos/seed/anime4/400/600', auraColor: 'text-cyan-300' },
    ],
  },
  {
    id: 'char_2',
    name: 'Lyra, Gravity Master',
    baseImage: 'https://picsum.photos/seed/animegirl1/400/600',
    transformations: [
      { levelRequired: 1, name: 'Base Form', image: 'https://picsum.photos/seed/animegirl1/400/600', auraColor: 'text-purple-400' },
      { levelRequired: 5, name: 'Zero Gravity', image: 'https://picsum.photos/seed/animegirl2/400/600', auraColor: 'text-pink-400' },
      { levelRequired: 10, name: 'Singularity', image: 'https://picsum.photos/seed/animegirl3/400/600', auraColor: 'text-indigo-500' },
    ],
  }
];

export const WORKOUT_TEMPLATES: Template[] = [
  {
    id: 'temp_1',
    name: 'Saiyan Strength (Push)',
    description: 'Focus on chest, shoulders, and triceps to build pushing power.',
    difficulty: 'Intermediate',
    exercises: [
      { exerciseId: 'ex_2', defaultSets: 4 }, // Bench
      { exerciseId: 'ex_4', defaultSets: 3 }, // OHP
      { exerciseId: 'ex_7', defaultSets: 3 }, // Triceps
    ],
  },
  {
    id: 'temp_2',
    name: 'Titan Legs',
    description: 'Destroy your limits with this leg-focused routine.',
    difficulty: 'Elite',
    exercises: [
      { exerciseId: 'ex_1', defaultSets: 5 }, // Squat
      { exerciseId: 'ex_3', defaultSets: 3 }, // Deadlift
    ],
  },
  {
    id: 'temp_3',
    name: 'Full Body Awakening',
    description: 'A balanced routine to wake up your muscles.',
    difficulty: 'Beginner',
    exercises: [
      { exerciseId: 'ex_1', defaultSets: 3 },
      { exerciseId: 'ex_2', defaultSets: 3 },
      { exerciseId: 'ex_5', defaultSets: 3 },
    ],
  }
];

export const DAILY_QUESTS: Quest[] = [
  { id: 'q_1', title: 'First Step', description: 'Complete 1 workout today', xpReward: 150, completed: false, type: 'daily' },
  { id: 'q_2', title: 'Heavy Lifter', description: 'Lift a total of 1000kg volume', xpReward: 300, completed: false, type: 'daily' },
];