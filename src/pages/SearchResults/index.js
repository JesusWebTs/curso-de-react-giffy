import React, { useEffect, useRef, useCallback } from "react";
import Spinner from "components/Spinner";
import ListOfGifs from "components/ListOfGifs";
import { useGifs } from "hooks/useGifs";
import { useNearScreen } from "hooks/useNearScreen";
import debounce from "just-debounce-it";
/* import useSeo from "hooks/useSeo"; */
import { Helmet } from "react-helmet";

export default function SearchResults({ params }) {
  const { keyword } = params;
  const { loading, gifs, setPage } = useGifs({ keyword });
  const externalRef = useRef();
  const [isNearScreen] = useNearScreen({
    distance: "200px",
    externalRef: loading ? null : externalRef,
    once: false,
  });
  let title =
    gifs.length > 0
      ? `Numero de resultados ${gifs.length}`
      : "No hay resultados";
  let description = `Details of ${keyword}`;
  /* useSeo({ title, description }); */

  //const handleNextPage = () => setPage((prevPage) => prevPage + 1); No usar de esta forma para ivocar todo dentro de use callback
  //const handleNextPage = () => console.log("Next Page");

  const debounceHandleNextPage = useCallback(
    debounce(() => setPage((prevPage) => prevPage + 1), 200),
    [setPage]
  );

  useEffect(() => {
    console.log(isNearScreen);
    if (isNearScreen) debounceHandleNextPage();
  }, [isNearScreen, debounceHandleNextPage]);

  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content="Gif searcher"></meta>
        </Helmet>
          <h3 className="App-title">{decodeURI(keyword)}</h3>
          <ListOfGifs gifs={gifs} />
        </>
      )}
      <div id="visor" ref={externalRef}></div>
    </React.Fragment>
  );
}
