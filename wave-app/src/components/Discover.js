import React, { useContext } from 'react';
import { MusicContext } from '../contexts/MusicContext';

function Discover() {
  const { music } = useContext(MusicContext);

  return (
    <div className="container mt-5">
      <h1>Discover New Music</h1>
      <p>Browse and discover exciting music projects from DJs and producers!</p>
       <div className="row d-flex justify-content-center">
        {music.length > 0 ? (
          music.map((track) => (
            <div key={track.id} className="col-md-3 mb-3">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">{track.name}</h5>
                  <a
                    href={track.link}
                    className="btn btn-primary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Listen Now
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No music available yet. Be the first to upload a track!</p>
        )}
      </div>
    </div>
  );
}

export default Discover;