import { useEffect, useState } from "react";
import { Pin } from "../types/types";

type localStorageReturnType = [
  Pin[] | [],
  (data: Pin) => void,
  (data: Pin) => void
];

//what do I want this function to do
//will return mapPins if there are any stored in local storage
//will update the mapPins object in localstorage
export default function useLocalStorage(
  itemKey: string
): localStorageReturnType {
  const [mapPins, setMapPins] = useState<Pin[] | []>(() => {
    let storage: string | null = localStorage.getItem(itemKey || "");
    return storage ? JSON.parse(storage) : [];
  });

  //keep localstorage in sync
  useEffect((): void => {
    if (mapPins && mapPins.length >= 0) {
      localStorage.setItem(itemKey, JSON.stringify(mapPins));
    }
  }, [mapPins]);

  //store new items
  //for now store the mapPins
  //does the storage already contain information
  function storeItem(data: Pin): void {
    let newPinArray: Pin[] = mapPins ? [...mapPins, data] : [data];
    setMapPins(newPinArray);
    localStorage.setItem(itemKey, JSON.stringify(newPinArray));
  }

  function deleteItem(data: Pin): void {
    setMapPins((prevItems) =>
      prevItems?.filter((item) => item.pinId != data.pinId)
    );
  }

  //custom hook returns the data
  return [mapPins, storeItem, deleteItem];
}
