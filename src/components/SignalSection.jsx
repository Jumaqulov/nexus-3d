export default function SignalSection() {
  return (
    <section
      className={"signal-section"}
      id={"journey"}
      aria-labelledby={"signal-title"}
      data-chapter={"journey"}
    >
      {"\n      "}
      <div className={"signal-heading"}>
        <span className={"eyebrow"}>{"TRANSMISSION / 001"}</span>
        <span className={"signal-sign"} aria-hidden={"true"}>
          {"✳"}
        </span>
      </div>
      {"\n      "}
      <h2 id={"signal-title"} className={"signal-statement"}>
        {
          "You weren't made to watch from the sidelines. You were made to cross them."
        }
      </h2>
      {"\n      "}
      <div className={"signal-bottom"}>
        <span>{"THERE'S SOMETHING ON THE OTHER SIDE."}</span>
        <a href={"#rift"}>
          {"FOLLOW THE SIGNAL "}
          <svg className={"icon"}>
            <use href={"#icon-down"}></use>
          </svg>
        </a>
      </div>
      {"\n    "}
    </section>
  );
}
