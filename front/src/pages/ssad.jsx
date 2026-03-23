// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Player() {
//   const [content, setContent] = useState([]);
//   const [index, setIndex] = useState(0);

//   const fetchContent = async () => {
//     try {
//       const res = await axios.get("http://192.168.0.80:3000/public/content");
//       const now = new Date();

//       const filtered = res.data.filter(
//         (item) =>
//           new Date(item.startTime) <= now && new Date(item.endTime) >= now
//       );

//       // update only if content changed
//       setContent((prev) => {
//         if (JSON.stringify(prev) !== JSON.stringify(filtered)) {
//           setIndex(0);
//           return filtered;
//         }
//         return prev;
//       });
//     } catch (err) {
//       console.error("Failed to fetch content:", err.message);
//     }
//   };

//   // initial fetch + refresh every 5 minutes
//   useEffect(() => {
//     fetchContent();

//     const interval = setInterval(fetchContent, 1000 * 60 * 5);

//     return () => clearInterval(interval);
//   }, []);

//   // image timer
//   useEffect(() => {
//     if (content.length === 0) return;

//     const item = content[index];

//     // videos handle their own ending
//     if (item.type === "video") return;

//     const timer = setTimeout(() => {
//       setIndex((prev) => (prev + 1) % content.length);
//     }, 10000); // image display 30 sec

//     return () => clearTimeout(timer);
//   }, [index, content]);

//   if (content.length === 0) {
//     return (
//       <div
//         style={{
//           width: "100vw",
//           height: "100vh",
//           backgroundColor: "black",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           color: "white",
//           fontSize: "40px",
//         }}
//       >
//         Loading content...
//       </div>
//     );
//   }

//   const item = content[index];

//   return (
//     <div
//       style={{
//         width: "100vw",
//         height: "100vh",
//         backgroundColor: "black",
//         overflow: "hidden",
//       }}
//     >
//       {item.type === "image" ? (
//         <img
//           key={item._id}
//           src={item.fileUrl}
//           alt={item.title}
//           style={{
//             width: "100vw",
//             height: "100vh",
//             objectFit: "",
//           }}
//           onError={() => console.log("Image failed:", item.fileUrl)}
//         />
//       ) : (
//         <video
//           key={item._id}
//           src={item.fileUrl}
//           autoPlay
//           playsInline
//           controls={false}
//           style={{
//             width: "100vw",
//             height: "100vh",
//             objectFit: "cover",
//           }}
//           onEnded={() => setIndex((prev) => (prev + 1) % content.length)}
//           onError={() => console.log("Video failed:", item.fileUrl)}
//         />
//       )}
//     </div>
//   );
// }