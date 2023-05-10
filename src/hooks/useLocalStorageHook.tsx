import { pink } from "@mui/material/colors";
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
  const [mapPins, setMapPins] = useState<Pin[] | []>([]);

  //init state, fetch localstorage data
  useEffect((): void => {
    console.log("fetching localstorage data if exists");
    let storage: string | null = localStorage.getItem(itemKey || "");
    const pinArray: Pin[] | [] = storage ? JSON.parse(storage) : undefined;
    setMapPins(pinArray);
  }, []);

  //keep localstorage in sync
  useEffect((): void => {
    if (mapPins.length > 0) {
      localStorage.setItem(itemKey, JSON.stringify(mapPins));
    }
  }, [mapPins]);

  //store new items
  //for now store the mapPins
  //does the storage already contain information
  function storeItem(data: Pin): void {
    console.log(data);
    let newPinArray: Pin[] = mapPins ? [...mapPins, data] : [data];
    setMapPins(newPinArray);
    localStorage.setItem(itemKey, JSON.stringify(newPinArray));
  }

  function deleteItem(data: Pin): void {
    setMapPins((prevItems) =>
      prevItems?.filter((item) => item.x != data.x && item.y != data.y)
    );
  }

  console.log(mapPins);
  //custom hook returns the data
  return [mapPins, storeItem, deleteItem];
}
