export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  description?: string;
}

export interface WorkoutSet {
  id: string;
  reps: number;
  weight: number;
  completed: boolean;
}

export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  exerciseName: string;
  sets: WorkoutSet[];
}

export interface WorkoutSession {
  id: string;
  templateId?: string;
  name: string;
  startTime: number;
  endTime?: number;
  exercises: WorkoutExercise[];
  totalVolume: number;
  xpEarned: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  level: number;
  currentXp: number;
  xpToNextLevel: number;
  characterId: string;
  streak: number;
  lastWorkoutDate: number | null; // Timestamp
  totalWorkouts: number;
  achievements: string[];
}

export interface Character {
  id: string;
  name: string;
  baseImage: string; // URL
  transformations: {
    levelRequired: number;
    name: string;
    image: string;
    auraColor: string;
  }[];
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  type: 'daily' | 'achievement';
}

export interface Template {
  id: string;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Elite';
  exercises: { exerciseId: string; defaultSets: number }[];
}