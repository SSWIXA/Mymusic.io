<template>
  <div id="app">
    <router-view />
    <div class="fly bg-fly-circle1"></div>
    <div class="fly bg-fly-circle2"></div>
    <div class="fly bg-fly-circle3"></div>
    <div class="fly bg-fly-circle4"></div>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.bg-fly-circle1 {
  left: 40px;
  top: 100px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(
    to right,
    rgba(100, 84, 239, 0.07) 0%,
    rgba(48, 33, 236, 0.04) 100%
  );
  -webkit-animation: move 2.5s linear infinite;
  animation: move 2.5s linear infinite;
}
.bg-fly-circle2 {
  left: 3%;
  top: 60%;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(
    to right,
    rgba(100, 84, 239, 0.08) 0%,
    rgba(48, 33, 236, 0.04) 100%
  );
  -webkit-animation: move 3s linear infinite;
  animation: move 3s linear infinite;
}
.bg-fly-circle3 {
  right: 2%;
  top: 140px;
  width: 145px;
  height: 145px;
  border-radius: 50%;
  background: linear-gradient(
    to right,
    rgba(100, 84, 239, 0.1) 0%,
    rgba(48, 33, 236, 0.04) 100%
  );
  -webkit-animation: move 2.5s linear infinite;
  animation: move 2.5s linear infinite;
}
.bg-fly-circle4 {
  right: 5%;
  top: 60%;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: linear-gradient(
    to right,
    rgba(100, 84, 239, 0.02) 0%,
    rgba(48, 33, 236, 0.04) 100%
  );
  -webkit-animation: move 3.5s linear infinite;
  animation: move 3.5s linear infinite;
}
.fly {
  pointer-events: none;
  position: fixed;
  z-index: 100;
}

@keyframes move {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(25px);
  }

  100% {
    transform: translateY(0px);
  }
}
</style>
