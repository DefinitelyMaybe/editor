import adapter from 'svelte-adapter-deno';
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// default options are shown
      out: 'build',
      // deps: './deps.js' // (relative to adapter-deno package)
		}),
	},
	preprocess: preprocess()
};

export default config;
