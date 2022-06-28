<script>
  export let editor;

  let isPlaying = false;
  const signals = editor.signals;

  function playStop() {
    if (isPlaying === false) {
    isPlaying = true;
    signals.startPlayer.dispatch();
  } else {
    isPlaying = false;
    signals.stopPlayer.dispatch();
  } 
  }

</script>

<div on:click="{playStop}">
  <a class="btn btn-ghost normal-case">{isPlaying ? "Stop" : "Play"}</a>
</div>
