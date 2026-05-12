#!/usr/bin/env node
/**
 * Script: importMovies.mjs
 * Usage:
 *   1. Install deps: `npm install firebase-admin` in the project root.
 *   2. Set env var `GOOGLE_APPLICATION_CREDENTIALS` to your service account JSON path.
 *   3. Run: `node scripts/importMovies.mjs "src/app/data/Dataset 50 movies.csv"`
 *
 * The script parses the CSV and writes documents to Firestore collection `movies`.
 * Adjust `mapRowToMovie()` if your CSV has different columns.
 */

import fs from 'fs/promises';
import path from 'path';
import admin from 'firebase-admin';

function parseCSV(content) {
  const lines = content.split(/\r?\n/).filter(Boolean);
  const header = lines.shift();
  const cols = header.split(',').map(c => c.trim());
  const rows = lines.map(line => {
    // split on commas not inside quotes
    const values = line.match(/(?:"([^"]*(?:""[^"]*)*)")|([^,]+)/g)?.map(v => {
      if (v.startsWith('"') && v.endsWith('"')) {
        return v.slice(1, -1).replace(/""/g, '"');
      }
      return v;
    }) || [];
    const obj = {};
    for (let i = 0; i < cols.length; i++) {
      obj[cols[i]] = (values[i] || '').trim();
    }
    return obj;
  });
  return rows;
}

function detectGenresFromTokens(tokens) {
  const known = ['action','drama','comedy','adventure','sci fi','sci-fi','sci_fi','thriller','horror','animation','fantasy','crime','romance','mystery','documentary','family','history','war'];
  const genres = [];
  for (const t of tokens) {
    const low = t.toLowerCase().replace(/[^a-z0-9\s-]/g,'');
    for (const g of known) {
      if (low.includes(g.replace(/[^a-z0-9]/g,'')) && !genres.includes(g)) genres.push(g);
    }
    if (genres.length >= 3) break;
  }
  return genres;
}

function mapRowToMovie(row) {
  // Expected CSV columns: tmdb_id,title,poster,kyewords
  const tmdb = (row.tmdb_id || row.tmdbid || row.id || '').toString();
  const title = row.title || row.name || '';
  const poster = row.poster || row.posterUrl || '';
  const keywords = (row.kyewords || row.keywords || row.tags || '').split(/\s+/).filter(Boolean);

  const genres = detectGenresFromTokens(keywords);

  return {
    id: tmdb || title.replace(/\s+/g,'_').toLowerCase(),
    title,
    year: 0,
    director: '',
    genres,
    duration: 0,
    posterUrl: poster,
    backdropUrl: poster,
    description: '',
    cast: [],
    trailerUrl: '',
    avgRating: 0,
    ratingCount: 0,
    reviewCount: 0,
    searchText: `${title} ${keywords.join(' ')}`,
    searchTokens: keywords,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

async function main() {
  const csvPath = process.argv[2] || 'src/app/data/Dataset 50 movies.csv';
  const abs = path.resolve(csvPath);

  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.error('Set GOOGLE_APPLICATION_CREDENTIALS to your service account JSON path.');
    process.exit(1);
  }

  admin.initializeApp({ credential: admin.credential.applicationDefault() });
  const db = admin.firestore();

  const raw = await fs.readFile(abs, 'utf8');
  const rows = parseCSV(raw);
  console.log(`Parsed ${rows.length} rows from ${abs}`);

  let success = 0;
  for (const row of rows) {
    const movie = mapRowToMovie(row);
    if (!movie.id || !movie.title) continue;
    try {
      await db.collection('movies').doc(movie.id).set(movie, { merge: true });
      success++;
      console.log('Upserted', movie.id, movie.title);
    } catch (err) {
      console.error('Error writing', movie.id, err);
    }
  }

  console.log(`Imported ${success}/${rows.length} movies.`);
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
