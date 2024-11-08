import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    const url = "https://www.reddit.com/r/aww/top/.json?t=all";
    const result = await fetch(url);
    const data = await result.json();
    const images = data.data.children;
    // console.log(images);

    const jpgImages = images
      .filter((item) => item.data.url_overridden_by_dest.includes(".jpg"))
      .map((item) => item.data.url_overridden_by_dest);
    console.log(jpgImages);
    setImages(jpgImages);
    setLoading(false);
  };

  const handleClick = (dir) => {
    const lastIdx = images.length - 1;
    if (dir === "left") {
      if (index === 0) {
        setIndex(lastIdx);
      } else {
        setIndex((idx) => idx - 1);
      }
    } else {
      if (index === lastIdx) {
        setIndex(0);
      } else {
        setIndex((idx) => idx + 1);
      }
    }
  };

  useEffect(() => {
    const tid = setInterval(() => {
      handleClick("right");
    }, 2000);

    return () => {
      clearInterval(tid);
    };
  }, [index]);

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div>Loading....</div>
      ) : (
        <>
          <button onClick={() => handleClick("left")}>{"<"}</button>
          <img src={images[index]} alt="Demo Img" />
          <button onClick={() => handleClick("right")} className="right">
            {">"}
          </button>
        </>
      )}
    </div>
  );
}

export default App;
