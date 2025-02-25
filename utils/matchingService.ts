import { UserProfile } from '../types';
import { calculateDistance } from './locationService';

interface MatchScore {
  userId: string;
  score: number;
  distance: number;
  sharedInterests: string[];
}

export const calculateMatchScore = (
  user: UserProfile,
  potentialMatch: UserProfile
): MatchScore | null => {
  try {
    // Calculate distance
    const distance = calculateDistance(
      user.location.latitude,
      user.location.longitude,
      potentialMatch.location.latitude,
      potentialMatch.location.longitude
    );

    // Check if within max distance preference
    if (distance > user.searchPreferences.maxDistance) {
      return null;
    }

    // Calculate shared interests
    const sharedInterests = user.interests.filter(interest =>
      potentialMatch.interests.includes(interest)
    );

    // Base score starts at 0
    let score = 0;

    // Interest match score (up to 50 points)
    const interestScore = (sharedInterests.length / Math.max(user.interests.length, potentialMatch.interests.length)) * 50;
    score += interestScore;

    // Distance score (up to 30 points)
    // Closer distances get higher scores
    const distanceScore = ((user.searchPreferences.maxDistance - distance) / user.searchPreferences.maxDistance) * 30;
    score += distanceScore;

    // Marital status and orientation compatibility (20 points)
    if (user.searchPreferences.maritalStatuses.includes(potentialMatch.maritalStatus)) {
      score += 10;
    }
    if (user.searchPreferences.orientations.includes(potentialMatch.orientation)) {
      score += 10;
    }

    return {
      userId: potentialMatch.id,
      score,
      distance,
      sharedInterests,
    };
  } catch (error) {
    console.error('Error calculating match score:', error);
    return null;
  }
};

export const findMatches = (
  user: UserProfile,
  potentialMatches: UserProfile[]
): UserProfile[] => {
  // Calculate scores for all potential matches
  const matchScores = potentialMatches
    .filter(match => match.id !== user.id) // Exclude self
    .map(match => ({
      profile: match,
      matchScore: calculateMatchScore(user, match),
    }))
    .filter(result => result.matchScore !== null)
    .sort((a, b) => (b.matchScore?.score || 0) - (a.matchScore?.score || 0));

  // Return sorted profiles
  return matchScores.map(result => result.profile);
};