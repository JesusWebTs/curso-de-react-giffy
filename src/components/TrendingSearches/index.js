import React, { Suspense } from "react";
import { useNearScreen } from "hooks/useNearScreen";
import Spinner from "components/Spinner";
//import TrendingSearches from "./TrendingSearches";

const TrendingSearches = React.lazy(() => import("./TrendingSearches"));

function LazyTrending() {
  const [isNearScreen, fromRef] = useNearScreen({ distance: "0px" });
  return (
    <div ref={fromRef}>
      <Suspense fallback={<Spinner />}>
        {isNearScreen ? <TrendingSearches /> : <Spinner />}
      </Suspense>
    </div>
  );
}

export default LazyTrending;

