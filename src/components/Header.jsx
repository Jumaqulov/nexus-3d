export default function Header() {
  return (
    <header className={"site-header"} id={"top"}>
      {"\n    "}
      <a className={"brand"} href={"#main"} aria-label={"Nexus home"}>
        <span className={"brand-mark"} aria-hidden={"true"}>
          {"N"}
        </span>
        <span>
          {"NEXUS"}
          <span className={"brand-plus"}>{"®"}</span>
        </span>
      </a>
      {"\n    "}
      <nav className={"main-nav"} aria-label={"Main navigation"}>
        {"\n      "}
        <a href={"#journey"}>{"The journey"}</a>
        {"\n      "}
        <a href={"#worlds"}>{"The worlds"}</a>
        {"\n      "}
        <a href={"#core"}>
          {"The fourth dimension "}
          <svg className={"icon small"}>
            <use href={"#icon-arrow"}></use>
          </svg>
        </a>
        {"\n    "}
      </nav>
      {"\n    "}
      <div className={"header-actions"}>
        {"\n      "}
        <button
          className={"sound-toggle icon-button"}
          aria-label={"Enable ambient sound"}
          aria-pressed={"false"}
          title={"Ambient sound"}
        >
          <span className={"sound-bars"} aria-hidden={"true"}>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </span>
          <span className={"sound-label"}>{"SOUND OFF"}</span>
        </button>
        {"\n      "}
        <a className={"header-cta"} href={"#worlds"}>
          {"Find your world "}
          <svg className={"icon"}>
            <use href={"#icon-arrow"}></use>
          </svg>
        </a>
        {"\n    "}
      </div>
      {"\n  "}
    </header>
  );
}
