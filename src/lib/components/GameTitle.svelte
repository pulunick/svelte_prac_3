<script>
  import GamePlay from "./GamePlay.svelte";
  import GameScore from "./GameScore.svelte";
  import { page } from "../../store/store";
  import bgm from "../../assets/audio/bgm.mp3";
  import { onDestroy } from "svelte";

  export let title;

  let _BGM = new Audio(bgm);

  // BGM 재생
  function playBGM() {
    _BGM.loop = true; // 자동 반복
    _BGM.play();
  }

  $: {
    // 게임 화면이 아니면 BGM 멈춤
    if ($page !== "play") {
      _BGM.pause();
      _BGM.currentTime = 0;
    }
  }

  // 컴포넌트 종료시 오디오 객체 삭제
  onDestroy(() => {
    _BGM.pause();
    _BGM.currentTime = 0;
    _BGM.remove();
  });
</script>

<main>
  {#if $page === "title"}
    <section class="itim-regular">
      <h1>{title}</h1>
      <div class="btn-group">
        <button
          class="btn itim-regular"
          on:click={() => {
            $page = "play";
            playBGM();
          }}>Start</button
        >
        <button
          class="btn itim-regular"
          on:click={() => ($page = "score")}>Score</button
        >
      </div>
    </section>
  {:else if $page === "play"}
    <GamePlay />
  {:else if $page === "score"}
    <GameScore />
  {/if}
</main>

<style lang="scss">
  section {
    h1 {
      font-size: 16vw;
      color: #ff3e00;
      -webkit-text-stroke: 10px rgba(0, 0, 0, 0.5);
      paint-order: stroke fill;
    }
    .btn-group {
      display: flex;
      flex-direction: column;
      margin-top: 40px;
      button {
        padding: 10px;
        font-size: 32px;
        background: transparent;
        border: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
