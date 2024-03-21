import levenshtein from 'js-levenshtein';
import type { IChurch } from '..';
import { SEARCH_FIELDS } from '../config/constants';

export default function minimumLevenshtein(
  church: IChurch,
  query: string
): number {
  query = query.toLowerCase();
  const distances: number[] = SEARCH_FIELDS.map(field => {
    const value = church[field];
    let text = '';
    if (Array.isArray(value)) {
      text = value.join(' ');
    } else {
      text = value as string;
    }
    text = text.toLowerCase();
    const pieces = text.split(' ');

    return Math.min(...pieces.map(piece => levenshtein(query, piece)));
  });

  return Math.min(...distances);
}
