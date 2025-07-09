import { writable } from "svelte/store";

const defalutTime = 5;

// store 변수 만들기
export const score = writable(0);
export const round = writable(1);
export const time = writable(defalutTime);
export const page = writable("title");

// store 변수 초기화
export const initScore = () => {
  score.set(0);
  round.set(1);
  time.set(defalutTime);
};

// 게임 시간 초기화
export const initTime = () => {
  time.set(defalutTime);
};
