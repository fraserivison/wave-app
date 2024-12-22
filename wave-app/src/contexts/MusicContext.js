import React, { createContext, useState } from 'react';

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [music, setMusic] = useState([
    { id: 1, name: "Party Mix", link: "https://example.com/playlist1" },
    { id: 2, name: "Chill Vibes", link: "https://example.com/playlist2" },
  ]);

  const addMusic = (newTrack) => {
    setMusic((prevMusic) => [...prevMusic, { id: Date.now(), ...newTrack }]);
  };

  return (
    <MusicContext.Provider value={{ music, addMusic }}>
      {children}
    </MusicContext.Provider>
  );
};
