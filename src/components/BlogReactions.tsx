import { useState, useEffect } from 'react';

interface Reaction {
  emoji: string;
  count: number;
  hasReacted: boolean;
}

interface BlogReactionsProps {
  postId: string;
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

  useEffect(() => {
    fetchReactions();
  }, [postId]);

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

  const handleReaction = async (emoji: string) => {
    const currentReaction = reactions[emoji];
    const hasReacted = currentReaction?.hasReacted;

    // Optimistic update
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
        // Revert on error
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
      // Revert on error
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
    <div className="border-t border-b border-gray-700 py-6 my-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-100">Reactions</h3>
      <div className="flex flex-wrap gap-3">
        {REACTIONS.map(({ emoji, label }) => {
          const reaction = reactions[emoji];
          const count = reaction?.count || 0;
          const hasReacted = reaction?.hasReacted || false;

          return (
            <button
              key={emoji}
              onClick={() => handleReaction(emoji)}
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
              <span className="text-xl">{emoji}</span>
              {count > 0 && (
                <span className={`text-sm font-medium ${hasReacted ? 'text-blue-400' : 'text-gray-400'}`}>
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
