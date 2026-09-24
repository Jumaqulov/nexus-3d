export default function CoreSection() {
  return (
    <section
      className={"dimension-section"}
      id={"core"}
      aria-labelledby={"core-title"}
      data-chapter={"core"}
    >
      {"\n      "}
      <div className={"dimension-heading"}>
        <div>
          <span className={"eyebrow"}>
            <span className={"chapter-number"}>{"04"}</span>
            {" THE NEXUS CORE"}
          </span>
          <h2 id={"core-title"}>
            {"REALITY HAS"}
            <br />
            <em>{"ANOTHER SIDE."}</em>
          </h2>
        </div>
        <p>
          {"Turn it. Shift it."}
          <br />
          {"Find the dimension you can't see."}
        </p>
      </div>
      {"\n      "}
      <div className={"core-stage"}>
        {"\n        "}
        <div className={"core-watermark"} aria-hidden={"true"}>
          {"4D"}
        </div>
        {"\n        "}
        <canvas
          id={"hypercube"}
          tabIndex={"0"}
          role={"img"}
          aria-label={
            "Interactive four-dimensional hypercube. Drag or use arrow keys to rotate. Press Space to shift dimension."
          }
        ></canvas>
        {"\n        "}
        <div className={"core-axis"} aria-hidden={"true"}>
          <span>{"X"}</span>
          <span>{"Y"}</span>
          <span>{"Z"}</span>
          <span className={"active-axis"}>{"W"}</span>
        </div>
        {"\n        "}
        <div className={"core-spec"}>
          <span>{"TESSERACT / 001"}</span>
          <dl>
            <div>
              <dt>{"VERTICES"}</dt>
              <dd>{"16"}</dd>
            </div>
            <div>
              <dt>{"EDGES"}</dt>
              <dd>{"32"}</dd>
            </div>
            <div>
              <dt>{"CELLS"}</dt>
              <dd>{"08"}</dd>
            </div>
          </dl>
        </div>
        {"\n        "}
        <div className={"core-controls"}>
          <span>{"DRAG TO ROTATE · ARROW KEYS ALSO WORK"}</span>
          <button className={"shift-dimension"}>
            {"SHIFT DIMENSION "}
            <svg className={"icon"}>
              <use href={"#icon-arrow"}></use>
            </svg>
          </button>
        </div>
        {"\n      "}
      </div>
      {"\n      "}
      <div className={"core-footnote"}>
        <span>{"FOUR DIMENSIONS. A DIFFERENT PERSPECTIVE."}</span>
        <span>{"KEEP GOING. THERE'S MORE BELOW."}</span>
      </div>
      {"\n    "}
    </section>
  );
}
