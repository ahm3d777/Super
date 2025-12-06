import React, { useState } from 'react';
import { MockStore } from '../services/mockStore';
import { CHARACTERS } from '../constants';
import { Card, Button } from '../components/UI';
import { LogOut, Trash2, User as UserIcon } from 'lucide-react';

const Profile: React.FC = () => {
  const [user, setUser] = useState(MockStore.getUser());

  const handleReset = () => {
    if (confirm("Are you sure? This will wipe your legacy.")) {
      MockStore.resetData();
    }
  };

  const changeCharacter = (id: string) => {
    const newUser = { ...user, characterId: id };
    MockStore.saveUser(newUser);
    setUser(newUser);
  };

  return (
    <div className="p-4 space-y-6 pt-6">
       <h1 className="text-2xl font-black uppercase tracking-tighter text-white">Identity</h1>

       <Card className="p-6 text-center border-orange-500/30 bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="w-24 h-24 bg-slate-800 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]">
             <UserIcon size={40} className="text-orange-500" />
          </div>
          <h2 className="text-xl font-bold text-white">{user.name}</h2>
          <p className="text-slate-400 text-sm">{user.email}</p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
             <div>
               <div className="text-xs text-slate-500 uppercase">Level</div>
               <div className="font-mono text-lg text-white">{user.level}</div>
             </div>
             <div>
               <div className="text-xs text-slate-500 uppercase">Workouts</div>
               <div className="font-mono text-lg text-white">{user.totalWorkouts}</div>
             </div>
             <div>
               <div className="text-xs text-slate-500 uppercase">Streak</div>
               <div className="font-mono text-lg text-white">{user.streak}</div>
             </div>
          </div>
       </Card>

       <section>
          <h3 className="text-lg font-bold text-slate-300 mb-3">Choose Avatar</h3>
          <div className="grid grid-cols-2 gap-3">
             {CHARACTERS.map(char => (
               <div 
                 key={char.id}
                 onClick={() => changeCharacter(char.id)}
                 className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${user.characterId === char.id ? 'border-orange-500 scale-105 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'border-slate-800 opacity-60 hover:opacity-100'}`}
               >
                 <img src={char.baseImage} alt={char.name} className="w-full h-32 object-cover" />
                 <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-xs font-bold text-center">
                   {char.name.split(',')[0]}
                 </div>
               </div>
             ))}
          </div>
       </section>

       <section className="pt-8 space-y-3">
          <Button variant="secondary" className="w-full justify-start" onClick={() => alert("Settings would go here")}>
             Settings
          </Button>
          <Button variant="danger" className="w-full justify-start" onClick={handleReset}>
             <Trash2 size={16} /> Reset Progress
          </Button>
       </section>
    </div>
  );
};

export default Profile;