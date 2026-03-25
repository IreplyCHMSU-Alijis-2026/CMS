import { useEffect, useState } from "react";
import axios from "axios";

export default function Player() {
  const [content, setContent] = useState([]);
  const [index, setIndex] = useState(0);


const fetchContent = async () => {
  try {
    const res = await axios.get("http://192.168.68.117:3000/public/content");

    const newData = res.data.data;

    setContent((prev) => {
    
      const isSame = prev.length === newData.length &&
        prev.every((item, i) => item._id === newData[i]?._id);

      if (isSame) return prev; 

  
      const currentItem = prev[index];
      const newIndex = newData.findIndex(i => i._id === currentItem?._id);

      if (newIndex !== -1) {
        setIndex(newIndex); 
      } else {
        setIndex(0); 
      }

      return newData;
    });

  } catch (err) {
    console.error("Failed to fetch content:", err.message);
  }
};

  
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