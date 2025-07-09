<script>
  import { page } from "../../store/store";

  // localStorage에서 점수기록 가져오기
  const hiScore = localStorage.getItem("hiScore") || 0;
  const lastScore = localStorage.getItem("lastScore") || 0;
</script>

<main>
  <h1 class="itim-regular">Game Score</h1>
  <div class="score">
    <p class="hi-score">Hi Score: <span>{hiScore}</span></p>
    <p class="your-score">Last Score: <span>{lastScore}</span></p>
  </div>
  <button
    class="btn itim-regular"
    on:click={() => ($page = "title")}
  >
    Back to home
  </button>
</main>

<style lang="scss">
  main {
    h1 {
      font-size: 12vw;
      color: #ff3e00;
      -webkit-text-stroke: 10px rgba(255, 255, 255, 1);
      paint-order: stroke fill;
    }
    .score {
      font-size: 36px;
      font-weight: bold;
      margin: 70px 0;
      p {
        margin-bottom: 10px;
      }
    }
  }
</style>
