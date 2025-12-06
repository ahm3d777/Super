import { User, WorkoutSession, Quest } from '../types';
import { DAILY_QUESTS } from '../constants';

const STORAGE_KEYS = {
  USER: 'arise_user',
  WORKOUTS: 'arise_workouts',
  QUESTS: 'arise_quests',
};

// Initial Mock User
const INITIAL_USER: User = {
  id: 'user_1',
  name: 'Warrior',
  email: 'warrior@capsulecorp.com',
  level: 1,
  currentXp: 0,
  xpToNextLevel: 1000,
  characterId: 'char_1',
  streak: 0,
  lastWorkoutDate: null,
  totalWorkouts: 0,
  achievements: [],
};

export class MockStore {
  static getUser(): User {
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    return stored ? JSON.parse(stored) : INITIAL_USER;
  }

  static saveUser(user: User): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  static getWorkouts(): WorkoutSession[] {
    const stored = localStorage.getItem(STORAGE_KEYS.WORKOUTS);
    return stored ? JSON.parse(stored) : [];
  }

  static saveWorkout(workout: WorkoutSession): void {
    const workouts = this.getWorkouts();
    workouts.push(workout);
    localStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(workouts));

    // Update User Stats
    const user = this.getUser();
    user.totalWorkouts += 1;
    user.currentXp += workout.xpEarned;
    user.lastWorkoutDate = Date.now();
    
    // Simple level up logic
    while (user.currentXp >= user.xpToNextLevel) {
        user.currentXp -= user.xpToNextLevel;
        user.level += 1;
        user.xpToNextLevel = Math.floor(user.xpToNextLevel * 1.2);
    }

    this.saveUser(user);
  }

  static getQuests(): Quest[] {
    const stored = localStorage.getItem(STORAGE_KEYS.QUESTS);
    if (stored) return JSON.parse(stored);
    
    // Initialize if empty
    localStorage.setItem(STORAGE_KEYS.QUESTS, JSON.stringify(DAILY_QUESTS));
    return DAILY_QUESTS;
  }

  static completeQuest(questId: string): void {
    const quests = this.getQuests();
    const quest = quests.find(q => q.id === questId);
    if (quest && !quest.completed) {
      quest.completed = true;
      localStorage.setItem(STORAGE_KEYS.QUESTS, JSON.stringify(quests));
      
      const user = this.getUser();
      user.currentXp += quest.xpReward;
       // Check Level up again
      while (user.currentXp >= user.xpToNextLevel) {
        user.currentXp -= user.xpToNextLevel;
        user.level += 1;
        user.xpToNextLevel = Math.floor(user.xpToNextLevel * 1.2);
      }
      this.saveUser(user);
    }
  }

  static resetData(): void {
    localStorage.clear();
    window.location.reload();
  }
}