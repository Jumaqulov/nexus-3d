export default function WorldsSection() {
  return (
    <section
      className={"worlds-section"}
      id={"worlds"}
      aria-labelledby={"worlds-title"}
    >
      {"\n      "}
      <div className={"section-heading reveal"}>
        {"\n        "}
        <div>
          <div className={"eyebrow"}>
            <span className={"section-index"}>{"05 /"}</span>
            {" PICK YOUR ESCAPE"}
          </div>
          <h2 id={"worlds-title"}>
            {"NEW WORLD."}
            <br />
            <span className={"muted-heading"}>{"SAME INSTINCT."}</span>
          </h2>
        </div>
        {"\n        "}
        <p>
          {"Chase the unknown. Follow the signal."}
          <br />
          {"There's a whole other side out there."}
        </p>
        {"\n      "}
      </div>
      {"\n\n      "}
      <div className={"world-grid"}>
        {"\n        "}
        <button
          className={"world-card rift-card reveal"}
          data-open-world={"rift"}
          aria-label={"Explore The Rift in immersion mode"}
        >
          {"\n          "}
          <img
            src={"/assets/rift.webp"}
            alt={
              "A monumental golden portal rising above a dark alien wasteland"
            }
            width={"1672"}
            height={"941"}
            loading={"lazy"}
          />
          {"\n          "}
          <span className={"card-shade"}></span>
          {"\n          "}
          <span className={"card-top"}>
            <span className={"world-tag"}>{"SCI-FI / EXPLORATION"}</span>
            <span className={"card-index"}>{"WORLD_01"}</span>
          </span>
          {"\n          "}
          <span className={"card-content"}>
            <span className={"card-kicker"}>{"BEYOND THE LAST FRONTIER"}</span>
            <span className={"card-title"}>{"THE RIFT"}</span>
            <span className={"card-description"}>
              {"A signal from nowhere. A gateway to everything."}
            </span>
            <span className={"card-link"}>
              {"EXPLORE WORLD "}
              <svg className={"icon"}>
                <use href={"#icon-arrow"}></use>
              </svg>
            </span>
          </span>
          {"\n          "}
          <span className={"card-corner"} aria-hidden={"true"}>
            {"+"}
          </span>
          {"\n        "}
        </button>
        {"\n        "}
        <button
          className={"world-card eden-card reveal"}
          data-open-world={"eden"}
          aria-label={"Explore Eden in immersion mode"}
        >
          {"\n          "}
          <img
            src={"/assets/eden.webp"}
            alt={
              "Luminous blue alien jungle surrounding monumental abandoned structures"
            }
            width={"1672"}
            height={"941"}
            loading={"lazy"}
          />
          {"\n          "}
          <span className={"card-shade"}></span>
          {"\n          "}
          <span className={"card-top"}>
            <span className={"world-tag"}>{"FANTASY / DISCOVERY"}</span>
            <span className={"card-index"}>{"WORLD_02"}</span>
          </span>
          {"\n          "}
          <span className={"card-content"}>
            <span className={"card-kicker"}>{"WHERE THE WILD TAKES OVER"}</span>
            <span className={"card-title"}>{"EDEN"}</span>
            <span className={"card-description"}>
              {"Lost to time. Waiting to be found."}
            </span>
            <span className={"card-link"}>
              {"EXPLORE WORLD "}
              <svg className={"icon"}>
                <use href={"#icon-arrow"}></use>
              </svg>
            </span>
          </span>
          {"\n          "}
          <span className={"card-corner"} aria-hidden={"true"}>
            {"+"}
          </span>
          {"\n        "}
        </button>
        {"\n      "}
      </div>
      {"\n      "}
      <div className={"section-footnote"}>
        <span>{"TWO WORLDS. ONE WAY FORWARD."}</span>
        <span>
          {"KEEP EXPLORING "}
          <span aria-hidden={"true"}>{"↗"}</span>
        </span>
      </div>
      {"\n    "}
    </section>
  );
}
