import './App.css'
import { useEffect } from 'react'

function App() {

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("Failed to get 2D context from canvas.");
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.strokeStyle = "#BADA55";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 100;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let hue = 0;

    function draw(e: MouseEvent) {
      if (!ctx) return; // Ensure ctx is not null before using it
      if (!isDrawing) return;
      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      lastX = e.offsetX;
      lastY = e.offsetY;
      hue = (hue >= 360) ? 0 : hue + 1;
    }

    function clearCanvas() {
      if (!ctx) return; // Ensure ctx is not null before using it
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    canvas.addEventListener("mousedown", (e) => {
      isDrawing = true;
      lastX = e.offsetX;
      lastY = e.offsetY;
    });

    canvas.addEventListener("mousemove", draw);

    canvas.addEventListener("mouseup", () => {
      isDrawing = false;
      clearCanvas();
    });

    canvas.addEventListener("mouseout", () => {
      isDrawing = false;
      clearCanvas();
    });

    document.body.appendChild(canvas);

    return () => {
      canvas.removeEventListener("mousedown", () => {});
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", () => {});
      canvas.removeEventListener("mouseout", () => {});
    };
  }, []);


  return (
    <>
      <main>
        <div className="chat-container">
          <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, doloribus deleniti. Est tenetur voluptatem odio vel.</h1>
        </div>
      </main>
    </>
  )
}

export default App
