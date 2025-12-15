import { kv } from '@vercel/kv';

/**
 * Vercel Serverless API for Project Reactions
 * 
 * Endpoints:
 * GET /api/reactions?projectId=xxx - Get all reaction counts for a project
 * POST /api/reactions - Add a reaction (requires projectId, reactionId, visitorId in body)
 * 
 * Data structure in KV:
 * - reactions:{projectId} -> { impressive: 5, innovative: 3, technical: 7, creative: 2 }
 * - voted:{projectId}:{visitorId}:{reactionId} -> "1" (flag that visitor voted)
 */

const VALID_REACTIONS = ['impressive', 'innovative', 'technical', 'creative'];

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  // Set CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  try {
    if (req.method === 'GET') {
      return await handleGet(req, res);
    } else if (req.method === 'POST') {
      return await handlePost(req, res);
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * GET handler - Fetch reaction counts for a project
 */
async function handleGet(req, res) {
  const { projectId, visitorId } = req.query;

  if (!projectId) {
    return res.status(400).json({ error: 'projectId is required' });
  }

  // Get reaction counts
  const countsKey = `reactions:${projectId}`;
  let counts = await kv.hgetall(countsKey);

  // Initialize with zeros if no data exists
  if (!counts || Object.keys(counts).length === 0) {
    counts = VALID_REACTIONS.reduce((acc, r) => ({ ...acc, [r]: 0 }), {});
  }

  // If visitorId provided, also return which reactions they've made
  let userReactions = {};
  if (visitorId) {
    const voteChecks = await Promise.all(
      VALID_REACTIONS.map(async (reactionId) => {
        const voteKey = `voted:${projectId}:${visitorId}:${reactionId}`;
        const hasVoted = await kv.get(voteKey);
        return { reactionId, hasVoted: !!hasVoted };
      })
    );
    userReactions = voteChecks.reduce((acc, { reactionId, hasVoted }) => {
      acc[reactionId] = hasVoted;
      return acc;
    }, {});
  }

  return res.status(200).json({
    counts,
    userReactions,
    projectId,
  });
}

/**
 * POST handler - Toggle a reaction (add or remove)
 */
async function handlePost(req, res) {
  const { projectId, reactionId, visitorId, action } = req.body;

  // Validate required fields
  if (!projectId || !reactionId || !visitorId) {
    return res.status(400).json({ 
      error: 'projectId, reactionId, and visitorId are required' 
    });
  }

  // Validate reaction type
  if (!VALID_REACTIONS.includes(reactionId)) {
    return res.status(400).json({ 
      error: `Invalid reactionId. Must be one of: ${VALID_REACTIONS.join(', ')}` 
    });
  }

  const voteKey = `voted:${projectId}:${visitorId}:${reactionId}`;
  const countsKey = `reactions:${projectId}`;
  const alreadyVoted = await kv.get(voteKey);

  // Determine action: toggle by default, or use explicit action
  const shouldAdd = action === 'add' ? true : action === 'remove' ? false : !alreadyVoted;

  if (shouldAdd && !alreadyVoted) {
    // Add reaction
    await kv.set(voteKey, '1');
    const newCount = await kv.hincrby(countsKey, reactionId, 1);

    return res.status(200).json({
      success: true,
      action: 'added',
      projectId,
      reactionId,
      newCount,
      message: 'Reaction added successfully'
    });
  } else if (!shouldAdd && alreadyVoted) {
    // Remove reaction
    await kv.del(voteKey);
    const newCount = await kv.hincrby(countsKey, reactionId, -1);
    
    // Ensure count doesn't go below 0
    const finalCount = Math.max(0, newCount);
    if (newCount < 0) {
      await kv.hset(countsKey, { [reactionId]: 0 });
    }

    return res.status(200).json({
      success: true,
      action: 'removed',
      projectId,
      reactionId,
      newCount: finalCount,
      message: 'Reaction removed successfully'
    });
  } else {
    // No change needed
    const counts = await kv.hgetall(countsKey) || {};
    return res.status(200).json({
      success: true,
      action: 'unchanged',
      projectId,
      reactionId,
      newCount: counts[reactionId] || 0,
      message: alreadyVoted ? 'Already reacted' : 'Not reacted yet'
    });
  }
}
