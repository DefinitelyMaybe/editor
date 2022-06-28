<script>
  let button
  let key = ""
  let open = false
  export let action
</script>

<button class="btn m-1 h-20 w-20" on:click="{action}" bind:this="{button}">
  <div class="dropdown dropdown-top {open ? 'dropdown-open' : ''}" on:blur="{()=>{open = false}}">
    <label tabindex="0" class="hidden"> none </label>
    <ul
      tabindex="0"
      class="dropdown-content menu rounded-box w-20 bg-base-100 p-2 shadow">
      <li>
        <input type="text" class="input input-bordered w-16" bind:value={key} />
      </li>
    </ul>
  </div>
  <slot name="icon"></slot>
  <p>{key}</p>
</button>