module.exports = {
	content: ['./src/**/*.{css,html,js,jsx,ts,tsx,vue,svelte}'],
	safelist: [
		// 'text-blue-100',
		// {pattern: /text-(red|grey)-(500|800)/}
	],
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/line-clamp')
	]
};