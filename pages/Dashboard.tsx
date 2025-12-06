import React, { useEffect, useState } from 'react';
import { MockStore } from '../services/mockStore';
import { User, Character, Quest } from '../types';
import { CHARACTERS } from '../constants';
import { Card, ProgressBar, Button, Badge } from '../components/UI';
import { Zap, Trophy, Flame, ChevronRight, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [character, setCharacter] = useState<Character | null>(null);
  const [transformIndex, setTransformIndex] = useState(0);

  useEffect(() => {
    const userData = MockStore.getUser();
    setUser(userData);
    setQuests(MockStore.getQuests());
    const char = CHARACTERS.find(c => c.id === userData.characterId) || CHARACTERS[0];
    setCharacter(char);

    // Determine transformation based on level
    let currentTransform = 0;
    char.transformations.forEach((t, idx) => {
      if (userData.level >= t.levelRequired) currentTransform = idx;
    });
    setTransformIndex(currentTransform);
  }, []);

  const handleClaimQuest = (id: string) => {
    MockStore.completeQuest(id);
    // Refresh local state
    setUser(MockStore.getUser());
    setQuests(MockStore.getQuests());
  };

  if (!user || !character) return <div className="p-8 text-center text-slate-500">Summoning profile...</div>;

  const currentForm = character.transformations[transformIndex];

  return (
    <div className="p-4 space-y-6">
      {/* Character Header */}
      <section className="relative mt-4">
        <div className="flex justify-between items-start mb-2">
           <div>
             <h1 className="text-2xl font-black italic tracking-tighter text-white uppercase flex items-center gap-2">
               {user.name} <span className="text-xs font-normal text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full not-italic">Lvl {user.level}</span>
             </h1>
             <p className={`text-sm font-bold ${currentForm.auraColor} uppercase tracking-widest`}>
               {currentForm.name}
             </p>
           </div>
           <div className="text-right">
              <div className="text-xs text-slate-400 uppercase font-bold">Power Level</div>
              <div className="text-xl font-mono text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">
                {user.currentXp + (user.level * 1000)}
              </div>
           </div>
        </div>

        {/* Character Visual */}
        <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 shadow-2xl group">
            <img 
              src={currentForm.image} 
              alt="Character" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Aura Effect Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80`}></div>
            <div className={`absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t ${currentForm.auraColor.replace('text-', 'from-')}/20 to-transparent`}></div>
            
            <div className="absolute bottom-4 left-4 right-4">
               <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                 <span>XP Progress</span>
                 <span>{user.currentXp} / {user.xpToNextLevel}</span>
               </div>
               <ProgressBar current={user.currentXp} max={user.xpToNextLevel} colorClass="bg-gradient-to-r from-blue-500 to-cyan-400" />
            </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-2 gap-3">
        <Card className="flex flex-col items-center justify-center py-4 border-l-4 border-l-orange-500">
          <Flame className="text-orange-500 mb-1" size={24} />
          <span className="text-2xl font-bold">{user.streak}</span>
          <span className="text-xs text-slate-400 uppercase">Day Streak</span>
        </Card>
        <Card className="flex flex-col items-center justify-center py-4 border-l-4 border-l-blue-500">
          <Trophy className="text-blue-500 mb-1" size={24} />
          <span className="text-2xl font-bold">{user.totalWorkouts}</span>
          <span className="text-xs text-slate-400 uppercase">Sessions</span>
        </Card>
      </section>

      {/* Daily Quests */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Zap className="text-yellow-400" size={18} />
          <h2 className="text-lg font-bold uppercase tracking-wider">Daily Quests</h2>
        </div>
        <div className="space-y-3">
          {quests.map(quest => (
            <Card key={quest.id} className={`flex items-center justify-between p-3 ${quest.completed ? 'opacity-50 border-green-900 bg-green-900/10' : ''}`}>
              <div>
                <h3 className="font-bold text-sm">{quest.title}</h3>
                <p className="text-xs text-slate-400">{quest.description}</p>
                <div className="mt-1">
                  <Badge color="bg-yellow-500/20 text-yellow-500">+{quest.xpReward} XP</Badge>
                </div>
              </div>
              <div>
                {quest.completed ? (
                  <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <Trophy size={16} />
                  </div>
                ) : (
                  <Button size="sm" variant="ghost" className="border border-slate-700 text-xs" onClick={() => handleClaimQuest(quest.id)}>
                    Wait...
                  </Button>
                )}
              </div>
            </Card>
          ))}
          {quests.every(q => q.completed) && (
             <div className="text-center text-xs text-green-400 py-2">All daily quests completed! Great work.</div>
          )}
        </div>
      </section>

      {/* Quick Start Action */}
      <Link to="/workouts" className="block">
        <Button className="w-full py-4 text-lg bg-gradient-to-r from-orange-600 to-red-600 shadow-lg shadow-orange-900/40">
           <Activity className="mr-2" /> Start Training
        </Button>
      </Link>
    </div>
  );
};

export default Dashboard;