import { useEffect, useState } from "react";

type Pin = {
  x?: number;
  y?: number;
  color: string;
  positioning?: string;
};

type localStorageReturnType = [
  Pin[] | undefined,
  (itemKey: string, data: Pin) => void
];

//what do I want this function to do
//will return mapPins if there are any stored in local storage
//will update the mapPins object in localstorage
export default function useLocalStorage(
  itemKey: string
): localStorageReturnType {
  const [mapPins, setMapPins] = useState<Pin[] | undefined>(undefined);

  //init state, fetch localstorage data
  useEffect((): void => {
    console.log("fetching localstorage data if exists");
    let storage: string | null = localStorage.getItem(itemKey || "");
    const pinArray: Pin[] | undefined = storage
      ? JSON.parse(storage)
      : undefined;
    setMapPins(pinArray);
  }, []);

  //store new items
  //for now store the mapPins
  //does the storage already contain information
  function storeItem(itemKey: string, data: Pin): void {
    let newPinArray: Pin[] = mapPins ? [...mapPins, data] : [data];
    setMapPins(newPinArray);
    localStorage.setItem(itemKey, JSON.stringify(newPinArray));
  }

  //custom hook returns the data
  return [mapPins, storeItem];
}
