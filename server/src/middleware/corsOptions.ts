import cors from 'cors';

import whitelist from '../config/whitelist';

const corsOptions = cors({
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origin Blocked'));
    }
  },
});

export default corsOptions;
