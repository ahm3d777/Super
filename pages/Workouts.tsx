import React from 'react';
import { WORKOUT_TEMPLATES } from '../constants';
import { Card, Badge, Button } from '../components/UI';
import { Dumbbell, ChevronRight, Swords } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Workouts: React.FC = () => {
  const navigate = useNavigate();

  const startWorkout = (templateId: string) => {
    navigate(`/active/${templateId}`);
  };

  const startCustom = () => {
     navigate(`/active/custom`);
  };

  return (
    <div className="p-4 space-y-6 pt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black uppercase tracking-tighter text-white">Battle Plans</h1>
        <Swords className="text-slate-500" />
      </div>

      <div className="space-y-4">
        {WORKOUT_TEMPLATES.map((template) => (
          <Card 
            key={template.id} 
            className="group cursor-pointer hover:border-orange-500/50 transition-all active:scale-[0.98] relative overflow-hidden"
            onClick={() => startWorkout(template.id)}
          >
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
               <Dumbbell size={64} />
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-2">
                <Badge color={
                  template.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                  template.difficulty === 'Intermediate' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-red-500/20 text-red-400'
                }>
                  {template.difficulty}
                </Badge>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">{template.name}</h3>
              <p className="text-sm text-slate-400 mt-1 mb-4">{template.description}</p>
              
              <div className="flex items-center text-xs text-slate-500 font-mono">
                <span>{template.exercises.length} Exercises</span>
                <span className="mx-2">•</span>
                <span>Est. 45m</span>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
               <ChevronRight />
            </div>
          </Card>
        ))}

        <button 
          onClick={startCustom}
          className="w-full py-4 border-2 border-dashed border-slate-700 rounded-xl text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-800/50 transition-all flex items-center justify-center gap-2"
        >
          <Dumbbell size={20} />
          Create Custom Routine
        </button>
      </div>
    </div>
  );
};

export default Workouts;