import { useEffect } from "react";
import { initializeExperience } from "./experience/index.js";
import SkipLink from "./components/SkipLink.jsx";
import IconLibrary from "./components/IconLibrary.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import ManifestoStrip from "./components/ManifestoStrip.jsx";
import SignalSection from "./components/SignalSection.jsx";
import RiftSection from "./components/RiftSection.jsx";
import PathfinderSection from "./components/PathfinderSection.jsx";
import EdenSection from "./components/EdenSection.jsx";
import CoreSection from "./components/CoreSection.jsx";
import Interlude from "./components/Interlude.jsx";
import WorldsSection from "./components/WorldsSection.jsx";
import ClosingSection from "./components/ClosingSection.jsx";
import Footer from "./components/Footer.jsx";
import MotionToggle from "./components/MotionToggle.jsx";
import ReadingProgress from "./components/ReadingProgress.jsx";
import ChapterNavigation from "./components/ChapterNavigation.jsx";
import ImmersionDialog from "./components/ImmersionDialog.jsx";
import Announcer from "./components/Announcer.jsx";

export default function App() {
  useEffect(initializeExperience, []);
  return (
    <>
      {" "}
      {"\n  "}
      <SkipLink />
      {"\n  "}
      <IconLibrary />
      {"\n\n  "}
      <Header />
      {"\n\n  "}
      <main id="main">
        {"\n    "}
        <Hero />
        {"\n\n    "}
        <ManifestoStrip />
        {"\n\n    "}
        <SignalSection />
        {"\n\n    "}
        <RiftSection />
        {"\n\n    "}
        <PathfinderSection />
        {"\n\n    "}
        <EdenSection />
        {"\n\n    "}
        <CoreSection />
        {"\n\n    "}
        <Interlude />
        {"\n\n    "}
        <WorldsSection />
        {"\n\n    "}
        <ClosingSection />
        {"\n  "}
      </main>
      {"\n\n  "}
      <Footer />
      {"\n\n  "}
      <MotionToggle />
      {"\n\n  "}
      <ReadingProgress />
      {"\n  "}
      <ChapterNavigation />
      {"\n\n  "}
      <ImmersionDialog />
      {"\n  "}
      <Announcer />
      {"\n"}{" "}
    </>
  );
}
