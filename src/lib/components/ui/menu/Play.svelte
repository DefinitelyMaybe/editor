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

<button class="btn btn-ghost normal-case" on:click={playStop}
  >{isPlaying ? "Stop" : "Play"}</button>
