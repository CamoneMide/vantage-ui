function SandpackLoadingState() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '16px',
      }}
    >
      {/* Editor skeleton */}
      <div
        style={{
          height: '200px',
          borderRadius: '8px',
          border: '1px solid rgba(10,10,10,0.08)',
          background:
            'linear-gradient(90deg, #F5F5F6 25%, #EBEBED 50%, #F5F5F6 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
        }}
      />
      {/* Preview skeleton */}
      <div
        style={{
          height: '140px',
          borderRadius: '8px',
          border: '1px solid rgba(10,10,10,0.08)',
          background:
            'linear-gradient(90deg, #F5F5F6 25%, #EBEBED 50%, #F5F5F6 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
        }}
      />
      <span
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '13px',
          color: 'rgba(10,10,10,0.6)',
          textAlign: 'center',
        }}
      >
        Initializing sandbox...
      </span>
      <style>
        {`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}
      </style>
    </div>
  );
}

export { SandpackLoadingState };
