<script>
  import {
    score,
    round,
    time,
    page,
    initScore,
    initTime,
  } from "../../store/store";
  export let shuffle = function () {};
  export let modalTitle = "";
  export let scoreTitle = "";
  export let btn1Text = "";
  export let isGameOver = false;

  function setHiScore() {
    // localStorage에 hiScore를 저장하고 가져오기
    let hiScore = 0; // 최고점수 저장 변수

    hiScore = Number(localStorage.getItem("hiScore")) || 0;

    console.log(hiScore);

    // 최고 점수일 경우에만 저장
    if ($score > hiScore) {
      localStorage.setItem("hiScore", String($score));
    }

    // 마지막 득점한 스코어를 저장
    localStorage.setItem("lastScore", String($score));
  }
</script>

<div class="modal">
  <div class="modal-container">
    <h1>{modalTitle}</h1>
    <p class="score-title">{scoreTitle}</p>
    <p class="score">{$score}</p>
    <button
      class="btn next"
      on:click={() => {
        setHiScore();
        if (btn1Text === "Next") {
          shuffle();
          $round += 1;
          initTime();
        } else {
          $page = "play";
          initScore();
          shuffle();
          isGameOver = false;
        }
      }}>{btn1Text}</button
    >
    <button
      class="btn"
      on:click={() => {
        setHiScore();
        $page = "title";
        initScore();
      }}
    >
      Home
    </button>
  </div>
</div>

<style lang="scss">
  // 모달창 스타일
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    display: grid;
    place-items: center;

    .modal-container {
      background: #fff;
      width: 400px;
      padding: 20px;
      border-radius: 30px;
      border: 10px solid #000;
      h1 {
        margin-bottom: 5px;
      }
      .score-title {
        font-size: 20px;
        color: #666;
      }
      .score {
        font-size: 36px;
        color: #f63030;
        margin-bottom: 20px;
      }
    }

    .btn {
      font-size: 24px;
      &.next {
        color: #f63030;
      }
    }
  }
</style>
