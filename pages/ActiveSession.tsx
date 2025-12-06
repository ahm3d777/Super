import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { WORKOUT_TEMPLATES, EXERCISES } from '../constants';
import { WorkoutSession, WorkoutExercise, WorkoutSet } from '../types';
import { MockStore } from '../services/mockStore';
import { geminiService } from '../services/geminiService';
import { Card, Button, Input } from '../components/UI';
import { Timer, Check, Plus, X, BrainCircuit, Info } from 'lucide-react';

const ActiveSession: React.FC = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState<WorkoutSession | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [aiTip, setAiTip] = useState<string | null>(null);
  const [loadingTip, setLoadingTip] = useState(false);
  
  // Timer
  useEffect(() => {
    const interval = setInterval(() => setElapsedTime(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize Session
  useEffect(() => {
    if (session) return;
    
    let initialExercises: WorkoutExercise[] = [];
    let name = "Custom Workout";

    if (templateId && templateId !== 'custom') {
      const template = WORKOUT_TEMPLATES.find(t => t.id === templateId);
      if (template) {
        name = template.name;
        initialExercises = template.exercises.map(te => {
          const exDef = EXERCISES.find(e => e.id === te.exerciseId);
          return {
            id: Math.random().toString(36).substr(2, 9),
            exerciseId: te.exerciseId,
            exerciseName: exDef?.name || 'Unknown',
            sets: Array(te.defaultSets).fill(null).map(() => ({
              id: Math.random().toString(36).substr(2, 9),
              reps: 0,
              weight: 0,
              completed: false
            }))
          };
        });
      }
    }

    setSession({
      id: Math.random().toString(36).substr(2, 9),
      templateId,
      name,
      startTime: Date.now(),
      exercises: initialExercises,
      totalVolume: 0,
      xpEarned: 0
    });
  }, [templateId, session]);

  const updateSet = (exerciseIndex: number, setIndex: number, field: 'reps' | 'weight', value: string) => {
    if (!session) return;
    const numValue = parseInt(value) || 0;
    
    const newExercises = [...session.exercises];
    const newSets = [...newExercises[exerciseIndex].sets];
    newSets[setIndex] = { ...newSets[setIndex], [field]: numValue };
    newExercises[exerciseIndex].sets = newSets;

    setSession({ ...session, exercises: newExercises });
  };

  const toggleSetComplete = (exerciseIndex: number, setIndex: number) => {
     if (!session) return;
     const newExercises = [...session.exercises];
     newExercises[exerciseIndex].sets[setIndex].completed = !newExercises[exerciseIndex].sets[setIndex].completed;
     setSession({ ...session, exercises: newExercises });
  };

  const addSet = (exerciseIndex: number) => {
    if (!session) return;
    const newExercises = [...session.exercises];
    newExercises[exerciseIndex].sets.push({
      id: Math.random().toString(36).substr(2, 9),
      reps: 0,
      weight: 0,
      completed: false
    });
    setSession({ ...session, exercises: newExercises });
  };

  const getAiAdvice = async (exerciseName: string) => {
    setLoadingTip(true);
    setAiTip(null);
    const tip = await geminiService.getWorkoutTip(exerciseName);
    setAiTip(tip);
    setLoadingTip(false);
  };

  const finishWorkout = async () => {
    if (!session) return;
    
    // Calculate Stats
    let totalVolume = 0;
    let completedSets = 0;
    
    session.exercises.forEach(ex => {
      ex.sets.forEach(set => {
        if (set.completed) {
          totalVolume += set.weight * set.reps;
          completedSets++;
        }
      });
    });

    const xpEarned = Math.floor((totalVolume * 0.05) + (completedSets * 10) + (elapsedTime / 60 * 2));
    
    const finalSession: WorkoutSession = {
      ...session,
      endTime: Date.now(),
      totalVolume,
      xpEarned
    };

    MockStore.saveWorkout(finalSession);
    
    // Check daily quest
    if (totalVolume > 1000) MockStore.completeQuest('q_2');
    MockStore.completeQuest('q_1');

    navigate('/history');
  };

  if (!session) return <div className="p-8 text-center">Loading battlefield...</div>;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#050508]/95 backdrop-blur border-b border-slate-800 p-4 flex justify-between items-center">
         <div>
            <h2 className="text-white font-bold">{session.name}</h2>
            <div className="flex items-center text-xs text-orange-400 font-mono gap-1">
              <Timer size={12} /> {formatTime(elapsedTime)}
            </div>
         </div>
         <Button size="sm" onClick={finishWorkout}>Finish</Button>
      </div>

      <div className="p-4 space-y-6">
        {session.exercises.map((exercise, exIndex) => (
          <div key={exercise.id} className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-200">{exercise.exerciseName}</h3>
              <button onClick={() => getAiAdvice(exercise.exerciseName)} className="text-xs text-cyan-400 flex items-center gap-1 hover:text-cyan-300">
                <BrainCircuit size={14} /> AI Tip
              </button>
            </div>
            
            {/* AI Tip Box */}
            {aiTip && loadingTip === false && (
              <div className="bg-cyan-900/20 border border-cyan-800/50 p-3 rounded-lg text-sm text-cyan-200 animate-in fade-in slide-in-from-top-2">
                 <div className="flex justify-between items-start">
                    <p>{aiTip}</p>
                    <button onClick={() => setAiTip(null)}><X size={14} /></button>
                 </div>
              </div>
            )}
            
            <div className="space-y-2">
              <div className="grid grid-cols-10 gap-2 text-xs text-slate-500 font-bold uppercase text-center mb-1">
                 <div className="col-span-2">Set</div>
                 <div className="col-span-3">kg</div>
                 <div className="col-span-3">Reps</div>
                 <div className="col-span-2">Done</div>
              </div>

              {exercise.sets.map((set, setIndex) => (
                <div key={set.id} className={`grid grid-cols-10 gap-2 items-center ${set.completed ? 'opacity-50' : ''}`}>
                  <div className="col-span-2 flex justify-center">
                    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-400 font-mono">
                      {setIndex + 1}
                    </div>
                  </div>
                  <div className="col-span-3">
                     <Input 
                       type="number" 
                       placeholder="0" 
                       className="w-full text-center p-1 h-8" 
                       value={set.weight || ''}
                       onChange={(e) => updateSet(exIndex, setIndex, 'weight', e.target.value)}
                     />
                  </div>
                  <div className="col-span-3">
                     <Input 
                        type="number" 
                        placeholder="0" 
                        className="w-full text-center p-1 h-8"
                        value={set.reps || ''}
                        onChange={(e) => updateSet(exIndex, setIndex, 'reps', e.target.value)}
                     />
                  </div>
                  <div className="col-span-2 flex justify-center">
                     <button 
                       onClick={() => toggleSetComplete(exIndex, setIndex)}
                       className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                         set.completed 
                           ? 'bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.4)]' 
                           : 'bg-slate-800 text-slate-600 hover:bg-slate-700'
                       }`}
                     >
                       <Check size={16} strokeWidth={3} />
                     </button>
                  </div>
                </div>
              ))}
              
              <Button 
                variant="ghost" 
                className="w-full text-xs py-1 mt-2 text-slate-500 hover:text-slate-300"
                onClick={() => addSet(exIndex)}
              >
                <Plus size={14} className="mr-1" /> Add Set
              </Button>
            </div>
          </div>
        ))}
        
        {/* Placeholder for adding exercise */}
        <div className="p-4 border border-dashed border-slate-800 rounded-xl text-center text-slate-500 text-sm">
           Select exercises from template only in this demo.
        </div>
      </div>
    </div>
  );
};

export default ActiveSession;