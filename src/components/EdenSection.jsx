export default function EdenSection() {
  return (
    <section
      className={"journey-section eden-journey"}
      id={"eden"}
      aria-labelledby={"eden-title"}
      data-chapter={"eden"}
    >
      {"\n      "}
      <div className={"journey-stage eden-stage"}>
        {"\n        "}
        <div className={"eden-window"}>
          <div className={"eden-world"} aria-hidden={"true"}></div>
          <div className={"eden-shade"} aria-hidden={"true"}></div>
          <canvas id={"eden-dust"} aria-hidden={"true"}></canvas>
        </div>
        {"\n        "}
        <div className={"eden-giant-title"} aria-hidden={"true"}>
          {"EDEN"}
        </div>
        {"\n        "}
        <div className={"stage-topline"}>
          <span className={"eyebrow"}>
            <span className={"chapter-number"}>{"03"}</span>
            {" EDEN"}
          </span>
          <span className={"stage-coordinates"}>
            {"SOMEWHERE OUTSIDE THE KNOWN"}
          </span>
        </div>
        {"\n        "}
        <div className={"eden-copy"}>
          <span className={"scene-overline"}>{"GET A LITTLE LOST."}</span>
          <h2 id={"eden-title"}>
            {"FIND SOMETHING"}
            <br />
            <em>{"EXTRAORDINARY."}</em>
          </h2>
          <p>
            {"Past the last checkpoint."}
            <br />
            {"Beyond the edge of the map."}
            <br />
            {"A world that never needed to be found."}
          </p>
          <button className={"eden-enter"} data-open-world={"eden"}>
            {"TAKE A CLOSER LOOK "}
            <svg className={"icon"}>
              <use href={"#icon-expand"}></use>
            </svg>
          </button>
        </div>
        {"\n        "}
        <div className={"eden-whisper"} aria-hidden={"true"}>
          {"NOT EVERY WORLD"}
          <br />
          {"NEEDS CONQUERING."}
        </div>
        {"\n        "}
        <div className={"stage-bottomline"}>
          <span>{"LEAVE ONLY FOOTSTEPS."}</span>
          <span>{"DISCOVER / DON'T DESTROY"}</span>
        </div>
        {"\n      "}
      </div>
      {"\n    "}
    </section>
  );
}
