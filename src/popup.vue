<template>
  <div class="popup">
    <button @click="openShortcuts">
      {{ translate("changeShortcut") }}
    </button>
  </div>
</template>
<script setup lang="ts">
  import {translate} from "./helpers/translate.ts";

  const openShortcuts = async () => {
    await chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
  };
</script>
<style scoped>
  .popup {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    padding: 0 20px;
  }

  button {
    background-color: #c693ea;
    border: none;
    color: #091307;
    font-weight: semibold;
    padding: 8px 16px;
    border-radius: 8px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #a97ad1;
  }
</style>
