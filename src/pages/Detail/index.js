import React from "react";
import Gif from "components/Gif";
import useSingleGif from "hooks/useSingleGif";
import Spinner from "components/Spinner";
import { Redirect } from "wouter";
import useSeo from "hooks/useSeo";
import { Helmet } from "react-helmet";

export default function Detail({ params }) {
  const { gif, isLoading, isError } = useSingleGif({ id: params.id });
  const title = gif ? gif.title : "";
  useSeo({ title: title });

  console.log(isError);
  console.log(gif);

  if (isLoading)
    return (
      <>
        <Helmet>
          <title>Cargando ...</title>
        </Helmet>
        <Spinner></Spinner>
      </>
    );
  if (isError) return <Redirect to="/404"></Redirect>;

  if (!gif) return null;
  return (
    <>
      <Helmet>
        <title>{title} | Giffy</title>
      </Helmet>
      <h3 className="App-title">{gif.title}</h3>
      <Gif {...gif} />
    </>
  );
}
