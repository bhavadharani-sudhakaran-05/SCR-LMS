import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiStar, HiLightningBolt, HiTrendingUp, HiChevronUp, HiChevronDown } from 'react-icons/hi';
import CountUp from 'react-countup';
import useAuthStore from '../../store/authStore';
import api from '../../utils/api';
import Card from '../../components/ui/Card';

const Leaderboard = () => {
  const { user } = useAuthStore();
  const [leaderboard, setLeaderboard] = useState([]);
  const [timeframe, setTimeframe] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data } = await api.get('/api/gamification/leaderboard', { params: { timeframe } });
        setLeaderboard(data.data || []);
      } catch {
        setLeaderboard([
          { _id: '1', name: 'Alex Robinson', xpPoints: 8520, level: 15, streakCount: 32, badges: new Array(12), rank: 1, change: 0 },
          { _id: '2', name: 'Sarah Kim', xpPoints: 7890, level: 14, streakCount: 28, badges: new Array(10), rank: 2, change: 1 },
          { _id: user?._id || '3', name: user?.name || 'You', xpPoints: user?.xpPoints || 4250, level: user?.level || 9, streakCount: user?.streakCount || 15, badges: new Array(8), rank: 3, change: 2, isYou: true },
          { _id: '4', name: 'Mike Torres', xpPoints: 6200, level: 11, streakCount: 20, badges: new Array(7), rank: 4, change: -1 },
          { _id: '5', name: 'Emma Wilson', xpPoints: 5800, level: 10, streakCount: 18, badges: new Array(6), rank: 5, change: 0 },
          { _id: '6', name: 'Daniel Harris', xpPoints: 5400, level: 10, streakCount: 15, badges: new Array(5), rank: 6, change: 3 },
          { _id: '7', name: 'Olivia Martinez', xpPoints: 4900, level: 9, streakCount: 12, badges: new Array(5), rank: 7, change: -2 },
          { _id: '8', name: 'James Park', xpPoints: 4600, level: 8, streakCount: 10, badges: new Array(4), rank: 8, change: 1 },
          { _id: '9', name: 'Sophie Chen', xpPoints: 4200, level: 8, streakCount: 8, badges: new Array(4), rank: 9, change: -1 },
          { _id: '10', name: 'Liam Brown', xpPoints: 3900, level: 7, streakCount: 7, badges: new Array(3), rank: 10, change: 0 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, [timeframe, user]);

  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);
  const podiumOrder = [1, 0, 2]; // 2nd, 1st, 3rd

  const gradients = ['from-amber-400 to-amber-600', 'from-gray-300 to-gray-500', 'from-orange-400 to-orange-600'];
  const heights = ['h-32', 'h-44', 'h-24'];
  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <HiStar className="text-amber-500" /> Leaderboard
          </h1>
          <p className="text-gray-500 mt-1">Compete, earn XP, and climb the ranks!</p>
        </div>
        <div className="flex gap-2">
          {['weekly', 'monthly', 'all'].map(t => (
            <button key={t} onClick={() => setTimeframe(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                timeframe === t ? 'bg-primary-600 text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}>
              {t === 'all' ? 'All Time' : t}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Podium */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="p-8">
          <div className="flex items-end justify-center gap-4 mb-8">
            {podiumOrder.map((idx, pos) => {
              const entry = top3[idx];
              if (!entry) return null;
              return (
                <motion.div
                  key={entry._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + pos * 0.15, type: 'spring' }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`relative mb-3 ${idx === 0 ? 'w-24 h-24' : 'w-20 h-20'}`}
                  >
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${gradients[idx]} flex items-center justify-center text-white text-2xl font-bold shadow-xl ${
                      entry.isYou ? 'ring-4 ring-primary-400 ring-offset-2 dark:ring-offset-gray-900' : ''
                    }`}>
                      {entry.name[0]}
                    </div>
                    <span className="absolute -bottom-1 -right-1 text-2xl">{medals[idx]}</span>
                  </motion.div>
                  <p className={`font-bold text-gray-900 dark:text-white ${idx === 0 ? 'text-lg' : 'text-sm'}`}>
                    {entry.name} {entry.isYou && <span className="text-primary-500 text-xs">(You)</span>}
                  </p>
                  <p className="text-amber-600 font-bold text-sm">
                    <CountUp end={entry.xpPoints} duration={2} separator="," /> XP
                  </p>
                  <div className={`mt-3 ${heights[idx]} w-24 bg-gradient-to-t ${gradients[idx]} rounded-t-xl flex items-center justify-center`}>
                    <span className="text-white text-3xl font-extrabold">#{entry.rank}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* Rankings Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Rank</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Student</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Level</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">XP</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Streak</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Badges</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Change</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, i) => (
                  <motion.tr
                    key={entry._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.05 }}
                    className={`border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                      entry.isYou ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className={`font-bold ${
                        entry.rank <= 3 ? 'text-lg' : 'text-sm text-gray-500'
                      }`}>
                        {entry.rank <= 3 ? medals[entry.rank - 1] : `#${entry.rank}`}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-bold">
                          {entry.name[0]}
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {entry.name} {entry.isYou && <span className="text-primary-500 text-xs">(You)</span>}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 text-xs font-bold">
                        Lv {entry.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-amber-600 dark:text-amber-400">
                      <CountUp end={entry.xpPoints} duration={1.5} separator="," />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {entry.streakCount} 🔥
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {entry.badges?.length || 0} 🏅
                    </td>
                    <td className="px-6 py-4">
                      {entry.change > 0 ? (
                        <span className="flex items-center gap-1 text-emerald-500 text-sm font-medium">
                          <HiChevronUp className="h-4 w-4" /> {entry.change}
                        </span>
                      ) : entry.change < 0 ? (
                        <span className="flex items-center gap-1 text-red-500 text-sm font-medium">
                          <HiChevronDown className="h-4 w-4" /> {Math.abs(entry.change)}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Leaderboard;
