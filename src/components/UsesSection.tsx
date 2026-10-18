import { usesFor } from '../data/uses';

interface Props {
  number: number;
  name: string;
}

/** Real-life uses and credited Wikimedia Commons photos for one element. */
export function UsesSection({ number, name }: Props) {
  const entry = usesFor(number);

  return (
    <section className="uses" aria-labelledby="uses-heading">
      <h3 id="uses-heading">Real-life uses</h3>

      {!entry ? (
        <p className="uses-empty">Uses coming soon. We're still gathering real-world examples for {name}.</p>
      ) : (
        <>
          <ul className="use-grid">
            {entry.uses.map((use) => (
              <li key={use.title} className="use-card">
                <h4>{use.title}</h4>
                <p>{use.description}</p>
              </li>
            ))}
          </ul>

          <div className="gallery">
            {entry.images.map((img) => (
              <figure key={img.url} className="gallery-item">
                <img src={img.url} alt={img.alt} loading="lazy" decoding="async" />
                <figcaption>
                  Photo: {img.author} · {img.license} ·{' '}
                  <a href={img.pageUrl} target="_blank" rel="noreferrer">
                    Wikimedia Commons ↗
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
