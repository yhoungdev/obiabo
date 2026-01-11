import { useState, useEffect } from 'react';

interface Reaction {
  emoji: string;
  count: number;
  hasReacted: boolean;
}

interface BlogReactionsProps {
  postId: string;
}

interface EmojiExplosion {
  id: number;
  emoji: string;
  x: number;
  y: number;
}

const REACTIONS = [
  { emoji: '👍', label: 'Like' },
  { emoji: '❤️', label: 'Love' },
  { emoji: '🔥', label: 'Fire' },
  { emoji: '🎉', label: 'Celebrate' },
  { emoji: '🤔', label: 'Thinking' },
  { emoji: '💡', label: 'Insightful' },
];

export default function BlogReactions({ postId }: BlogReactionsProps) {
  const [reactions, setReactions] = useState<Record<string, Reaction>>({});
  const [loading, setLoading] = useState(true);
  const [explosions, setExplosions] = useState<EmojiExplosion[]>([]);

  useEffect(() => {
    fetchReactions();
  }, [postId]);

  const triggerExplosion = (emoji: string, event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
    
    const newExplosion: EmojiExplosion = {
      id: Date.now(),
      emoji,
      x,
      y,
    };
    
    setExplosions(prev => [...prev, newExplosion]);
    
    
    setTimeout(() => {
      setExplosions(prev => prev.filter(e => e.id !== newExplosion.id));
    }, 3000);
  };

  const fetchReactions = async () => {
    try {
      const response = await fetch(`/api/reactions?postId=${postId}`);
      const data = await response.json();
      setReactions(data.reactions || {});
    } catch (error) {
      console.error('Failed to fetch reactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReaction = async (emoji: string, event: React.MouseEvent<HTMLButtonElement>) => {
    const currentReaction = reactions[emoji];
    const hasReacted = currentReaction?.hasReacted;

    
    if (!hasReacted) {
      triggerExplosion(emoji, event);
    }
    
    setReactions(prev => ({
      ...prev,
      [emoji]: {
        emoji,
        count: hasReacted 
          ? Math.max(0, (prev[emoji]?.count || 0) - 1)
          : (prev[emoji]?.count || 0) + 1,
        hasReacted: !hasReacted,
      },
    }));

    try {
      const response = await fetch('/api/reactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, emoji, remove: hasReacted }),
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        console.error('Reaction API error:', responseData);
        
        setReactions(prev => ({
          ...prev,
          [emoji]: {
            emoji,
            count: hasReacted 
              ? (prev[emoji]?.count || 0) + 1
              : Math.max(0, (prev[emoji]?.count || 0) - 1),
            hasReacted: hasReacted,
          },
        }));
      }
    } catch (error) {
      console.error('Failed to update reaction:', error);
      
      fetchReactions();
    }
  };

  if (loading) {
    return (
      <div className="flex gap-2 items-center justify-center py-4">
        <div className="text-sm text-gray-400">Loading reactions...</div>
      </div>
    );
  }

  return (
    <div className="border-t border-b border-gray-700 py-6 my-8 reactions-container relative overflow-visible">
   
      {explosions.map((explosion) => (
        Array.from({ length: 25 }).map((_, i) => {
          const angle = (i / 25) * 360 + (explosion.id % 100) * 0.3;
          const distance = 80 + (i * 7) % 120;
          const delay = (i * 0.01);
          const duration = 0.6 + (i * 0.02) % 0.4;
          const rotation = (i * 30) - 360;
          const scale = 0.8 + (i * 0.025) % 0.6;
          
          return (
            <span
              key={`${explosion.id}-${i}`}
              className="fixed text-2xl pointer-events-none"
              style={{
                left: `${explosion.x}%`,
                top: `${explosion.y}%`,
                zIndex: 9999,
                animation: `emoji-boom ${duration}s ease-out ${delay}s forwards`,
                '--angle': `${angle}deg`,
                '--distance': `${distance}px`,
                '--rotation': `${rotation}deg`,
                '--scale': scale,
                '--gravity': `${50 + i * 2}px`,
              } as React.CSSProperties}
            >
              {explosion.emoji}
            </span>
          );
        })
      ))}
      
      <style>{`
        @keyframes emoji-boom {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.5) rotate(0deg);
          }
          20% {
            opacity: 1;
            transform: translate(
              calc(-50% + calc(cos(var(--angle)) * var(--distance) * 0.6)),
              calc(-50% + calc(sin(var(--angle)) * var(--distance) * 0.6))
            ) scale(var(--scale)) rotate(calc(var(--rotation) * 0.3));
          }
          100% {
            opacity: 0;
            transform: translate(
              calc(-50% + calc(cos(var(--angle)) * var(--distance))),
              calc(-50% + calc(sin(var(--angle)) * var(--distance)) + var(--gravity))
            ) scale(calc(var(--scale) * 0.5)) rotate(var(--rotation));
          }
        }
      `}</style>
      
      <h3 className="text-lg font-semibold mb-4 text-gray-100">Reactions</h3>
      <div className="flex flex-wrap gap-3">
        {REACTIONS.map(({ emoji, label }) => {
          const reaction = reactions[emoji];
          const count = reaction?.count || 0;
          const hasReacted = reaction?.hasReacted || false;

          return (
            <button
              key={emoji}
              onClick={(e) => handleReaction(emoji, e)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full 
                border transition-all duration-200
                ${hasReacted 
                  ? 'border-blue-500 bg-blue-500/10 text-blue-400' 
                  : 'border-gray-600 hover:border-gray-500 text-gray-300 hover:text-gray-200'
                }
                hover:scale-105 active:scale-95
              `}
              title={label}
              aria-label={`${label} reaction${count > 0 ? `, ${count} reactions` : ''}`}
            >
              <span className="text-xl bg-transparent">{emoji}</span>
              {count > 0 && (
                <span className={`text-sm font-medium bg-transparent ${hasReacted ? 'text-blue-400' : 'text-gray-400'}`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}