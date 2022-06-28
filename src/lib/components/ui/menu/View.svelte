<script>
  function toggleFullscreen() {
    if (document.fullscreenElement === null) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }

    // Safari

    if (document.webkitFullscreenElement === null) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
</script>

<div class="dropdown ">
  <label tabindex="0" class="btn btn-ghost"> View </label>
  <ul
    tabindex="0"
    class="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow">
    <li on:click={toggleFullscreen}><a>Fullscreen</a></li>
  </ul>
</div>
