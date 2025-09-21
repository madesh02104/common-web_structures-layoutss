import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const [crackEffects, setCrackEffects] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = (e) => {
      setIsClicked(true);
      // Generate random crack pattern
      const generateRandomCrack = () => {
        const centerX = 100;
        const centerY = 100;
        const cracks = [];
        const numCracks = 6 + Math.floor(Math.random() * 3);

        for (let i = 0; i < numCracks; i++) {
          const zigzagPoints = [];
          let currentX = centerX;
          let currentY = centerY;
          let currentAngle = Math.random() * 2 * Math.PI;
          let remainingLength = 50 + Math.random() * 40;
          const totalLength = remainingLength;

          // Add starting point
          zigzagPoints.push({ x: currentX, y: currentY, width: 6 });

          // Generate zigzag segments
          while (remainingLength > 0) {
            const segmentLength = Math.min(
              30 + Math.random() * 20,
              remainingLength
            );
            currentX += Math.cos(currentAngle) * segmentLength;
            currentY += Math.sin(currentAngle) * segmentLength;

            // Calculate tapered width
            const progress = (totalLength - remainingLength) / totalLength;
            const newWidth = Math.max(0.5, 6 - progress * 5.5);

            zigzagPoints.push({
              x: currentX,
              y: currentY,
              width: newWidth,
            });

            // Change direction
            const directionChange = ((Math.random() - 0.5) * Math.PI) / 1.5;
            currentAngle += directionChange;
            remainingLength -= segmentLength;
          }

          cracks.push({ points: zigzagPoints });
        }

        return cracks;
      };

      const newCrack = {
        id: Date.now() + Math.random(),
        x: e.clientX - 100 - 8,
        y: e.clientY - 100 - 8,
        rotation: Math.random() * 360,
        scale: 0.8 + Math.random() * 0.4,
        cracks: generateRandomCrack(),
      };

      setCrackEffects((prev) => {
        const newEffects = [...prev, newCrack];
        return newEffects.length > 10 ? newEffects.slice(-10) : newEffects;
      });

      // Clean up after animation completes
      setTimeout(() => {
        setCrackEffects((prev) =>
          prev.filter((crack) => crack.id !== newCrack.id)
        );
      }, 2100);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / documentHeight, 1);
      setScrollProgress(progress);
    };

    document.addEventListener("mousemove", updateCursorPosition);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousemove", updateCursorPosition);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className="custom-cursor"
        style={{
          left: cursorPosition.x - 16,
          top: cursorPosition.y - 16,
          transform: `rotate(${isClicked ? -20 : -15}deg)`,
        }}
      >
        <img src="/PirateHook.png" alt="Custom cursor" />
      </div>

      {/* Render crack effects */}
      {crackEffects.map((crack) => (
        <div
          key={crack.id}
          className="crack-effect"
          style={{
            left: crack.x,
            top: crack.y,
            transform: `rotate(${crack.rotation}deg) scale(${crack.scale})`,
          }}
        >
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="crackFilter">
                <feGaussianBlur stdDeviation="0.3" result="blur" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
                />
              </filter>
              <linearGradient
                id="crackGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "rgba(0,0,0,0.9)", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "rgba(0,0,0,0.3)", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>

            {/* Impact point (center) */}
            <circle
              cx="100"
              cy="100"
              r="3"
              fill="url(#crackGradient)"
              filter="url(#crackFilter)"
            />

            {/* Crack lines with tapering width */}
            {crack.cracks.map((crackLine, index) => {
              return crackLine.points.slice(1).map((point, pointIndex) => {
                const prevPoint = crackLine.points[pointIndex];
                const currentWidth = point.width || 2;

                return (
                  <line
                    key={`${index}-${pointIndex}`}
                    x1={prevPoint.x}
                    y1={prevPoint.y}
                    x2={point.x}
                    y2={point.y}
                    stroke="url(#crackGradient)"
                    strokeWidth={currentWidth}
                    filter="url(#crackFilter)"
                    strokeLinecap="round"
                  />
                );
              });
            })}
          </svg>
        </div>
      ))}

      {/* Ship at top right */}
      <div className="ship-container">
        <img src="/ship.png" alt="Ship" className="ship" />
      </div>

      {/* Treasure at bottom right */}
      <div className="treasure-container">
        <img src="/treasure.png" alt="Treasure" className="treasure" />
      </div>

      {/* Anchor with rope */}
      <div className="anchor-container">
        <div
          className="rope"
          style={{
            height: `${50 + scrollProgress * (window.innerHeight - 230)}px`,
          }}
        />
        <img
          src="/anchor.png"
          alt="Anchor"
          className="anchor"
          style={{
            top: `${50 + scrollProgress * (window.innerHeight - 250)}px`,
          }}
          onLoad={(e) => {
            console.log("Anchor image loaded successfully");
            console.log("Anchor element:", e.target);
            console.log("Anchor position:", e.target.getBoundingClientRect());
          }}
          onError={(e) => {
            e.target.style.display = "none";
            console.log("Anchor image failed to load");
          }}
        />
      </div>

      <h1 className="mb-[150vh] bg-amber-300">hello</h1>
      <p>Testing scrolls</p>
    </>
  );
}

export default App;
