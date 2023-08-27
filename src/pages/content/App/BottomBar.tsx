import { useIsOpenStore } from "../stores/useIsOpenStore";
import { useLoginStore } from "../stores/useLoginStore";
import { LoginBar } from "./components/LoginBar";
import { Button } from "./ui/Buttons";

export default function BottomBar() {
  const { open, toggleOpen } = useIsOpenStore();
  const { loggedIn } = useLoginStore();

  return (
    <div className="flex bg-inherit" style={{ width: open ? "w-full" : "fit" }}>
      <div
        className="mr-4 flex-grow"
        style={{
          display: open ? "flex" : "hidden",
          opacity: open ? 1 : 0,
        }}
      >
        {loggedIn ? (
          <Button onClick={() => alert(1)}>Open</Button>
        ) : (
          <LoginBar />
        )}
      </div>
      <Button
        btn="none"
        className="hover:bg-black"
        style={{ height: 40, width: 40 }}
        onClick={toggleOpen}
      >
        X
      </Button>
    </div>
  );
}
