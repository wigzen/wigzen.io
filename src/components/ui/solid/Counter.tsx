import { createSignal, onCleanup, onMount } from "solid-js";
import "./counter.css";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const interval = setInterval(() => {
    if (count() < 100) {
      setCount(count() + 1);
    } else {
      clearInterval(interval);
    }
  }, 20);
  onMount(() => {
    console.log("Counter mounted");
  });
  onCleanup(() => clearInterval(interval));

  return (
    <div className="counter-container">
      <p className="counter">{count()}</p>
    </div>
  );
}
