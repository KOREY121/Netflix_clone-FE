// ═══════════════════════════════════════════
//  STREAMVAULT — Shared Data (ERD-backed)
// ═══════════════════════════════════════════

const SV = {

  // ── TABLE: Subscription ──
  subscriptions: [
    { subscription_id: 1, plan_name: 'Basic',    price: 6.99,  max_streams: 1 },
    { subscription_id: 2, plan_name: 'Standard', price: 13.99, max_streams: 2 },
    { subscription_id: 3, plan_name: 'Premium',  price: 19.99, max_streams: 4 },
  ],

  // ── TABLE: User ──
  currentUser: {
    user_id: 1, name: 'Alex Johnson', email: 'alex@example.com',
    subscription_id: 3, created_at: '2023-04-01',
  },

  // ── TABLE: Profile ──
  profiles: [
    { profile_id: 1, user_id: 1, name: 'Alex',  avatar: 'AJ', maturity_level: 'Adult' },
    { profile_id: 2, user_id: 1, name: 'Maya',  avatar: 'MK', maturity_level: 'Adult' },
    { profile_id: 3, user_id: 1, name: 'Tom',   avatar: 'TJ', maturity_level: 'Teen'  },
    { profile_id: 4, user_id: 1, name: 'Kids',  avatar: '👶', maturity_level: 'Kids'  },
  ],

  activeProfile: 0, // index into profiles[]

  // ── TABLE: Genre ──
  genres: [
    { genre_id: 1, name: 'All'          },
    { genre_id: 2, name: 'Action'       },
    { genre_id: 3, name: 'Sci-Fi'       },
    { genre_id: 4, name: 'Thriller'     },
    { genre_id: 5, name: 'Drama'        },
    { genre_id: 6, name: 'Comedy'       },
    { genre_id: 7, name: 'Horror'       },
    { genre_id: 8, name: 'Documentary'  },
    { genre_id: 9, name: 'Animation'    },
  ],

  // ── TABLE: Content (movies) ──
  movies: [
    { content_id:1,  title:'Abyss Protocol',  type:'Movie', release_year:2025, duration:'2h 18m', age_rating:'PG-13', genre:'Sci-Fi',    rating:'9.1', icon:'🚀', desc:'A deep-space research team discovers an alien signal that rewrites the laws of physics — and human consciousness.' },
    { content_id:2,  title:'Neon Requiem',     type:'Movie', release_year:2024, duration:'1h 54m', age_rating:'R',     genre:'Thriller',  rating:'8.7', icon:'🎷', desc:'A jazz musician uncovers a conspiracy hidden in the frequencies of lost recordings.' },
    { content_id:3,  title:'Iron Meridian',    type:'Movie', release_year:2025, duration:'2h 31m', age_rating:'PG-13', genre:'Action',    rating:'8.4', icon:'⚡', desc:'A covert operative goes rogue when she discovers the mission was a lie all along.' },
    { content_id:4,  title:'The Fold',         type:'Movie', release_year:2024, duration:'1h 47m', age_rating:'PG',    genre:'Drama',     rating:'9.0', icon:'🌀', desc:'Two strangers share an apartment across different timelines, slowly realising they are the same person.' },
    { content_id:5,  title:'Phantom Bay',      type:'Movie', release_year:2025, duration:'2h 05m', age_rating:'R',     genre:'Horror',    rating:'8.2', icon:'🌊', desc:'A coastal town is haunted by the ghosts of fishermen who never returned from the sea.' },
    { content_id:6,  title:'Velocity Zero',    type:'Movie', release_year:2024, duration:'1h 59m', age_rating:'PG-13', genre:'Sci-Fi',    rating:'7.9', icon:'⏱️', desc:'Time stops everywhere on Earth — except for one family in rural Montana.' },
    { content_id:7,  title:'The Architect',    type:'Movie', release_year:2025, duration:'2h 12m', age_rating:'PG-13', genre:'Thriller',  rating:'8.8', icon:'🏛️', desc:'A reclusive genius builds cities inside his dreams — until someone starts living in them.' },
    { content_id:8,  title:'Frostline',        type:'Movie', release_year:2024, duration:'1h 43m', age_rating:'PG',    genre:'Drama',     rating:'8.5', icon:'❄️', desc:'A wildlife photographer spends one winter alone in Greenland and discovers ancient petroglyphs.' },
    { content_id:9,  title:'Hollow Earth',     type:'Movie', release_year:2025, duration:'2h 08m', age_rating:'PG-13', genre:'Action',    rating:'8.0', icon:'🌍', desc:'An expedition to the Earth\'s core uncovers a civilisation that predates recorded history.' },
    { content_id:10, title:'Lacuna',           type:'Movie', release_year:2024, duration:'1h 52m', age_rating:'R',     genre:'Drama',     rating:'8.6', icon:'🎭', desc:'A memory-erasing clinic promises a fresh start — but some memories fight back.' },
  ],

  // ── TABLE: Content (series) ──
  series: [
    { content_id:11, title:'Dark Meridian',  type:'Series', release_year:2025, duration:'S2 · 8 Eps',  age_rating:'TV-MA', genre:'Sci-Fi',   rating:'9.3', icon:'🌌', desc:'A government agency discovers portals hidden inside ordinary household appliances.' },
    { content_id:12, title:'The Quiet War',  type:'Series', release_year:2024, duration:'S1 · 6 Eps',  age_rating:'TV-14', genre:'Thriller', rating:'8.9', icon:'🕵️', desc:'Cold War spies navigate a world where every truth is weaponised.' },
    { content_id:13, title:'Luminary',       type:'Series', release_year:2025, duration:'S3 · 10 Eps', age_rating:'TV-14', genre:'Drama',    rating:'8.6', icon:'🎨', desc:'The rise and fall of an art dynasty spanning four generations in Rome.' },
    { content_id:14, title:'Hexbound',       type:'Series', release_year:2024, duration:'S1 · 8 Eps',  age_rating:'TV-MA', genre:'Horror',   rating:'8.3', icon:'🔮', desc:'Six strangers wake up in an abandoned mall, each cursed with a different supernatural burden.' },
    { content_id:15, title:'Cascade',        type:'Series', release_year:2025, duration:'S2 · 9 Eps',  age_rating:'TV-14', genre:'Action',   rating:'8.7', icon:'🌊', desc:'An elite flood-rescue team battles corrupt infrastructure in near-future Southeast Asia.' },
    { content_id:16, title:'Mindshard',      type:'Series', release_year:2024, duration:'S1 · 7 Eps',  age_rating:'TV-MA', genre:'Sci-Fi',   rating:'9.1', icon:'🧠', desc:'A neurologist discovers her patients share the same recurring dream — of a city that does not exist.' },
    { content_id:17, title:'The Long Night', type:'Series', release_year:2025, duration:'S4 · 10 Eps', age_rating:'TV-14', genre:'Drama',    rating:'8.4', icon:'🌃', desc:'A detective with synesthesia solves cold cases by hearing their colours.' },
    { content_id:18, title:'Gravity Well',   type:'Series', release_year:2024, duration:'S1 · 6 Eps',  age_rating:'TV-MA', genre:'Thriller', rating:'8.8', icon:'🛸', desc:'Astronauts aboard a malfunctioning station discover they are not alone.' },
  ],

  // ── TABLE: WatchHistory ──
  watchHistory: [
    { history_id:1, profile_id:1, content_id:11, episode_id:4, watched_at:'2025-04-21', progress: 62 },
    { history_id:2, profile_id:1, content_id:1,  episode_id:null, watched_at:'2025-04-20', progress: 48 },
    { history_id:3, profile_id:1, content_id:12, episode_id:2, watched_at:'2025-04-19', progress: 80 },
    { history_id:4, profile_id:1, content_id:13, episode_id:6, watched_at:'2025-04-18', progress: 30 },
    { history_id:5, profile_id:1, content_id:15, episode_id:1, watched_at:'2025-04-17', progress: 15 },
  ],

  // ── TABLE: MyList ──
  myList: [1, 4, 11, 15], // content_ids

  // ── TABLE: Episode (sample for Dark Meridian S2) ──
  episodes: [
    { episode_id:1, season_id:2, content_id:11, title:'The Signal',    duration:'52m', episode_number:1 },
    { episode_id:2, season_id:2, content_id:11, title:'Resonance',     duration:'48m', episode_number:2 },
    { episode_id:3, season_id:2, content_id:11, title:'Deep State',    duration:'55m', episode_number:3 },
    { episode_id:4, season_id:2, content_id:11, title:'The Breach',    duration:'61m', episode_number:4 },
    { episode_id:5, season_id:2, content_id:11, title:'Convergence',   duration:'50m', episode_number:5 },
    { episode_id:6, season_id:2, content_id:11, title:'Zero Hour',     duration:'58m', episode_number:6 },
    { episode_id:7, season_id:2, content_id:11, title:'The Threshold', duration:'54m', episode_number:7 },
    { episode_id:8, season_id:2, content_id:11, title:'Meridian',      duration:'72m', episode_number:8 },
  ],

  // ── TABLE: AudioTrack ──
  audioTracks: ['Dolby Atmos', '5.1 Surround', 'Stereo'],

  // ── TABLE: Subtitle ──
  subtitleLangs: ['EN', 'FR', 'ES', 'PT', 'AR', 'DE', 'JA'],

  // ── TABLE: Recommendation ──
  recommendations: [1, 11, 7, 16, 3, 15, 4, 18],

  // ── HELPERS ──
  allContent() { return [...this.movies, ...this.series]; },

  getById(id) { return this.allContent().find(c => c.content_id === id); },

  getContinue() {
    return this.watchHistory.map(h => {
      const content = this.getById(h.content_id);
      const ep = h.episode_id ? this.episodes.find(e => e.episode_id === h.episode_id) : null;
      return { ...h, content, ep };
    }).filter(h => h.content);
  },

  isInList(id) { return this.myList.includes(id); },

  toggleList(id) {
    if (this.isInList(id)) {
      this.myList = this.myList.filter(x => x !== id);
    } else {
      this.myList.push(id);
    }
    localStorage.setItem('sv_mylist', JSON.stringify(this.myList));
  },

  loadFromStorage() {
    const saved = localStorage.getItem('sv_mylist');
    if (saved) this.myList = JSON.parse(saved);
    const prof = localStorage.getItem('sv_profile');
    if (prof) this.activeProfile = parseInt(prof);
  },
};

// Init on load
SV.loadFromStorage();
