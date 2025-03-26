import { useEffect, useState } from 'react';

function FlyingCircles() {
  const [circles, setCircles] = useState<
    { id: number; size: number; opacity: number; delay: number }[]
  >([]);

  useEffect(() => {
    const generateCircles = () => {
      const newCircles = Array.from({ length: 50 }, (_, index) => ({
        id: index,
        size: Math.floor(Math.random() * 5) + 2,
        opacity: Math.random(),
        delay: Math.random() * 5,
      }));
      setCircles(newCircles);
    };

    generateCircles();
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {circles.map((circle) => (
        <div
          key={circle.id}
          className={`animate-fly absolute left-[-4rem] rounded-full bg-white`}
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            opacity: circle.opacity,
            animationDelay: `${circle.delay}s`,
            top: `${Math.random() * 100}%`, // Random vertical position
          }}
        ></div>
      ))}
    </div>
  );
}

export default FlyingCircles;
