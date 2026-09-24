export default function Hero() {
  return (
    <section className={"hero"} aria-labelledby={"hero-title"}>
      {"\n      "}
      <div className={"scene"} id={"scene"} aria-hidden={"true"}>
        {"\n        "}
        <div
          className={"scene-landscape scene-landscape-rift"}
          data-layer={"landscape"}
        ></div>
        {"\n        "}
        <div
          className={"scene-landscape scene-landscape-eden"}
          data-layer={"eden"}
        ></div>
        {"\n        "}
        <div className={"scene-shade"}></div>
        {"\n        "}
        <div className={"scene-orbit"}>
          <span></span>
          <span></span>
        </div>
        {"\n        "}
        <div className={"character-wrap"} data-layer={"character"}>
          <img
            className={"character"}
            src={"/assets/ranger.webp"}
            alt={""}
            width={"1024"}
            height={"1536"}
            fetchPriority={"high"}
          />
        </div>
        {"\n        "}
        <canvas id={"atmosphere"}></canvas>
        {"\n        "}
        <div className={"scene-vignette"}></div>
        {"\n        "}
        <div className={"scene-grain"}></div>
        {"\n      "}
      </div>
      {"\n\n      "}
      <div className={"hero-copy"}>
        {"\n        "}
        <div className={"eyebrow"}>
          <span className={"tiny-cross"} aria-hidden={"true"}>
            {"+"}
          </span>
          {" FOR THE ONES WHO PLAY "}
          <span className={"eyebrow-line"}></span>
        </div>
        {"\n        "}
        <h1 id={"hero-title"}>
          <span>{"BEYOND"}</span>
          <span>{"THE"}</span>
          <span className={"accent"}>{"SCREEN."}</span>
        </h1>
        {"\n        "}
        <p>
          {"Some worlds are worth getting lost in."}
          <br />
          {"Leave the ordinary. Find your next reality."}
        </p>
        {"\n        "}
        <div className={"hero-actions"}>
          {"\n          "}
          <a className={"button button-primary"} href={"#journey"}>
            {"BEGIN THE JOURNEY "}
            <svg className={"icon"}>
              <use href={"#icon-down"}></use>
            </svg>
          </a>
          {"\n          "}
          <button className={"immersion-button"} data-immerse="">
            <span className={"circle-button"}>
              <svg className={"icon"}>
                <use href={"#icon-expand"}></use>
              </svg>
            </span>
            <span>{"Enter immersion"}</span>
          </button>
          {"\n        "}
        </div>
        {"\n      "}
      </div>
      {"\n\n      "}
      <div className={"scene-coordinate"} aria-hidden={"true"}>
        <span className={"coordinate-cross"}>{"+"}</span>
        <span>
          {"UNKNOWN TERRITORY"}
          <br />
          {"35° 41′ N   139° 41′ E"}
        </span>
      </div>
      {"\n      "}
      <div className={"scene-caption"} aria-hidden={"true"}>
        <span>{"EXPEDITION_001"}</span>
        <span className={"caption-line"}></span>
        <span>{"THE RIFT"}</span>
      </div>
      {"\n      "}
      <div className={"hero-side-label"} aria-hidden={"true"}>
        {"A DIFFERENT KIND OF ESCAPE — NEXUS"}
      </div>
      {"\n\n      "}
      <div className={"hero-bottom"}>
        {"\n        "}
        <a className={"scroll-cue"} href={"#journey"}>
          <span className={"scroll-icon"}>
            <svg className={"icon"}>
              <use href={"#icon-down"}></use>
            </svg>
          </span>
          <span>{"SCROLL TO DISCOVER"}</span>
        </a>
        {"\n        "}
        <div
          className={"world-switcher"}
          role={"group"}
          aria-label={"Choose the hero world"}
        >
          {"\n          "}
          <button
            className={"world-switch is-active"}
            data-world={"rift"}
            aria-pressed={"true"}
          >
            <span className={"world-number"}>{"01"}</span>
            <span>{"THE RIFT"}</span>
            <span className={"world-switch-line"}></span>
          </button>
          {"\n          "}
          <button
            className={"world-switch"}
            data-world={"eden"}
            aria-pressed={"false"}
          >
            <span className={"world-number"}>{"02"}</span>
            <span>{"EDEN"}</span>
            <span className={"world-switch-line"}></span>
          </button>
          {"\n        "}
        </div>
        {"\n        "}
        <div className={"depth-hint"}>
          <span className={"crosshair"} aria-hidden={"true"}></span>
          <span className={"pointer-hint"}>{"MOVE TO EXPLORE"}</span>
        </div>
        {"\n      "}
      </div>
      {"\n    "}
    </section>
  );
}
