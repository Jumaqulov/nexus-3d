export default function ClosingSection() {
  return (
    <section className={"closing-section"} aria-labelledby={"closing-title"}>
      {"\n      "}
      <div className={"closing-line"}>
        <span className={"eyebrow"}>{"IT'S IN YOUR NATURE."}</span>
        <span aria-hidden={"true"}>{"[ NXS / 001 ]"}</span>
      </div>
      {"\n      "}
      <h2 id={"closing-title"}>
        {"STAY CURIOUS."}
        <br />
        {"KEEP "}
        <em>{"PLAYING."}</em>
      </h2>
      {"\n      "}
      <button
        className={"closing-button"}
        data-immerse=""
        aria-label={"Enter the immersive world"}
      >
        <svg className={"icon"}>
          <use href={"#icon-arrow"}></use>
        </svg>
      </button>
      {"\n    "}
    </section>
  );
}
