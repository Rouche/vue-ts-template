<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png">
    <helloworld :msg="message"/>
    <hellomars :msg="message2"/>

    <button type="button" @click="testClick()">Test</button>
  </div>
</template>

<!-- @Important
 Example for vue-pre-loader with overridden script
-->
<script lang="ts" src="__{{{sections.script.src}}}__">
</script>
