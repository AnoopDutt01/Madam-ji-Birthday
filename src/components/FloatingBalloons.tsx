const FloatingBalloons = () => {
  const balloonColors = [
    "bg-primary",
    "bg-secondary", 
    "bg-accent",
    "bg-muted"
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          <div
            className={`${balloonColors[i % balloonColors.length]} w-16 h-20 rounded-full animate-rise opacity-70`}
            style={{
              animationDuration: `${10 + Math.random() * 5}s`,
            }}
          >
            <div className="absolute bottom-0 left-1/2 w-0.5 h-12 bg-gray-400/50 transform -translate-x-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingBalloons;
