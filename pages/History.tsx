import React, { useEffect, useState } from 'react';
import { WorkoutSession } from '../types';
import { MockStore } from '../services/mockStore';
import { Card, Badge } from '../components/UI';
import { Calendar, Dumbbell, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const History: React.FC = () => {
  const [workouts, setWorkouts] = useState<WorkoutSession[]>([]);

  useEffect(() => {
    const data = MockStore.getWorkouts();
    // Sort descending
    setWorkouts(data.reverse());
  }, []);

  // Prepare Chart Data (Last 7 workouts volume)
  const chartData = [...workouts].reverse().slice(-7).map((w, i) => ({
    name: i.toString(),
    volume: w.totalVolume,
    xp: w.xpEarned
  }));

  return (
    <div className="p-4 space-y-6 pt-6">
      <h1 className="text-2xl font-black uppercase tracking-tighter text-white">Battle Log</h1>

      {/* Chart */}
      {chartData.length > 1 && (
        <Card className="h-64 p-2 relative overflow-hidden">
          <h3 className="text-xs font-bold text-slate-400 absolute top-4 left-4 z-10">Volume Progression</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="volume" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorVol)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* List */}
      <div className="space-y-4">
        {workouts.length === 0 ? (
          <div className="text-center text-slate-500 py-10">
            <p>No battles recorded yet.</p>
            <p className="text-sm">Start a workout to begin your legacy.</p>
          </div>
        ) : (
          workouts.map(workout => (
            <Card key={workout.id} className="relative group hover:border-slate-700 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                   <h3 className="font-bold text-white text-lg">{workout.name}</h3>
                   <p className="text-xs text-slate-400 flex items-center gap-1">
                     <Calendar size={12} /> {new Date(workout.startTime).toLocaleDateString()} 
                     <span className="mx-1">•</span> 
                     {workout.endTime && Math.floor((workout.endTime - workout.startTime) / 60000)} min
                   </p>
                </div>
                <Badge color="bg-orange-500/10 text-orange-500 border border-orange-500/20">
                  +{workout.xpEarned} XP
                </Badge>
              </div>
              
              <div className="flex gap-4 mt-3">
                 <div className="text-center">
                    <p className="text-xs text-slate-500 uppercase">Volume</p>
                    <p className="font-mono font-bold text-slate-200">{workout.totalVolume}kg</p>
                 </div>
                 <div className="text-center">
                    <p className="text-xs text-slate-500 uppercase">Exercises</p>
                    <p className="font-mono font-bold text-slate-200">{workout.exercises.length}</p>
                 </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default History;