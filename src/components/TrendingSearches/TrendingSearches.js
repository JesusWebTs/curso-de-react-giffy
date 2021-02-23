import React, { useState, useEffect } from "react";
import Category from "components/Category";
import getTrendingTerms from "services/getTrendingTermsService";

function TrendingSearches() {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    getTrendingTerms().then((response) => {
      setTrends(response);
    });

    return () => {};
  }, []);
  return <Category name="Tendencias" options={trends} />;
}

export default TrendingSearches;
