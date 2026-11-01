export function About() {
  return (
    <section className="about section wrap" id="about" aria-labelledby="about-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">BACKGROUND</p>
          <h2 id="about-title">
            From the Marines
            <br />
            to software.
          </h2>
        </div>
      </div>
      <div className="about-grid">
        <div className="about-copy">
          <p className="large-copy">
            I spent 20 years in the Marine Corps, where my work included building internal software.
          </p>
          <p>
            Those tools covered aviation safety, aircraft discrepancy tracking, quality-assurance
            training, and resource reporting. I later trained with Vets Who Code and moved into
            commercial software engineering.
          </p>
          <p>
            I’m based in Richlands, North Carolina. Away from the keyboard, I’m usually cycling,
            learning Hungarian, or looking after my runner ducks.
          </p>
        </div>
        <div className="background-facts">
          <div>
            <span className="eyebrow">1997–2017</span>
            <h3>U.S. Marine Corps</h3>
            <p>
              Technical Leader / Software Developer
              <br />
              Navy Commendation Medal
            </p>
          </div>
          <div>
            <span className="eyebrow">EDUCATION</span>
            <h3>B.S. Information Technology</h3>
            <p>
              Cybersecurity · Excelsior College
              <br />
              Summa Cum Laude
            </p>
          </div>
          <div>
            <span className="eyebrow">TRAINING</span>
            <h3>Vets Who Code</h3>
            <p>Web development, React, and JavaScript</p>
          </div>
        </div>
      </div>
    </section>
  );
}
