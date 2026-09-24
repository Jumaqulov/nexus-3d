export default function PathfinderSection() {
  return (
    <section
      className={"journey-section ranger-journey"}
      id={"pathfinder"}
      aria-labelledby={"pathfinder-title"}
      data-chapter={"pathfinder"}
    >
      {"\n      "}
      <div className={"journey-stage ranger-stage"}>
        {"\n        "}
        <div className={"ranger-grid"} aria-hidden={"true"}></div>
        {"\n        "}
        <div className={"ranger-ghost-title"} aria-hidden={"true"}>
          {"PATHFINDER"}
        </div>
        {"\n        "}
        <div className={"stage-topline"}>
          <span className={"eyebrow"}>
            <span className={"chapter-number"}>{"02"}</span>
            {" THE PATHFINDER"}
          </span>
          <span className={"stage-coordinates"}>
            {"NO COORDINATES REQUIRED"}
          </span>
        </div>
        {"\n        "}
        <div className={"ranger-copy"}>
          <span className={"scene-overline"}>{"SOME FOLLOW PATHS."}</span>
          <h2 id={"pathfinder-title"}>
            {"YOU"}
            <br />
            {"MAKE"}
            <br />
            <em>{"THEM."}</em>
          </h2>
          <p>
            {"No map. No second guesses."}
            <br />
            {"Just you and everything"}
            <br />
            {"that hasn't been found."}
          </p>
        </div>
        {"\n        "}
        <div className={"ranger-model"}>
          <img
            src={"/assets/ranger.webp"}
            alt={"An armored explorer with gold-lit armor"}
            width={"1024"}
            height={"1536"}
            loading={"lazy"}
          />
        </div>
        {"\n        "}
        <div className={"ranger-dossier"}>
          <span className={"dossier-title"}>{"EXPLORER PROFILE / N° 01"}</span>
          <dl>
            <div>
              <dt>{"CLASS"}</dt>
              <dd>{"Pathfinder"}</dd>
            </div>
            <div>
              <dt>{"ORIGIN"}</dt>
              <dd>{"Unknown"}</dd>
            </div>
            <div>
              <dt>{"MISSION"}</dt>
              <dd>{"Go further."}</dd>
            </div>
          </dl>
          <span className={"dossier-footer"}>{"THE NEXT MOVE IS YOURS."}</span>
        </div>
        {"\n        "}
        <div className={"stage-bottomline"}>
          <span>{"BUILT FOR THE UNKNOWN."}</span>
          <span>{"01 / HUMAN INSTINCT"}</span>
        </div>
        {"\n      "}
      </div>
      {"\n    "}
    </section>
  );
}
