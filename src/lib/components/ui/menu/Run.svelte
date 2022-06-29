<script>
  import { APP } from "../../../js/libs/app.js";
  import { onMount } from "svelte";

  export let editor;

  const signals = editor.signals;
  const app = new APP.Player();
  let isRunning = false;

  function playStop() {
    if (isRunning === false) {
      isRunning = true;
      signals.startPlayer.dispatch();
    } else {
      isRunning = false;
      signals.stopPlayer.dispatch();
    }
  }

  signals.windowResize.add(function () {
    app.setSize(document.body.clientWidth, document.body.clientHeight);
  });

  signals.startPlayer.add(function () {
    // container.setDisplay("");

    app.load(editor.toJSON());
    app.setSize(document.body.clientWidth, document.body.clientHeight);
    app.play();
  });

  signals.stopPlayer.add(function () {
    // container.setDisplay("none");
    // app.dom.classList.add("hidden")

    app.stop();
    app.dispose();
  });

  onMount(()=>{
    document.body.appendChild(app.dom)
  })
</script>

<svelte:window on:resize="{()=>{
  // TODO-DefinitelyMaybe: Setup better sizing
  app.setSize(document.body.clientWidth, document.body.clientHeight);
}}"/>

<button class="btn btn-ghost normal-case" on:click={playStop}
  >{isRunning ? "Stop" : "Run"}</button>
