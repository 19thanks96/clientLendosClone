<script lang="ts">
	import Spinner from '$lib/components/common/Spinner.svelte';
	import Coin from "$lib/components/common/Coin.svelte";

	export let isActive: boolean = true;
	export let showBorderWhenInactive: boolean = false;
	export let color: string;
	export let caption: string | number;
	export let index: number | undefined = undefined;
	export let isLoading: boolean = false;
	export let requiresAttentionSeeker: boolean | undefined = undefined;
	export let withCoin: boolean = false;
	export let id:string = '';
	export let textClasses:string = ''
	export let wrapBtnStyles:string = ''


	const animationDelay = 1 + (index + 1) / 2 + 's';
	let images: Record<string, Record<string, string>> = {
		yellow: {
			center: `https://p2w.imgix.net/resources/client/common/Btn_Cmn_M_Yellow_Up.png?auto=compress&auto=format`,
			secondBg: `
				background: #481CE8;
				filter: blur(4.5px);
				border-radius: 8px;
				transform-origin: 50% 50%;
				z-index: -1;
`,
			mainbg: `
				background: linear-gradient(90deg, #8C52E9 0%, #5F42E3 100%);
				border-radius: 8px;
				font-family: 'Poppins';
				font-style: normal;
				font-weight: 600;
				text-transform: uppercase;
				color: #E9E9E9;
				z-index: 1;
			`,
			stroke:
				'border: 1px solid white; border-radius: 10px; padding: 3px; width: 102px; height: 36px'
		},
		green: {
			center: `https://p2w.imgix.net/resources/client/common/Btn_Cmn_M_Green_Up.png?auto=compress&auto=format`,
			mainbg: `
			background: linear-gradient(90deg, #272D3F 0%, #161924 100%);
			border: 1px solid #4F44B6;
			border-radius: 8px;
			font-family: 'Poppins';
			font-style: normal;
			font-weight: 600;
			text-transform: uppercase;
			color: #E9E9E9;
			gap: 4px;
			`,
			secondBg: ` `,
			stroke: `width : 100%; height: 100%;}`
		}
	};
</script>

{#if !isLoading}
	{#if isActive}
		<div style={images[color].stroke} class="w-full h-full relative {!isLoading
					? 'animate-updated-button'
					: ''}">
			<button
				on:click
				id={id}
				style="{wrapBtnStyles} {images[color].mainbg} {requiresAttentionSeeker
					? ` --scaling-delay: ${animationDelay}`
					: ''}"
				class="
				{requiresAttentionSeeker
					? 'requiresAttentionSeeker '
					: ''}
					w-full h-full relative flex flex-row justify-center items-center father-anima z-[2]
				"
			>
				<div class="absolute w-full h-full flex justify-center items-center  gap-[3px] {textClasses}">
					{#if withCoin}
						<span class="{textClasses}">
								<Coin styleCoins="width: 18px; height: 18px;"/>

						</span>
						&nbsp;
					{/if}
					{caption}
				</div>
			</button>
			<div
				style={images[color].secondBg}
				class="absolute top-0 left-0 w-full h-full flex justify-center items-center"
			></div>
		</div>
	{:else if showBorderWhenInactive}
		<div
			style=" -webkit-text-stroke-width: thin; -webkit-text-stroke-color: {images[color]
				.stroke}; text-shadow: 0px 0.1em {images[color].stroke}; {images[color].mainbg}"
			class="opacity-40  relative w-full h-full font-['Fira_Sans'] overflow-hidden font-black text-slate-200 bg-[length:100%_100%] father-anima flex justify-center items-center"
		>
			<div class="w-full h-full flex relative overflow-hidden {color + '-button'}  ">
				<div
					class="button-hidden-image bg-contain bg-repeat-x flex-1 flex items-center justify-center"
					style="position: absolute; height: 50%; left: 2%;  top: 8.5%; width: 96%; border-radius: 16px; {images[
						color
					].secondBg} "
				></div>
			</div>
			<div class=" z-[2] absolute">{caption}</div>
		</div>
	{:else}
		<div
			class="font-['Fira_Sans'] font-black text-[#CBC6B0] port:text-[3.7vw] vhFont-[17] flex justify-center items-center cursor-not-allowed"
		>
			{caption}
		</div>
	{/if}
{:else}
	<Spinner></Spinner>
{/if}

<style lang="scss">
  .btn{
    background: linear-gradient(90deg, #8C52E9 0%, #5F42E3 100%);
  }
  .animate-updated-button button{
    transform: scale(1);
    transition: all 0.5s ease;
  }

  .animate-updated-button:hover button {
    transform: scale(0.9);
  }

  .animate-updated-button:not(:hover) button {
    transform: scale(1);
  }
</style>
