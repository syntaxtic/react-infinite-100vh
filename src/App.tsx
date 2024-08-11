import { MouseEventHandler, useEffect, useState } from "react";

import Screen from "./components/Screen/Screen";
import fakeApi from "./fakeApi/fakeApi";

type ScreenData = {
  id: string;
  backgroundColor: string;
  text: string;
}[];
const MaxScreen = 21;

const App = () => {
  const [screenData, setScreenData] = useState<ScreenData>([] as ScreenData);
  const [milestone, setMilestone] = useState("");

  const updateData = async () => {
    if (screenData.length >= MaxScreen) return;
    const incomingData = await fakeApi({ index: screenData.length });
    setScreenData((p) => [...p, ...incomingData]);
  };

  const onPress: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as unknown as HTMLDivElement;
    const targetId = target.id;
    const targetIndex = screenData.findIndex((e) => e.id === targetId);
    const nextIndex = targetIndex + 1;
    if (nextIndex >= screenData.length) return;
    const nextElId = screenData[nextIndex].id;
    const nextScreenEl = document.getElementById(nextElId);
    nextScreenEl?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Watch scroll position to fetch more data.
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (screenData.length < 2) return;
      const penultimateId = screenData[screenData.length - 2].id;
      const penultimateElement = document.getElementById(penultimateId);
      const penultimatePosition = penultimateElement?.offsetTop ?? 0;
      if (
        scrollPosition >= penultimatePosition &&
        milestone !== penultimateId
      ) {
        updateData();
        setMilestone(penultimateId);
        console.log(`Fetched more data around ${penultimateId}.`);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenData, milestone]);

  useEffect(() => {
    // fetch initial data
    updateData();
    console.log("Initial data fetched.");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {screenData.map((sd, i) => (
        <Screen
          key={sd.id + i}
          id={sd.id}
          backgroundColor={sd.backgroundColor}
          onPress={onPress}
        >
          {sd.text}
        </Screen>
      ))}
    </>
  );
};

export default App;
