<script lang="ts">
	import { playerState } from '$lib/state/player.state';
	import type { PiggyBankType } from '../../../../common/models/piggy-bank.type';

	export let pb: PiggyBankType;
	const maxPos = 87;
	const minPos = 14;

	let intermediateMultiplierPosition = Math.max(maxPos, Math.min(minPos + $playerState.pb.intermediateThreshold * 3.5, 330));
	let currentPos = ($playerState.pb.balance / $playerState.pb.balanceMax) * 325 || 0;
	let isMoreThenIntermediate = ($playerState.pb.balance / $playerState.pb.balanceMax) * 100 >= $playerState.pb.intermediateThreshold;
	let isMoreThenMax = $playerState.pb.balance >= $playerState.pb.balanceMax;

</script>
<div class="pb-toggle">
	<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="display: block; margin: 0 auto;  width: 100%; height: 40px;">
		<defs>
			<linearGradient id="gradientId" x1="0%" y1="0%" x2="100%" y2="0%">
				<stop offset="0%" style="stop-color:rgba(82, 77, 216, 1); stop-opacity:1" />
				<stop offset="100%" style="stop-color:rgba(114, 95, 234, 1); stop-opacity:1" />
			</linearGradient>
		</defs>

		<circle cx="30" cy="15" r="10" fill="black" stroke="rgb(51, 51, 51)" stroke-width="1" />

		<circle cx="354" cy="15" r="10" fill="black" stroke="rgb(51, 51, 51)" stroke-width="1" />

		<!-- Rectangle -->
		<rect x="30" y="10" width="324" height="10" fill="black" stroke="rgb(51, 51, 51)" stroke-width="1" rx="5" ry="5"
			  style="mask-image: linear-gradient(to right, rgb(0, 0, 0, 0) 2.5%, rgb(0, 0, 0, 1) 2.6%, rgb(0, 0, 0, 1) 97.4%, rgb(0, 0, 0, 0) 97.5%);" />


		<rect x="30" y="12" width="{currentPos}" height="6" fill="url(#gradientId)" rx="3" ry="3" />


		<circle cx="{intermediateMultiplierPosition}" cy="15" r="10" fill="black" stroke="rgb(51, 51, 51)" stroke-width="1"
				style="mask-image: linear-gradient(to top, rgb(0, 0, 0) 39%, rgba(0, 0, 0, 0) 39%, rgba(0, 0, 0, 0) 61%, rgb(0, 0, 0) 61%);
    -webkit-mask-position: 100% 50%;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 200% 200%;
"
		/>

		{#if isMoreThenIntermediate}
			<circle cx="{intermediateMultiplierPosition}" cy="15" r="8" fill="url(#gradientId)" />
		{/if}
		<circle cx="{intermediateMultiplierPosition}" cy="15" r="5" fill="rgb(51, 51, 51)" />

		{#if isMoreThenMax}
			<circle cx="354" cy="15" r="8" fill="url(#gradientId)" />
		{/if}
		<circle cx="354" cy="15" r="5" fill="rgb(51, 51, 51)" />

	</svg>
</div>
<div class="relative w-full h-[31px] text-white price-text">
			<span style="transform:translateX(-50%)" class="absolute left-[25px]">
					{ pb.balance}
			</span>
			<span style="left:{intermediateMultiplierPosition}px; transform:translateX(-50%)" class="absolute  ">
					{pb.balanceMax / 100 * pb.intermediateThreshold}
			</span>
			<span class="absolute right-[0%] translate-x-[-50%]">
					{pb.balanceMax}
					</span>
</div>

<style lang="scss">
  .pb-toggle {
    width: 90%;
    margin: 0 auto;
	svg {
	  display: block;
      width: 100%;
	}
  }
	.price-text span{
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 18px;

    text-align: center;
    letter-spacing: 0.01em;
    text-transform: uppercase;

    color: #EEEEEE;
  }
</style>

