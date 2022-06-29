<script>
  export let editor;
  export let dev

  const viewport = dev.viewport
  let viewToggle = false
</script>

<div class="dropdown-end dropdown">
  <label for="" tabindex="0" class="avatar btn btn-ghost"> Dev </label>
  <ul
    tabindex="0"
    class="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow">
    <li>
      <button
        class="justify-between"
        on:click={() => {
          console.log(editor);
        }}>
        <span>log </span>editor</button>
        <button
        class="justify-between"
        on:click={() => {
          console.log(viewport);
        }}>
        <span>log </span>viewport</button>
    </li>
    <li>
      <button
        class="justify-between"
        on:click={() => {
          if (viewToggle) {
            viewport.addClass("hidden") 
            viewToggle = false
          } else {
            viewport.removeClass("hidden") 
            viewToggle = true
          }
        }}>
        <span>toggle </span>viewport</button>
    </li>
  </ul>
</div>
