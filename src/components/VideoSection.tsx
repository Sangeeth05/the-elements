import { useState } from 'react';
import type { ElementVideo } from '../types';

/** Returns the 11-character video id for youtube.com / youtu.be links, or null for anything else. */
function youTubeId(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  const host = parsed.hostname.replace(/^(www\.|m\.)/, '');
  let id: string | null = null;
  if (host === 'youtu.be') id = parsed.pathname.slice(1);
  else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    id = parsed.searchParams.get('v') ?? parsed.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1] ?? null;
  }
  return id && /^[\w-]{11}$/.test(id) ? id : null;
}

interface Props {
  video: ElementVideo;
  name: string;
}

/** Click-to-load video: nothing is fetched from the video host until the user presses play. */
export function VideoSection({ video, name }: Props) {
  const [playing, setPlaying] = useState(false);
  const ytId = youTubeId(video.url);
  const title = `Video about ${name}`;

  return (
    <section className="watch" aria-labelledby="watch-heading">
      <h3 id="watch-heading">
        Watch
        {video.aiGenerated && <span className="ai-label">AI-generated</span>}
      </h3>

      <div className="video-frame">
        {!playing ? (
          <button type="button" className="video-play" onClick={() => setPlaying(true)} aria-label={`Play ${title.toLowerCase()}`}>
            {video.poster && <img src={video.poster} alt="" loading="lazy" decoding="async" />}
            <span className="video-play-icon" aria-hidden="true" />
          </button>
        ) : ytId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <video src={video.url} poster={video.poster} controls autoPlay playsInline aria-label={title} />
        )}
      </div>

      <p className="video-credit">Video: {video.credit}</p>
    </section>
  );
}
