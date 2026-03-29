import { createSignal, onCleanup, onMount } from "solid-js";
import "./counter.css";

interface Props {
  onComplete?: string;
}

export default function Counter(props: Readonly<Props>) {
  const [count, setCount] = createSignal(0);

  // Faster, smoother counter with easing
  const startTime = Date.now();
  const duration = 1500; // 1.5 seconds total

  const updateCounter = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out cubic for smooth deceleration
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * 100);
    
    setCount(current);

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      setCount(100);
      if (props.onComplete) {
        setTimeout(() => {
          try {
            new Function(props.onComplete)();
          } catch (e) {
            console.error("Counter onComplete error:", e);
          }
        }, 200); // Small delay before exit
      }
    }
  };

  onMount(() => {
    requestAnimationFrame(updateCounter);
  });

  return (
    <div class="counter-container">
      <p class="counter">{count()}</p>
      <div class="progress-bar" style={{ width: `${count()}%` }}></div>
    </div>
  );
}
