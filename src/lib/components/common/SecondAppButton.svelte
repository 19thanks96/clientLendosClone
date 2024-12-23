<script lang="ts">
	import Spinner from '$lib/components/common/Spinner.svelte';

	export let caption: string;
	export let isLoading = false;
	export let variant: 'default' | 'reward' = 'default';
</script>

{#if !isLoading}
	{#if variant === 'default'}
		<div class="w-full h-full relative">
			<button
				on:click
				class="
					w-full h-full relative flex flex-row justify-center items-center z-[2] border border-[rgba(39,_42,_48,_1)] rounded-[12px]
				{!isLoading ? 'animate-updated-button' : ''}"
			>
				<div class="absolute w-full h-full flex justify-center items-center gap-[3px] font-['Poppins'] font-black text-[white] font-['Poppins'] font-[700] text-[#9D9D9D] text-[14px] leading-[1.5] text-center uppercase">
					{caption}
				</div>
			</button>
		</div>
	{:else if variant === 'reward'}
		<div class="w-full h-full relative">
			<button
				on:click
				class="
					w-full h-full relative flex flex-row justify-center items-center z-[2] border border-[rgba(39,_42,_48,_1)] bg-[] rounded-[12px] btn
				{!isLoading ? 'animate-updated-button' : ''}"
			>
				<div class="absolute w-full h-full flex justify-center items-center gap-[3px] font-['Poppins'] font-black text-[white] font-['Poppins'] font-[700] text-[#9D9D9D] text-[14px] leading-[1.5] text-center uppercase">
					{caption}
				</div>
			</button>
		</div>
	{/if}
{:else}
	<Spinner></Spinner>
{/if}

<style lang="scss">
	.btn{

    background: linear-gradient(90deg, #8C52E9 0%, #5F42E3 100%);

  }
  .animate-updated-button{
		transition: all 0.3s ease;
	}

   .animate-updated-button:not(:active) {
    animation: shrink 0.5s ease forwards;
  }

   .animate-updated-button:active {
    animation: decrease 0.5s ease forwards;
  }

   .animate-updated-button:hover {
    animation: decrease 0.5s ease forwards;
  }

   .animate-updated-button:not(:hover) {
    animation: shrink 0.5s ease forwards;
  }

  @keyframes decrease {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(0.9);
    }
  }

  @keyframes shrink {
    from {
      transform: scale(0.9);
    }
    to {
      transform: scale(1);
    }
  }

</style>
