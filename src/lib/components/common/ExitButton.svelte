<script lang="ts">
	import close from '$lib/components/common/close.svelte?raw';

</script>

<button on:click
				class="  exit-button w-[32px] aspect-[1/1] bg-black rounded-[50%]">
	<div class="m-auto w-[max-content]">

		{@html close}
	</div>
</button>

<style lang="scss">
  .exit-button {
    border: 1px solid rgba(216, 225, 255, 0.4);
    pointer-events: all;
  }
</style>
