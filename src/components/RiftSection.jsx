export default function RiftSection() {
  return (
    <section
      className={"journey-section rift-journey"}
      id={"rift"}
      aria-labelledby={"rift-title"}
      data-chapter={"rift"}
    >
      {"\n      "}
      <div className={"journey-stage rift-stage"}>
        {"\n        "}
        <div className={"rift-world"} aria-hidden={"true"}></div>
        {"\n        "}
        <div className={"rift-shade"} aria-hidden={"true"}></div>
        {"\n        "}
        <canvas
          className={"warp-canvas"}
          id={"warp-field"}
          aria-hidden={"true"}
        ></canvas>
        {"\n        "}
        <div className={"stage-topline"}>
          <span className={"eyebrow"}>
            <span className={"chapter-number"}>{"01"}</span>
            {" THE RIFT"}
          </span>
          <span className={"stage-coordinates"}>{"SECTOR 07 / UNCHARTED"}</span>
        </div>
        {"\n        "}
        <h2 className={"sr-only"} id={"rift-title"}>
          {"Cross the Rift"}
        </h2>
        {"\n        "}
        <div className={"rift-beats"} aria-hidden={"true"}>
          {"\n          "}
          <div className={"rift-beat"} data-beat={"0"}>
            <span className={"scene-overline"}>{"FIRST, YOU HEAR IT."}</span>
            <p>
              {"FOLLOW"}
              <br />
              {"THE "}
              <em>{"SIGNAL."}</em>
            </p>
          </div>
          {"\n          "}
          <div className={"rift-beat"} data-beat={"1"}>
            <span className={"scene-overline"}>{"THEN, YOU FEEL IT."}</span>
            <p>
              {"REALITY"}
              <br />
              {"IS "}
              <em>{"SHIFTING."}</em>
            </p>
          </div>
          {"\n          "}
          <div className={"rift-beat"} data-beat={"2"}>
            <span className={"scene-overline"}>
              {"THERE IS NO GOING BACK."}
            </span>
            <p>
              {"CROSS THE"}
              <br />
              <em>{"THRESHOLD."}</em>
            </p>
          </div>
          {"\n        "}
        </div>
        {"\n        "}
        <div className={"portal-reticle"} aria-hidden={"true"}>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>
        {"\n        "}
        <div className={"stage-bottomline"}>
          <span>{"KEEP SCROLLING TO CROSS"}</span>
          <span className={"stage-meter"}>
            <i></i>
          </span>
          <span className={"stage-percent"} aria-hidden={"true"}>
            {"000%"}
          </span>
        </div>
        {"\n      "}
      </div>
      {"\n    "}
    </section>
  );
}
