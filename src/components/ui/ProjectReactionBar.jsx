import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Reaction types configuration
 */
const REACTION_TYPES = [
  { id: 'impressive', emoji: '🔥', label: 'Impressive', ariaLabel: 'Mark as impressive' },
  { id: 'innovative', emoji: '💡', label: 'Innovative', ariaLabel: 'Mark as innovative' },
  { id: 'technical', emoji: '⚡', label: 'Technical', ariaLabel: 'Mark as technical' },
  { id: 'creative', emoji: '🎨', label: 'Creative', ariaLabel: 'Mark as creative' },
];

/**
 * Generate a unique visitor ID using browser fingerprinting
 * This creates a consistent ID for each visitor without cookies
 */
const generateVisitorId = () => {
  if (typeof window === 'undefined') return null;
  
  // Check if we already have a stored visitor ID
  const storedId = localStorage.getItem('portfolio_visitor_id');
  if (storedId) return storedId;

  // Generate a fingerprint-based ID
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '14px Arial';
  ctx.fillText('fingerprint', 2, 2);
  const canvasData = canvas.toDataURL();

  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    canvasData,
  ].join('|');

  // Simple hash function
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  const visitorId = `v_${Math.abs(hash).toString(36)}_${Date.now().toString(36)}`;
  localStorage.setItem('portfolio_visitor_id', visitorId);
  return visitorId;
};

/**
 * Check if running in local development
 */
const isLocalDev = () => {
  if (typeof window === 'undefined') return false;
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
};

/**
 * API base URL - auto-detects environment
 */
const getApiUrl = () => {
  return '/api/reactions';
};

/**
 * Single Reaction Button Component
 */
const ReactionButton = ({ 
  emoji, 
  label, 
  ariaLabel, 
  count, 
  isActive, 
  onClick, 
  disabled = false,
  isLoading = false
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = useCallback(() => {
    if (disabled || isLoading) return;
    setIsAnimating(true);
    onClick();
    setTimeout(() => setIsAnimating(false), 300);
  }, [disabled, isLoading, onClick]);

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={disabled || isLoading}
      aria-label={ariaLabel}
      aria-pressed={isActive}
      className={`
        relative flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5
        rounded-full border transition-all duration-300 cursor-pointer
        focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900
        ${isActive 
          ? 'border-teal-500/50 bg-teal-500/10 shadow-[0_0_12px_rgba(20,184,166,0.3)]' 
          : 'border-neutral-700/50 bg-neutral-800/30 hover:border-teal-500/30 hover:bg-neutral-800/50'
        }
        ${(disabled || isLoading) ? 'cursor-not-allowed opacity-50' : ''}
      `}
      whileHover={!disabled && !isLoading ? { scale: 1.05, y: -2 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.95 } : {}}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Emoji with scale animation on click */}
      <motion.span
        className="text-base md:text-lg select-none"
        animate={isAnimating ? { scale: [1, 1.4, 1] } : {}}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {emoji}
      </motion.span>

      {/* Count with fade animation */}
      <AnimatePresence mode="wait">
        <motion.span
          key={count}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className={`
            text-xs md:text-sm font-medium tabular-nums min-w-[1rem] text-center
            ${isActive ? 'text-teal-400' : 'text-neutral-400'}
          `}
        >
          {count}
        </motion.span>
      </AnimatePresence>

      {/* Active glow effect */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full bg-teal-500/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Loading indicator */}
      {isLoading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center rounded-full bg-neutral-900/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-4 h-4 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
        </motion.div>
      )}
    </motion.button>
  );
};

ReactionButton.propTypes = {
  emoji: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

/**
 * ProjectReactionBar Component
 * 
 * Displays emoji reactions for a project with persistent backend storage.
 * Each visitor can only vote once per reaction type per project.
 */
const ProjectReactionBar = ({ projectId, className = '' }) => {
  const [reactionCounts, setReactionCounts] = useState(
    REACTION_TYPES.reduce((acc, r) => ({ ...acc, [r.id]: 0 }), {})
  );
  const [userReactions, setUserReactions] = useState({});
  const [loadingReaction, setLoadingReaction] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [visitorId, setVisitorId] = useState(null);
  const [error, setError] = useState(null);

  // Generate visitor ID on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const id = generateVisitorId();
      setVisitorId(id);
    }
  }, []);

  // Fetch initial reaction counts from API (or use localStorage in local dev)
  useEffect(() => {
    if (!visitorId) return;

    const fetchReactions = async () => {
      // In local development, use localStorage only
      if (isLocalDev()) {
        const fallbackReactions = REACTION_TYPES.reduce((acc, r) => {
          const key = `portfolio_reaction_${projectId}_${r.id}`;
          acc[r.id] = localStorage.getItem(key) === 'true';
          return acc;
        }, {});
        const fallbackCounts = REACTION_TYPES.reduce((acc, r) => {
          const countKey = `portfolio_count_${projectId}_${r.id}`;
          acc[r.id] = parseInt(localStorage.getItem(countKey) || '0', 10);
          return acc;
        }, {});
        setUserReactions(fallbackReactions);
        setReactionCounts(fallbackCounts);
        setIsInitialLoading(false);
        return;
      }

      try {
        const url = `${getApiUrl()}?projectId=${encodeURIComponent(projectId)}&visitorId=${encodeURIComponent(visitorId)}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch reactions');
        }

        const data = await response.json();
        
        setReactionCounts(data.counts || {});
        setUserReactions(data.userReactions || {});
        setError(null);
      } catch (err) {
        console.error('Error fetching reactions:', err);
        // Fall back to localStorage if API fails
        const fallbackReactions = REACTION_TYPES.reduce((acc, r) => {
          const key = `portfolio_reaction_${projectId}_${r.id}`;
          acc[r.id] = localStorage.getItem(key) === 'true';
          return acc;
        }, {});
        const fallbackCounts = REACTION_TYPES.reduce((acc, r) => {
          const countKey = `portfolio_count_${projectId}_${r.id}`;
          acc[r.id] = parseInt(localStorage.getItem(countKey) || '0', 10);
          return acc;
        }, {});
        setUserReactions(fallbackReactions);
        setReactionCounts(fallbackCounts);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchReactions();
  }, [projectId, visitorId]);

  /**
   * Handle reaction click - toggles reaction (add or remove)
   */
  const handleReaction = useCallback(async (reactionId) => {
    if (loadingReaction || !visitorId) return;

    const isCurrentlyActive = userReactions[reactionId];
    setLoadingReaction(reactionId);

    // Optimistic update
    const currentCount = reactionCounts[reactionId] || 0;
    const newCount = isCurrentlyActive ? Math.max(0, currentCount - 1) : currentCount + 1;
    
    setReactionCounts(prev => ({
      ...prev,
      [reactionId]: newCount,
    }));
    setUserReactions(prev => ({
      ...prev,
      [reactionId]: !isCurrentlyActive,
    }));

    // Save to localStorage
    if (isCurrentlyActive) {
      localStorage.removeItem(`portfolio_reaction_${projectId}_${reactionId}`);
    } else {
      localStorage.setItem(`portfolio_reaction_${projectId}_${reactionId}`, 'true');
    }
    localStorage.setItem(`portfolio_count_${projectId}_${reactionId}`, String(newCount));

    // In local development, skip API call
    if (isLocalDev()) {
      setLoadingReaction(null);
      return;
    }

    try {
      const response = await fetch(getApiUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId,
          reactionId,
          visitorId,
          action: isCurrentlyActive ? 'remove' : 'add',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save reaction');
      }

      const data = await response.json();
      
      // Update with actual count from server
      if (data.newCount !== undefined) {
        setReactionCounts(prev => ({
          ...prev,
          [reactionId]: data.newCount,
        }));
        localStorage.setItem(`portfolio_count_${projectId}_${reactionId}`, String(data.newCount));
      }
    } catch (err) {
      console.error('Error saving reaction:', err);
      // Revert optimistic update on error
      setReactionCounts(prev => ({
        ...prev,
        [reactionId]: currentCount,
      }));
      setUserReactions(prev => ({
        ...prev,
        [reactionId]: isCurrentlyActive,
      }));
      // Revert localStorage
      if (isCurrentlyActive) {
        localStorage.setItem(`portfolio_reaction_${projectId}_${reactionId}`, 'true');
      } else {
        localStorage.removeItem(`portfolio_reaction_${projectId}_${reactionId}`);
      }
      localStorage.setItem(`portfolio_count_${projectId}_${reactionId}`, String(currentCount));
    } finally {
      setLoadingReaction(null);
    }
  }, [projectId, userReactions, loadingReaction, visitorId, reactionCounts]);

  // Memoize reaction buttons
  const reactionButtons = useMemo(() => (
    REACTION_TYPES.map((reaction) => (
      <ReactionButton
        key={reaction.id}
        emoji={reaction.emoji}
        label={reaction.label}
        ariaLabel={`${reaction.ariaLabel} for this project`}
        count={reactionCounts[reaction.id] || 0}
        isActive={userReactions[reaction.id] || false}
        onClick={() => handleReaction(reaction.id)}
        disabled={isInitialLoading}
        isLoading={loadingReaction === reaction.id}
      />
    ))
  ), [reactionCounts, userReactions, handleReaction, isInitialLoading, loadingReaction]);

  return (
    <motion.div
      className={`reaction-bar ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      role="group"
      aria-label="Project reactions"
    >
      {/* Label */}
      <motion.p
        className="mb-2 md:mb-3 text-[10px] md:text-xs text-neutral-500 tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        What do you think?
      </motion.p>

      {/* Reactions container */}
      <div 
        className="flex flex-wrap gap-2 md:gap-3"
        role="toolbar"
        aria-label="Reaction options"
      >
        {isInitialLoading ? (
          // Loading skeleton
          REACTION_TYPES.map((reaction) => (
            <div
              key={reaction.id}
              className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-full border border-neutral-700/50 bg-neutral-800/30 animate-pulse"
            >
              <span className="text-base md:text-lg opacity-50">{reaction.emoji}</span>
              <span className="w-4 h-4 bg-neutral-700 rounded" />
            </div>
          ))
        ) : (
          reactionButtons
        )}
      </div>

      {/* Error message */}
      {error && (
        <motion.p
          className="mt-2 text-[10px] text-red-400/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

ProjectReactionBar.propTypes = {
  /** Unique identifier for the project */
  projectId: PropTypes.string.isRequired,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default ProjectReactionBar;
