<script lang='ts'>
	import { base } from '$app/paths';
	import { t } from '$lib/i18n/config';
	import { onMount } from 'svelte';

	export let startAnimation: boolean;
	export let rewardAmount: number;
	$: frontMoney = rewardAmount.toLocaleString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
	let coinLeft: string, coinWidth: string, coinHeight: string, coinTop: string;
	let startAnimationLeft: string, startAnimationTop: string, startAnimationWidth: string, startAnimationHeight: string;

	onMount(() => {
		let coin = document.querySelector('.getPos')?.getBoundingClientRect();
		if (coin) {

			coinLeft = `${coin.left}px`;
			coinWidth = `${coin.width}px`;
			coinHeight = `${coin.height}px`;
			coinTop = `${coin.top}px`;
		}
		let startPositionAnimateCoin = document.querySelector('.startPosAnimateCoin')?.getBoundingClientRect();
		if (startPositionAnimateCoin) {
			startAnimationLeft = `${startPositionAnimateCoin.left}px`;
			startAnimationTop = `${startPositionAnimateCoin.top}px`;
			startAnimationWidth = `${startPositionAnimateCoin.width}px`;
			startAnimationHeight = `${startPositionAnimateCoin.height}px`;
		}
	});

</script>

<div style="position: fixed;
display: flex;
flex-direction: column;"
		 class=" z-[12] opacity-0 flex justify-center  bottom-[18%] port:bottom-[17.25%] w-full font-black text-center third-reward-element">
	<div style="color: #F7FCFF;
text-shadow: 0px 2.524px 0px #151413;
-webkit-text-stroke-width: 1.2618380784988403;
-webkit-text-stroke-color: #3E3A37;
font-family: 'Changa One';

    font-style: normal;
    font-weight: 400;
    line-height: normal;"
			 class=" vhFont-[32] font-black port:text-[6.204vw] font-['Fira_Sans'] tracking-[0.042vw] port:tracking-[0.074vw] ml-[0.3vw] port:ml-[2vw]">
		{$t('dm.reward')}
	</div>
	<div class="vhHeight-[54] port:h-[10.463vw]  flex justify-center items-center">
		<div
			style=" background-image: url('https://p2w.imgix.net/resources/client/common/Icn_Coin.png?auto=compress&auto=format'); background-position: center center;     aspect-ratio: 1 / 1.05; transform: scale(1.1) translateY(5px);"
			class="{startAnimation ? 'opacity-0' : 'opacity-1'} startPosAnimateCoin ml-[-4px] mr-[10px] h-full bg-no-repeat bg-contain inline-block"></div>
		<div style="transition: all 0.5s ease-out; background: var(--H1-Headline, linear-gradient(181deg, #FFFF71 30.91%, #FCE000 46.39%, #FCE000 51.6%, #F2B40D 52.06%, #F5CF18 63.15%));
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;"
				 class="{startAnimation ? 'opacity-0' : 'opacity-1'} font-['Fira_Sans'] vhFont-[43] leading-[1.05] port:leading-[1.06] font-black port:text-[8.373vw] text-slate-200">
			{frontMoney}
		</div>

	</div>

</div>

<div style="animation-delay: 0s; background-image: url('https://p2w.imgix.net/resources/client/common/Icn_Coin.png?auto=compress&auto=format'); background-position: center center; aspect-ratio: 1/1;
     --coinLeft: {coinLeft}; --coinWidth: {coinWidth}; --coinHeight: {coinHeight}; --coinTop: {coinTop};
      --startAnimationLeft: {startAnimationLeft}; --startAnimationWidth: {startAnimationWidth}; --startAnimationHeight: {startAnimationHeight}; --startAnimationTop: {startAnimationTop};
"
		 class="absolute   {startAnimation ? 'to-monney' : ''}  opacity-0   bg-no-repeat bg-contain inline-block w-[3.5%] h-[3.5%]"></div>
<div
	style="animation-delay: 0.1s; background-image: url('https://p2w.imgix.net/resources/client/common/Icn_Coin.png?auto=compress&auto=format'); background-position: center center; aspect-ratio: 1/1;
	--coinLeft: {coinLeft}; --coinWidth: {coinWidth}; --coinHeight: {coinHeight}; --coinTop: {coinTop};
 --startAnimationLeft: {startAnimationLeft}; --startAnimationWidth: {startAnimationWidth}; --startAnimationHeight: {startAnimationHeight}; --startAnimationTop: {startAnimationTop};
"
	class="absolute {startAnimation ? 'to-monney' : ''}  opacity-0   bg-no-repeat bg-contain inline-block w-[3.5%] h-[3.5%]"></div>
<div
	style="animation-delay: 0.2s; background-image: url('https://p2w.imgix.net/resources/client/common/Icn_Coin.png?auto=compress&auto=format'); background-position: center center; aspect-ratio: 1/1;
	--coinLeft: {coinLeft}; --coinWidth: {coinWidth}; --coinHeight: {coinHeight}; --coinTop: {coinTop};
 --startAnimationLeft: {startAnimationLeft}; --startAnimationWidth: {startAnimationWidth}; --startAnimationHeight: {startAnimationHeight}; --startAnimationTop: {startAnimationTop};
"
	class="absolute {startAnimation ? 'to-monney' : ''}  opacity-0   bg-no-repeat bg-contain inline-block w-[3.5%] h-[3.5%]"></div>
<div
	style="animation-delay: 0.3s; background-image: url('https://p2w.imgix.net/resources/client/common/Icn_Coin.png?auto=compress&auto=format'); background-position: center center; aspect-ratio: 1/1;
	--coinLeft: {coinLeft}; --coinWidth: {coinWidth}; --coinHeight: {coinHeight}; --coinTop: {coinTop};
 --startAnimationLeft: {startAnimationLeft}; --startAnimationWidth: {startAnimationWidth}; --startAnimationHeight: {startAnimationHeight}; --startAnimationTop: {startAnimationTop};
"
	class="absolute {startAnimation ? 'to-monney' : ''}  opacity-0   bg-no-repeat bg-contain inline-block w-[3.5%] h-[3.5%]"></div>
<div
	style="animation-delay: 0.4s; background-image: url('https://p2w.imgix.net/resources/client/common/Icn_Coin.png?auto=compress&auto=format'); background-position: center center; aspect-ratio: 1/1;
	--coinLeft: {coinLeft}; --coinWidth: {coinWidth}; --coinHeight: {coinHeight}; --coinTop: {coinTop};
 --startAnimationLeft: {startAnimationLeft}; --startAnimationWidth: {startAnimationWidth}; --startAnimationHeight: {startAnimationHeight}; --startAnimationTop: {startAnimationTop};
"
	class="absolute {startAnimation ? 'to-monney' : ''}  opacity-0   bg-no-repeat bg-contain inline-block w-[3.5%] h-[3.5%]"></div>


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
    animation: to-monney 1s ease-in-out forwards;
    will-change: transform;
    z-index: 18;
  }

  @keyframes to-monney {
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
    50% {
      margin-left: -12vw;
      margin-bottom: -12vh;
    }

    100% {
      opacity: 1;
      width: var(--coinWidth);
      height: var(--coinHeight);
      left: 0;
      top: 0;
      margin-left: 0vw;
      margin-bottom: 0vh;
      transform: translate(var(--coinLeft), var(--coinTop)) scale(1);
    }
  }

  @media (orientation: portrait) {
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
      100% {
        opacity: 1;
        width: var(--coinWidth);
        height: var(--coinHeight);
		position: fixed;
        left: 0;
        top: 0;
        margin-left: 0vw;
        margin-bottom: 0vh;
        transform: translate(calc(var(--coinLeft)), calc(var(--coinTop))) scale(1);
      }
    }
  }
</style>
