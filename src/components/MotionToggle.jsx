export default function MotionToggle() {
  return (
    <button
      className={"motion-toggle"}
      aria-pressed={"true"}
      aria-label={"Pause visual motion"}
    >
      <svg className={"icon small"}>
        <use href={"#icon-pause"}></use>
      </svg>
      <span>{"Motion on"}</span>
    </button>
  );
}
