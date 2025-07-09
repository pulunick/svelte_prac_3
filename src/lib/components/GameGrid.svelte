<script>
  import soundSrcClick from "../../assets/audio/click.mp3";
  import { score, time } from "../../store/store.js";
  import Modal from "./Modal.svelte";

  let clickSound = new Audio(soundSrcClick);

  // 카드 데이터
  const card_data = [
    {
      id: 0,
      name: "html",
      imgUrl: "images/html.png",
    },
    {
      id: 1,
      name: "css",
      imgUrl: "images/css.png",
    },
    {
      id: 2,
      name: "js",
      imgUrl: "images/js.png",
    },
    {
      id: 3,
      name: "react",
      imgUrl: "images/react.png",
    },
    {
      id: 4,
      name: "vue",
      imgUrl: "images/vue.png",
    },
    {
      id: 5,
      name: "svelte",
      imgUrl: "images/svelte.png",
    },
    {
      id: 6,
      name: "sass",
      imgUrl: "images/sass.png",
    },
    {
      id: 7,
      name: "github",
      imgUrl: "images/github.png",
    },
    {
      id: 8,
      name: "quest",
      imgUrl: "images/quest.png",
    },
  ];

  // 카드 목록
  // id:카드번호, flipped: 뒤집혀진 상태, matched: 매칭된 상태
  let cards = [
    { id: 0, flipped: false, matched: false },
    { id: 0, flipped: false, matched: false },
    { id: 1, flipped: false, matched: false },
    { id: 1, flipped: false, matched: false },
    { id: 2, flipped: false, matched: false },
    { id: 2, flipped: false, matched: false },
    { id: 3, flipped: false, matched: false },
    { id: 3, flipped: false, matched: false },
    { id: 4, flipped: false, matched: false },
    { id: 4, flipped: false, matched: false },
    { id: 5, flipped: false, matched: false },
    { id: 5, flipped: false, matched: false },
    { id: 6, flipped: false, matched: false },
    { id: 6, flipped: false, matched: false },
    { id: 7, flipped: false, matched: false },
    { id: 7, flipped: false, matched: false },
  ];

  // 카드 랜덤하게 섞기
  function shuffle() {
    isGameClear = false; // 게임 클리어 판정 변수 초기화
    cards = cards.sort(() => 0.5 - Math.random());
    cards.forEach((card) => {
      card.flipped = false;
      card.matched = false;
    });
    startTimer();
  }

  // 카드 뒤집기!
  function flipCard(i) {
    // 카드가 뒷면일 때 보여주기
    if (cards[i].flipped === false) {
      cards[i].flipped = true;
    }

    // 1초 후에 다시 카드가 닫힘
    setTimeout(() => {
      cards[i].flipped = false;
    }, 1000);

    // 카드 매칭 체크
    checkMatch(i);
  }

  // 클릭한 카드 저장 배열
  let pairArr = [null, null]; // 2개의 카드 저장

  // 게임 클리어 판정 변수
  let isGameClear = false;

  // 카드 매칭 체크
  function checkMatch(i) {
    // 카드 위치가 다를 때만 추가
    if (pairArr[1] !== i) {
      pairArr.push(i); // 클릭한 카드 번호 저장
      pairArr.shift(); // 이전 카드 번호 삭제
      console.log(pairArr);
      console.log(cards[pairArr[0]]?.id, cards[pairArr[1]].id);
    }

    // 카드 일치 판정
    if (
      cards[pairArr[0]]?.id === cards[pairArr[1]].id &&
      cards[pairArr[0]].flipped === true
    ) {
      cards[pairArr[0]].matched = true;
      cards[pairArr[1]].matched = true;
      $score += 100;
    }

    // 게임 클리어 판정 - 모든 카드가 매칭된 상태일 때
    isGameClear = cards.every((card) => card.matched === true);
    console.log(isGameClear);
  }

  // 게임 오버 상태
  let isGameOver = false;

  let timer;
  // 타이머 기능을 추가해서 time 변수를 1초씩 감소시키고, 0이되면 게임 오버

  function startTimer() {
    timer = setInterval(() => {
      $time -= 1;
      if ($time === 0) {
        isGameOver = true; // 게임 오버 상태
        clearInterval(timer); // 타이머 중지
      }
      if (isGameClear) clearInterval(timer); // 게임 클리어시 타이머 중지
    }, 1000);
  }

  // 게임 시작시 카드 랜덤하게 섞기
  shuffle();
</script>

<ul class="game-grid">
  {#each cards as card, i}
    <li class={card.flipped || card.matched === true ? "card" : "card hidden"}>
      <button
        on:click={() => {
          flipCard(i);
          clickSound.currentTime = 0;
          clickSound.pause();
          clickSound.play();
        }}
      >
        <img
          src={card_data[card.id].imgUrl}
          alt=""
        />
      </button>
      <span style="position:absolute;">{card.id}</span>
      <span style="position:absolute; bottom:0;">{card.matched}</span>
    </li>
  {/each}
</ul>
<!-- <br /><button on:click={shuffle}>Shuffle</button> -->

{#if isGameClear}
  <Modal
    shuffle={shuffle}
    modalTitle="Game Clear!"
    scoreTitle="Score"
    btn1Text="Next"
  />
{/if}

{#if isGameOver}
  <Modal
    bind:isGameOver={isGameOver}
    shuffle={shuffle}
    modalTitle="Game Over"
    scoreTitle="Final Score"
    btn1Text="Replay"
  />
{/if}

<style lang="scss">
  .game-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    list-style-type: none;
    grid-gap: 2%;
    padding: 20px;

    button {
      background: transparent;
      border: none;
    }

    .card {
      position: relative;
      background: #fff;
      aspect-ratio: 1 / 1;
      padding: 20%;
      border-radius: 18%;
      img {
        width: 100%;
        object-fit: contain;
        display: block;
        aspect-ratio: 1 / 1;
      }
    }
  }

  // 카드가 뒤집혀진 상태
  .game-grid .card.hidden {
    background: rgba(0, 0, 0, 0.5);
    img {
      opacity: 0;
    }
    background-image: url("images/quest.png");
    background-repeat: no-repeat;
    background-size: 30%;
    background-position: center;
  }
</style>
