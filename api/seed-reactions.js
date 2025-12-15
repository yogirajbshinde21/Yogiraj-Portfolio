import { kv } from '@vercel/kv';

/**
 * One-time seed script to add initial reaction counts
 * Visit: /api/seed-reactions?secret=your-secret-key
 * 
 * This will add realistic initial counts to make the feature look established
 */

const PROJECTS = [
  { id: 'stockest', name: 'Stockest' },
  { id: 'chatwise', name: 'ChatWise' },
  { id: 'mealmatch', name: 'MealMatch' },
  { id: 'homedecore', name: 'HomeDecore' },
];

const REACTIONS = ['impressive', 'innovative', 'technical', 'creative'];

// Generate realistic random counts (between 3-12 per reaction)
const getRandomCount = () => Math.floor(Math.random() * 10) + 3;

export default async function handler(req, res) {
  // Simple secret key protection (optional - remove if you don't want it)
  const { secret } = req.query;
  
  // You can set any secret or remove this check
  if (secret !== 'seed-portfolio-2024') {
    return res.status(403).json({ 
      error: 'Forbidden', 
      message: 'Add ?secret=seed-portfolio-2024 to the URL' 
    });
  }

  try {
    const results = [];

    for (const project of PROJECTS) {
      const countsKey = `reactions:${project.id}`;
      
      // Check if already seeded
      const existing = await kv.hgetall(countsKey);
      if (existing && Object.keys(existing).length > 0) {
        results.push({
          project: project.name,
          status: 'skipped',
          message: 'Already has data',
          counts: existing
        });
        continue;
      }

      // Generate random counts for each reaction
      const counts = {};
      for (const reaction of REACTIONS) {
        counts[reaction] = getRandomCount();
      }

      // Save to KV
      await kv.hset(countsKey, counts);

      results.push({
        project: project.name,
        status: 'seeded',
        counts: counts
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Seed completed',
      results: results,
      note: 'Refresh your site to see the initial counts!'
    });

  } catch (error) {
    console.error('Seed error:', error);
    return res.status(500).json({ 
      error: 'Seed failed', 
      message: error.message 
    });
  }
}
