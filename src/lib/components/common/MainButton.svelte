<script lang="ts">
	import Spinner from '$lib/components/common/Spinner.svelte';
	import coin from "$lib/components/common/Coin.svelte?raw";

	export let caption: string | number;
	export let isLoading: boolean = false;
	export let withCoin: boolean = false;
	export let id:string = '';
	export let textStyles:string = ''
	export let wrapBtnStyles:string = ''
	export const variant: "default" | "hover" | 'active' | 'disable' = 'blue'

	const handleStylesByVariant = {
		default:
			`
		`,
		hover: `

		`,
		active: 'btn-gray',
		disable: 'btn-gray'
	}

</script>

{#if !isLoading}
		<div style='' class="w-full h-full relative {!isLoading
					? 'animate-updated-button'
					: ''}">
			<button
				on:click
				id={id}
				style="{wrapBtnStyles}  {handleStylesByVariant[variant]}"
				class="w-full h-full relative flex flex-row justify-center items-center father-anima z-[2] main-btn"
			>
				<div style={textStyles} class=" absolute w-full h-full flex justify-center items-center  gap-[3px] text-center font-['Poppins']  ">
					{#if withCoin}
						<span style={textStyles}>
							{@html coin}
						</span>
						&nbsp;
					{/if}
					{caption}
				</div>
			</button>
			<div
				style=''
				class="absolute top-0 left-0 w-full h-full flex justify-center items-center"
			></div>
		</div>
{:else}
	<Spinner></Spinner>
{/if}

<style lang="scss">

	.main-btn {
    border: 1px solid #4F44B6;
    background: linear-gradient(90deg, #272D3F 0%, #161924 100%);
		&:hover{
      border: 1px solid #6D5FEF;
      background: linear-gradient(289deg, #313D63 0.74%, #161924 107.39%), linear-gradient(90deg, #272D3F 0%, #161924 100%);
    }
		&:active{
      background: linear-gradient(90deg, #272D3F 0%, #161924 100%), linear-gradient(0deg, #0B0D13 0%, #090B0F 100%);
			border: 1px #090813 solid;
    }
		&:disabled{
      background: linear-gradient(90deg, #272D3F 0%, #161924 100%); border: 1px #4F44B6 solid;
    }
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
