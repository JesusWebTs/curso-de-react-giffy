import { useEffect, useState } from "react";
import { useGifs } from "./useGifs";
import getSingleGif from "../services/getSingleGif";
export default function useSingleGif({ id }) {
  const { gifs } = useGifs();
  const getGifFromCache = gifs.find((sigleGif) => sigleGif.id === id);
  const [gif, setGif] = useState(getGifFromCache);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!gif) {
      setIsLoading(true);
      getSingleGif({ id })
        .then((gif) => {
          setGif(gif);
          setIsLoading(false);
          setIsError(false);
        })
        .catch((err) => {
          setIsError(true);
          setIsLoading(false);
        });
    }
  }, [gif, id]);

  return { gif, isLoading, isError };
}
