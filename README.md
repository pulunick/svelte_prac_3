# Svelte Pair Game

## 프로젝트 개요

Svelte 5를 사용하여 개발한 카드 짝 맞추기 게임입니다. 프론트엔드 기술 스택(HTML, CSS, JS, React, Vue, Svelte 등)을 테마로 한 카드들을 짝 맞추는 메모리 게임입니다.

## 🎮 게임 룰

### 기본 규칙

- 모든 카드는 초기 뒷면 상태로 시작
- 카드를 클릭하면 앞면을 보여주고, 2번째 카드를 클릭하면 매칭 판정 진행
- 클릭한 두 카드가 일치하지 않으면 1초 후 다시 뒷면으로 돌아감
- 클릭한 두 카드가 일치하면 해당 카드들이 열림 상태로 고정
- 모든 카드를 맞추면 점수를 획득하고 다음 라운드로 진행
- 제한 시간(5초) 내에 모든 카드를 맞추지 못하면 게임 오버

### 점수 시스템

- 카드 매칭 성공: 100점
- 최고점수와 마지막 점수를 localStorage에 저장

## 🛠️ 기술 스택

- **Frontend**: Svelte 5
- **Build Tool**: Vite
- **Styling**: SCSS
- **State Management**: Svelte Store
- **Audio**: HTML5 Audio API
- **Storage**: localStorage

## 📁 프로젝트 구조

```
src/
├── App.svelte                 # 메인 앱 컴포넌트
├── main.js                   # 앱 진입점
├── app.css                   # 글로벌 스타일
├── store/
│   └── store.js              # Svelte Store 상태 관리
├── lib/
│   └── components/
│       ├── GameTitle.svelte  # 게임 타이틀 및 페이지 라우팅
│       ├── GamePlay.svelte   # 게임 플레이 컨테이너
│       ├── GameInfo.svelte   # 게임 정보 (점수, 라운드, 시간)
│       ├── GameGrid.svelte   # 게임 그리드 및 카드 로직
│       ├── GameScore.svelte  # 점수 확인 페이지
│       └── Modal.svelte      # 게임 클리어/오버 모달
└── assets/
    └── audio/                # 게임 사운드 파일
```

## 🎯 Svelte 학습 포인트

### 1. **Svelte Store (상태 관리)**

```javascript
// store/store.js
import { writable } from "svelte/store";

export const score = writable(0);
export const round = writable(1);
export const time = writable(5);
export const page = writable("title");
```

**학습 내용:**

- `writable()`: 읽기/쓰기 가능한 store 생성
- 전역 상태 관리로 컴포넌트 간 데이터 공유
- `$store명`으로 자동 구독 및 반응형 업데이트

### 2. **반응형 구문 ($: {})**

```javascript
// GameTitle.svelte
$: {
  // 게임 화면이 아니면 BGM 멈춤
  if ($page !== "play") {
    _BGM.pause();
    _BGM.currentTime = 0;
  }
}
```

**학습 내용:**

- `$:`를 사용한 반응형 구문으로 상태 변화 감지
- 의존성이 변경될 때 자동 실행되는 코드 블록

### 3. **조건부 렌더링**

```svelte
<!-- GameTitle.svelte -->
{#if $page === "title"}
  <section>...</section>
{:else if $page === "play"}
  <GamePlay />
{:else if $page === "score"}
  <GameScore />
{/if}
```

**학습 내용:**

- `{#if}`, `{:else if}`, `{/if}` 블록으로 조건부 렌더링
- 페이지 라우팅 없이 컴포넌트 기반 화면 전환

### 4. **반복문과 배열 렌더링**

```svelte
<!-- GameGrid.svelte -->
{#each cards as card, i}
  <li class={card.flipped || card.matched ? "card" : "card hidden"}>
    <button on:click={() => flipCard(i)}>
      <img
        src={card_data[card.id].imgUrl}
        alt=""
      />
    </button>
  </li>
{/each}
```

**학습 내용:**

- `{#each}` 블록으로 배열 반복 렌더링
- 인덱스 접근 및 동적 클래스 바인딩

### 5. **이벤트 처리**

```svelte
<button
  on:click={() => {
    flipCard(i);
    clickSound.currentTime = 0;
    clickSound.play();
  }}
>
```

**학습 내용:**

- `on:이벤트명` 디렉티브로 이벤트 핸들링
- 인라인 함수 및 복합 이벤트 처리

### 6. **양방향 바인딩**

```svelte
<!-- Modal.svelte -->
<Modal bind:isGameOver />
```

**학습 내용:**

- `bind:` 디렉티브로 부모-자식 간 양방향 데이터 바인딩
- 자식 컴포넌트에서 부모 상태 직접 변경 가능

### 7. **Props 전달**

```svelte
<!-- GameTitle.svelte 내부 -->
<script>
  export let title;
</script>

<!-- GameTitle.svelte -->
<GameTitle title={gameTitle} />
```

**학습 내용:**

- `export let` 키워드로 props 받기
- 부모에서 자식으로 데이터 전달

### 8. **생명주기 함수**

```javascript
// GameTitle.svelte
import { onDestroy } from "svelte";

onDestroy(() => {
  _BGM.pause();
  _BGM.currentTime = 0;
  _BGM.remove();
});
```

**학습 내용:**

- `onDestroy` 훅으로 컴포넌트 정리 작업
- 메모리 누수 방지를 위한 리소스 정리

### 9. **SCSS 스타일링**

```scss
<style lang="scss">
  .game-info {
    position: absolute;
    background: rgba(255, 255, 255, 0.5);

    dl {
      display: flex;
      justify-content: space-between;

      dt, dd {
        font-size: max(2vw, 24px);
      }
    }
  }
</style>
```

**학습 내용:**

- 컴포넌트 스코프 스타일링
- SCSS 전처리기 사용
- 반응형 디자인 구현

### 10. **오디오 처리**

```javascript
// GameGrid.svelte
import soundSrcClick from "../../assets/audio/click.mp3";
let clickSound = new Audio(soundSrcClick);

// 사용법
clickSound.currentTime = 0;
clickSound.play();
```

**학습 내용:**

- 모듈 방식으로 오디오 파일 import
- HTML5 Audio API 활용
- 게임 사운드 효과 구현

### 11. **localStorage 활용**

```javascript
// Modal.svelte
function setHiScore() {
  let hiScore = Number(localStorage.getItem("hiScore")) || 0;

  if ($score > hiScore) {
    localStorage.setItem("hiScore", String($score));
  }

  localStorage.setItem("lastScore", String($score));
}
```

**학습 내용:**

- 브라우저 로컬 스토리지를 활용한 데이터 영속화
- 게임 점수 기록 및 관리

## 🚀 실행 방법

### 개발 환경 실행

```bash
npm install
npm run dev
```

### 빌드

```bash
npm run build
```

### 미리보기

```bash
npm run preview
```

## 🎨 주요 기능

### 1. 페이지 라우팅

- 타이틀 화면 → 게임 플레이 → 점수 확인
- 라우터 라이브러리 없이 상태 기반 화면 전환

### 2. 게임 로직

- 카드 셔플링 및 매칭 알고리즘
- 타이머 기능 및 게임 상태 관리
- 점수 계산 및 라운드 진행

### 3. 사운드 시스템

- 배경음악 (BGM) 자동 재생/정지
- 카드 클릭 효과음
- 페이지 전환 시 오디오 관리

### 4. 반응형 디자인

- 다양한 화면 크기 지원
- 뷰포트 기반 폰트 크기 조절
- 모바일 친화적 UI

## 📝 학습 성과

이 프로젝트를 통해 다음과 같은 Svelte의 핵심 개념들을 학습했습니다:

1. **상태 관리**: Svelte Store를 활용한 전역 상태 관리
2. **컴포넌트 설계**: 재사용 가능한 컴포넌트 구조화
3. **반응형 프로그래밍**: `$:` 구문을 통한 반응형 코드 작성
4. **이벤트 시스템**: 사용자 상호작용 처리
5. **생명주기 관리**: 컴포넌트 생성/소멸 시점 제어
6. **성능 최적화**: Svelte의 컴파일 타임 최적화 활용

## 🔧 개선 가능한 부분

- TypeScript 도입으로 타입 안정성 향상
- 난이도 조절 기능 추가
- 애니메이션 효과 강화
- 터치 제스처 지원 개선
- 접근성(A11y) 개선

## 📄 라이센스

이 프로젝트는 MIT 라이센스를 따릅니다.
