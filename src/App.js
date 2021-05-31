import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Gallery from "./components/Gallery";

const App = () => {
  // app state
  const [search, setSearch] = useState("");
  const [images, setImages] = useState([]);
  const [actualPage, setActualPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);

  useEffect(() => {
    if (!search) return;

    const consultAPI = async () => {
      const perPage = 30;
      const API_KEY = "21854148-19447da7a8aff2d0360a21421";
      const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${search}&per_page=${perPage}`;

      const response = await fetch(URL);
      const result = await response.json();

      setImages(result.hits);

      // calculate the total pages
      const totalPagesToCalculate = Math.ceil(result.totalHits / perPage);
      setTotalPage(totalPagesToCalculate);
    };
    consultAPI();
  }, [search]);

  const previewPage = () => {
    if (actualPage <= 1) return
    setActualPage(actualPage -1)
  }

  const nextPage = () => {
    if (actualPage >= totalPages) return
    setActualPage(actualPage +1)
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Images Finder</p>

        <Form setSearch={setSearch} />
      </div>
      <div className="row justify-content-center">
        <Gallery images={images} />
        <button type="button" onClick={previewPage} className="bbtn btn-info mr-1">&laquo; Preview</button>
        <button type="button" onClick={nextPage} className="bbtn btn-info mr-1">&raquo; next</button>
      </div>
    </div>
  );
};

export default App;
