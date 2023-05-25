import { useEffect, useState } from "react";
import { Pin, PinTemplate } from "../types/types";

type localStorageReturnType<T> = [
  T[] | [],
  (data: T) => void,
  (data: T) => void
];

export default function useLocalStorage<T>(
  itemKey: string
): localStorageReturnType<T> {
  const [mapPins, setMapPins] = useState<T[] | []>(() => {
    let storage: string | null = localStorage.getItem(itemKey || "");
    return storage ? JSON.parse(storage) : [];
  });

  useEffect(() => {
    if (mapPins && mapPins.length >= 0) {
      localStorage.setItem(itemKey, JSON.stringify(mapPins));
    }
  }, [mapPins, itemKey]);

  function storeItem(data: T): void {
    let newPinArray: T[] = mapPins ? [...mapPins, data] : [data];
    setMapPins(newPinArray);
    localStorage.setItem(itemKey, JSON.stringify(newPinArray));
  }

  function deleteItem(data: T): void {
    if (isPin(data)) {
      setMapPins((prevItems) =>
        prevItems?.filter((item) => isPin(item) && item?.pinId !== data?.pinId)
      );
    }
    if (isPinTemplate(data)) {
      setMapPins((prevItems) =>
        prevItems?.filter(
          (item) => isPinTemplate(item) && item?.label !== data?.label
        )
      );
    }
  }

  //type predicates to check for Pin type
  function isPin(obj: any): obj is Pin {
    return obj && typeof obj.pinId === "string";
  }

  //type predicates to check for PinTemplate type
  function isPinTemplate(obj: any): obj is PinTemplate {
    return obj && typeof obj.label === "string";
  }

  return [mapPins, storeItem, deleteItem];
}
