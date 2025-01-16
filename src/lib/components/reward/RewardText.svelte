<script lang='ts'>
	import { base } from '$app/paths';
	import { t } from '$lib/i18n/config';
	import { onMount } from 'svelte';
	import coin from '$lib/components/common/Coin.svelte?raw';

	export let startAnimation: boolean;
	export let rewardAmount: number;
	$: frontMoney = rewardAmount.toLocaleString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
	let coinLeft: string, coinWidth: string, coinHeight: string, coinTop: string;
	let startAnimationLeft: string, startAnimationTop: string, startAnimationWidth: string, startAnimationHeight: string;

	const loadAnimationPos = () => {
		let coin = document.querySelector('.getPos')?.getBoundingClientRect();
		if (coin && coin.width !== 0) {

			coinLeft = `${coin.left}px`;
			coinWidth = `${coin.width}px`;
			coinHeight = `${coin.height}px`;
			coinTop = `${coin.top}px`;
		} else {
			setTimeout(() => {

			loadAnimationPos()
			},10)
			return
		}
		let startPositionAnimateCoin = document.querySelector('.startPosAnimateCoin')?.getBoundingClientRect();
		if (startPositionAnimateCoin && startPositionAnimateCoin.width !== 0) {
			startAnimationLeft = `${startPositionAnimateCoin.left}px`;
			startAnimationTop = `${startPositionAnimateCoin.top}px`;
			startAnimationWidth = `${startPositionAnimateCoin.width}px`;
			startAnimationHeight = `${startPositionAnimateCoin.height}px`;
		} else {
			setTimeout(() => {

				loadAnimationPos()
			},10)
			return
		}
	}


	onMount(() => {
		loadAnimationPos()
	});

</script>

<div style="position: fixed;
display: flex;
flex-direction: column;"
		 class=" z-[12] opacity-0 flex justify-center  bottom-[18%] port:bottom-[12%] w-full font-black text-center third-reward-element">
	<div style="font-style: normal;"
			 class="font-Poppins text-[14px] leading-[1] font-[600] text-[#A1A5AD]">
		{$t('dm.reward')}
	</div>
	<div class="vhHeight-[54] port:h-[10.463vw]  flex justify-center items-center">
		<div
			style=" transform: scale(0.7); transform-origin: right;"
			class="{startAnimation ? 'opacity-0' : 'opacity-1'} startPosAnimateCoin ml-[-4px] mr-[10px] h-full bg-no-repeat bg-contain inline-block">
			{@html coin}
		</div>
		<div style="transition: all 0.5s ease-out;"
				 class="{startAnimation ? 'opacity-0' : 'opacity-1'} font-['Poppins'] font-[700] text-[28px] leading-[1.5] text-[#E9E9E9] tracking-[0.01em]">
			{frontMoney}
		</div>
	</div>

</div>

<div style="animation-delay: 0s;
     --coinLeft: {coinLeft}; --coinWidth: {coinWidth}; --coinHeight: {coinHeight}; --coinTop: {coinTop};
      --startAnimationLeft: {startAnimationLeft}; --startAnimationWidth: {startAnimationWidth}; --startAnimationHeight: {startAnimationHeight}; --startAnimationTop: {startAnimationTop};
"
		 class="absolute   {startAnimation ? 'to-monney' : ''}  opacity-0   bg-no-repeat bg-contain inline-block w-[3.5%] h-[3.5%]">
	{@html coin}
</div>
<div
	style="animation-delay: 0.1s;
	--coinLeft: {coinLeft}; --coinWidth: {coinWidth}; --coinHeight: {coinHeight}; --coinTop: {coinTop};
 --startAnimationLeft: {startAnimationLeft}; --startAnimationWidth: {startAnimationWidth}; --startAnimationHeight: {startAnimationHeight}; --startAnimationTop: {startAnimationTop};
"
	class="absolute {startAnimation ? 'to-monney' : ''}  opacity-0   bg-no-repeat bg-contain inline-block w-[3.5%] h-[3.5%]">{@html coin}</div>
<div
	style="animation-delay: 0.2s;
	--coinLeft: {coinLeft}; --coinWidth: {coinWidth}; --coinHeight: {coinHeight}; --coinTop: {coinTop};
 --startAnimationLeft: {startAnimationLeft}; --startAnimationWidth: {startAnimationWidth}; --startAnimationHeight: {startAnimationHeight}; --startAnimationTop: {startAnimationTop};
"
	class="absolute {startAnimation ? 'to-monney' : ''}  opacity-0   bg-no-repeat bg-contain inline-block w-[3.5%] h-[3.5%]">{@html coin}</div>
<div
	style="animation-delay: 0.3s;
	--coinLeft: {coinLeft}; --coinWidth: {coinWidth}; --coinHeight: {coinHeight}; --coinTop: {coinTop};
 --startAnimationLeft: {startAnimationLeft}; --startAnimationWidth: {startAnimationWidth}; --startAnimationHeight: {startAnimationHeight}; --startAnimationTop: {startAnimationTop};
"
	class="absolute {startAnimation ? 'to-monney' : ''}  opacity-0   bg-no-repeat bg-contain inline-block w-[3.5%] h-[3.5%]">{@html coin}</div>
<div
	style="animation-delay: 0.4s;
	--coinLeft: {coinLeft}; --coinWidth: {coinWidth}; --coinHeight: {coinHeight}; --coinTop: {coinTop};
 --startAnimationLeft: {startAnimationLeft}; --startAnimationWidth: {startAnimationWidth}; --startAnimationHeight: {startAnimationHeight}; --startAnimationTop: {startAnimationTop};
"
	class="absolute {startAnimation ? 'to-monney' : ''}  opacity-0   bg-no-repeat bg-contain inline-block w-[3.5%] h-[3.5%]">{@html coin}</div>


<style lang="scss">
  .third-reward-element {
    animation: show-elements 0.5s ease-in-out forwards;
    animation-delay: 0.75s;
  }

  @keyframes show-elements {
    0% {
      opacity: 0;

    }
    100% {
      opacity: 1;
    }
  }



    .to-monney {
      animation: to-monneyMob 1s ease-in-out forwards;
      animation-delay: 1s;
    }

    @keyframes to-monneyMob {
      0% {
        opacity: 1;
        position: fixed;
        top: 0;
        left: 0;
        width: var(--startAnimationWidth);
        height: var(--startAnimationHeight);
        transform: translate(var(--startAnimationLeft), var(--startAnimationTop));
        margin-left: 0vw;
        margin-bottom: 0vh;
      }
      45% {
        margin-left: -15vw;

      }
      99% {
        opacity: 1;
        width: var(--startAnimationWidth);
        height: var(--coinWidth);
		position: fixed;
        left: 0;
        top: 0;
        margin-left: 0vw;
        margin-bottom: 0vh;
        transform: translate(calc(var(--coinLeft)), calc(var(--coinTop))) scale(1);
      }
			100%{
        opacity: 0;
			}
    }

</style>
