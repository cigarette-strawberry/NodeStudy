<script setup>
import HelloWorld from './components/HelloWorld.vue';

const token = location.search.split('=')[1];
// 登录成功之后 后端再进行重定向的时候会携带token
if (!token) {
  fetch('http://localhost:3000/login?appId=9LQ8Y3mB').then(response => {
    location.href = response.url;
  });
} else {
  localStorage.setItem('token', token);
}
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
