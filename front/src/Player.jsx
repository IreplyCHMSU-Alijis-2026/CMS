import { useEffect, useState } from "react";
import axios from "axios";

export default function Player() {
  const [content, setContent] = useState([]);
  const [index, setIndex] = useState(0);

const DEFAULT_VIDEO = {
  _id: "default-video",
  title: "Promo",
  type: "video",
  fileUrl: "https://res.cloudinary.com/du4otsazk/video/upload/v1774593695/l9joevy9vqglkct4rijo.mp4",
  startTime: new Date().toISOString(),
  endTime: new Date(new Date().getTime() + 5 * 60 * 1000).toISOString(),
};

const fetchContent = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/public/content`);
    const newData = res.data.data;

  
    const dataWithFallback = newData.length > 0 ? newData : [DEFAULT_VIDEO];

    setContent((prev) => {
      const isSame =
        prev.length === dataWithFallback.length &&
        prev.every((item, i) => item._id === dataWithFallback[i]?._id);

      if (isSame) return prev;

      const currentItem = prev[index];
      const newIndex = dataWithFallback.findIndex(i => i._id === currentItem?._id);

      if (newIndex !== -1) {
        setIndex(newIndex);
      } else {
        setIndex(0);
      }

      return dataWithFallback;
    });
  } catch (err) {
    console.error("Failed to fetch content:", err.message);
    // On fetch error, show default video
    setContent([DEFAULT_VIDEO]);
    setIndex(0);
  }
};

// const fetchContent = async () => {
//   try {
//     const res = await axios.get(`${import.meta.env.VITE_API_URL}/public/content`);

//     const newData = res.data.data;

//     setContent((prev) => {
    
//       const isSame = prev.length === newData.length &&
//         prev.every((item, i) => item._id === newData[i]?._id);

//       if (isSame) return prev; 

  
//       const currentItem = prev[index];
//       const newIndex = newData.findIndex(i => i._id === currentItem?._id);

//       if (newIndex !== -1) {
//         setIndex(newIndex); 
//       } else {
//         setIndex(0); 
//       }

//       return newData;
//     });

//   } catch (err) {
//     console.error("Failed to fetch content:", err.message);
//   }
// };

  
  useEffect(() => {
    fetchContent();

    const interval = setInterval(fetchContent, 10000); 

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    if (content.length === 0) return;

    const item = content[index];


    if (item.type === "video") return;

    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % content.length);
    }, 10000); 

    return () => clearTimeout(timer);
  }, [index, content]);

  if (content.length === 0) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "40px",
        }}
      >
        Loading content...
      </div>
    );
  }

  const item = content[index];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        overflow: "hidden",
      }}
    >
      {item.type === "image" ? (
        <img
          key={item._id}
          src={item.fileUrl}
          alt={item.title}
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "",
          }}
          onError={() => console.log("Image failed:", item.fileUrl)}
        />
      ) : (
        <video
          key={item._id}
          src={item.fileUrl}
          autoPlay
          playsInline
          muted
          controls={false}
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
          }}
          onEnded={() => setIndex((prev) => (prev + 1) % content.length)}
          onError={() => console.log("Video failed:", item.fileUrl)}
        />
      )}
    </div>
  );
}