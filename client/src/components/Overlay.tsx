export default function Overlay({
  open,
  onOpen,
}: {
  open: boolean;
  onOpen(): void;
}) {
  return (
    <div
      onClick={onOpen}
      className={`mt-20 w-[100vw] h-[100vh] backdrop-blur-sm fixed z-[4000] ${
        open ? 'opacity-90' : 'opacity-0'
      } ${open ? '' : 'pointer-events-none'}`}
    ></div>
  );
}
