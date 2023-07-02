export default function Button({ children, isOpen }) {
  return (
    <button className="btn-toggle" onClick={() => isOpen((open) => !open)}>
      {children}
    </button>
  );
}
