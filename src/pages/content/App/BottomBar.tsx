import { useIsOpenStore } from "./stores/useIsOpenStore";
import { useLoginStore } from "./stores/useLoginStore";
import { LoginBar } from "./components/LoginBar";
import { Button } from "./ui/Buttons";
import { DraggableCloseBtn } from "./components/DraggableCloseBtn";

export default function BottomBar() {
  const { open } = useIsOpenStore();
  const { loggedIn } = useLoginStore();

  return (
    <div className="flex bg-inherit" style={{ height: open ? 30 : 0 }}>
      <div
        className="mr-4 flex-grow"
        style={{
          display: open ? "flex" : "none",
        }}
      >
        {loggedIn ? (
          <Button onClick={() => alert(1)}>Open</Button>
        ) : (
          <LoginBar />
        )}
      </div>
      <DraggableCloseBtn />
    </div>
  );
}
