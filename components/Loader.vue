<template>
  <div class="flex justify-center items-center">
    <div class="loader"></div>
  </div>
</template>

<style>
.loader {
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: #ffffff;
  animation: spin 1s infinite linear;
  border-width: 4px;
  border-style: solid;
  border-radius: 50%;
  width: 24px;
  height: 24px;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
