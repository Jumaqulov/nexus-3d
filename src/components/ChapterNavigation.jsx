export default function ChapterNavigation() {
  return (
    <nav className={"chapter-nav"} aria-label={"Journey chapters"}>
      {"\n    "}
      <a href={"#journey"} aria-label={"Introduction"}>
        <span>{"THE SIGNAL"}</span>
        <i></i>
      </a>
      {"\n    "}
      <a href={"#rift"} aria-label={"Chapter one: The Rift"}>
        <span>{"THE RIFT"}</span>
        <i></i>
      </a>
      {"\n    "}
      <a href={"#pathfinder"} aria-label={"Chapter two: The Pathfinder"}>
        <span>{"PATHFINDER"}</span>
        <i></i>
      </a>
      {"\n    "}
      <a href={"#eden"} aria-label={"Chapter three: Eden"}>
        <span>{"EDEN"}</span>
        <i></i>
      </a>
      {"\n    "}
      <a href={"#core"} aria-label={"Chapter four: The Nexus Core"}>
        <span>{"THE CORE"}</span>
        <i></i>
      </a>
      {"\n    "}
      <a href={"#worlds"} aria-label={"Choose your world"}>
        <span>{"YOUR WORLD"}</span>
        <i></i>
      </a>
      {"\n  "}
    </nav>
  );
}
