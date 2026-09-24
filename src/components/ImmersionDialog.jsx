export default function ImmersionDialog() {
  return (
    <div className={"immersion-ui"} hidden={true}>
      {"\n    "}
      <div className={"immersion-top"}>
        <span className={"immersion-wordmark"}>
          {"NEXUS / "}
          <span id={"immersion-world-name"}>{"THE RIFT"}</span>
        </span>
        <button className={"exit-immersion"}>
          {"EXIT IMMERSION "}
          <svg className={"icon"}>
            <use href={"#icon-close"}></use>
          </svg>
        </button>
      </div>
      {"\n    "}
      <div className={"immersion-bottom"}>
        <div>
          <span className={"eyebrow"} id={"immersion-subtitle"}>
            {"BEYOND THE LAST FRONTIER"}
          </span>
          <h2 id={"immersion-title"}>{"THE RIFT"}</h2>
        </div>
        <div className={"immersion-controls"}>
          <button className={"immersion-sound"} aria-pressed={"false"}>
            {"SOUND OFF "}
            <svg className={"icon"}>
              <use href={"#icon-sound"}></use>
            </svg>
          </button>
          <button className={"next-world"}>
            {"NEXT WORLD "}
            <svg className={"icon"}>
              <use href={"#icon-arrow"}></use>
            </svg>
          </button>
          <p>
            <span className={"immersive-hint"}>
              {"Move your pointer to look around"}
            </span>
            <span className={"esc-hint"}>{" · ESC to return"}</span>
          </p>
        </div>
      </div>
      {"\n  "}
    </div>
  );
}
