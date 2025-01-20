<script lang="ts">
    import BgImage from '$lib/components/scratching-cards/BgImage.sc.svelte';
    import UserBalance from '$lib/components/common/Money.svelte';
    import ExitButton from '$lib/components/common/ExitButton.svelte';
    import MusicButton from '$lib/components/common/MusicButton.svelte';
    // import MainBlock from '$lib/components/scratching-cards/MainBlock.svelte';
    import CapMainBlock from '$lib/components/scratching-cards/CapMainBlock.svelte';
    import Info from '$lib/components/common/Info.svelte';
    import {playerState} from '$lib/state/player.state';
    import {base} from '$app/paths';
    import {rewardState} from '$lib/state/reward.state';
    import HeaderMainBlock from '$lib/components/mission/HeaderMainBlock.svelte';
    import MainBlock from '$lib/components/mission/MainBlock.svelte';
    import Spinner from '$lib/components/common/Spinner.svelte';
    import CountdownTimer from '$lib/components/common/CountdownTimer.svelte';
    import Title from '$lib/components/mission/Title.svelte';
    import timer from '$lib/components/common/Timer.svelte?raw';
	import ScratchMoonItem from '$lib/components/scratching-cards/ScratchMoonItem.svelte';
    import {AdapterCommunicationService} from "$lib/adapter-listener";
    import Coin from "$lib/components/common/Coin.svelte";

    let money: number = 500;
    let maxWin: number = 1000000;
    let scratchPrice: number = 100;

    let styleCoins = 'width: 24px; height: 24px';
    let component: HTMLElement | null = null;
    let animatedJackpot = 0;

    function startCounter(target: number) {
        animatedJackpot = $playerState.sc.jackpotBase;

        const updateCounter = () => {
            const increment = target / 10; // можно поменять «скорость»
            if ($playerState.sc.jackpotBase < target) {
                // Math.ceil – чтобы число шло без дробей
                $playerState.sc.jackpotBase = Math.ceil($playerState.sc.jackpotBase + increment);
                setTimeout(updateCounter, 10);
            } else {
                $playerState.sc.jackpotBase = target;
            }
        };
        updateCounter();
    }

    let missions, balance, dateEnd, name;
    $: if ($playerState.isInitialized && $playerState.sc) {
        dateEnd = $playerState.sc.endDate;
        name = $playerState.sc.title;
        balance = $playerState.general.balance;
        animatedJackpot = $playerState.sc.jackpotBase;
    }

    let scratchText = [
        "2080",
        'tray again'
    ]

    $playerState.isInitialized = true;
    //$playerState.sc = {};

    let win = true;

    let isActiveBg = false;
    let isActiveCoin = false;
    let isActiveBalance = false;

    const startAnimation = () => {
        isActiveBg = true;
        isActiveCoin = true;
        isActiveBalance = true;
        setTimeout(function() {
            isActiveCoin = false;
        }, 1460);
    };


    $:if($playerState.sc.reward) {
       setTimeout(() => {
           startAnimation()
           if($playerState.sc.type === 'freeSpins' || $playerState.sc.type === 'bonusCash') {
               AdapterCommunicationService.sendMessage({
                   type: 'offerAnimation',
                   message: {
                       componentPositions: component?.getBoundingClientRect()
                   }
               });
           }
       },100)

    }
    const exit = () => AdapterCommunicationService.sendMessage({ type: 'exit', message: 'click' });

    const onScratch = () => AdapterCommunicationService.sendMessage({ type: 'scratch', message: {scId: $playerState.sc.id} });

    // onMount(() => setTimeout(() => sendMessageToParent({ type: 'appLoaded' }), 200));

</script>


<div style='height: 100dvh;' class=" w-screen overflow-hidden">

	{#if $playerState?.isInitialized && $playerState?.sc}
		<div class="{$rewardState.isOpen ? 'opacity-0' :'opacity-1'} relative ">
			<div class="relative top-[30px] left-[13px] z-[9]">
				<UserBalance {balance} isNotReward={true} />
			</div>
			<div class="absolute top-[30px] right-[15px] z-[9]">
				<ExitButton on:click={exit} />
			</div>
		</div>
		{#key $playerState}
			<div class="w-full h-full bg-contain bg-no-repeat blackHole z-[3] top-[14px_!important] ">
				<div style="background-image: url('https://p2w-object-store.fra1.cdn.digitaloceanspaces.com/resources/client/common/timerBg.svg')"
						 class="relative top-[56px] left-[0.1px] timer text-[#D2D2D2] text-[10px] leading-[1.5] flex items-center  bg-contain bg-no-repeat">
					<div  class="w-full h-full bg-contain bg-no-repeat flex items-center justify-center">
										<span class="h-auto  ml-[5px] font-['Poppins'] font-[700] text-[14px] leading-[15px] text-[#080808]">
													<CountdownTimer {dateEnd} />
											</span>
					</div>
				</div>
				<Title title={$playerState.mg.name}
							 description={$playerState.mg.info} text={name} />
			</div>
			<div class="absolute top-[16px] left-0 right-0 bottom-0 border-rounded overflow-hidden z-[0]">
				<div
					style='background-image:linear-gradient(to bottom, rgba(0, 0, 0, 0) 90%, rgba(0, 0, 0, 1) 95%),  url({base}/reskin/blackHole.png)'
					class="w-full h-full bg-contain bg-no-repeat blackHole">

				</div>
			</div>
            <div class="main-scratch">
                <div class="main-scratch__content">
                    <div class="main-scratch__content-head">
                        <h3 class="main-scratch__content-title">
                            {$playerState.sc.jackpotDescription}
                        </h3>
                        <p class="main-scratch__content-value {isActiveBalance && 'active'}">
                            {animatedJackpot}
                        </p>
                    </div>
                    <div class="main-scratch__content-block">
                        <div class="scratch-container">
                            <div class="not-scratched {isActiveBg ? 'active' : ''}"></div>
                            <div class="scratched"></div>
                            {#if isActiveBg}
                              <div bind:this={component} class="scratched-text f-center-center">
                                  {#if $playerState.sc.type === 'coins'}
                                      <Coin {styleCoins} />
                                      {$playerState.sc.reward}
                                  {:else if $playerState.sc.type === 'freeScratch'}
                                      {$playerState.sc.reward} free scratch
                                  {:else if $playerState.sc.type === 'freeSpins' || $playerState.sc.type === 'bonusCash' || $playerState.sc.type === 'tryAgain'}
                                      {$playerState.sc.reward}
                                  {/if}
                              </div>
                            {/if}
                        </div>
                        {#if isActiveCoin}
                            <div class="scratch-coin">
                                <img
                                class="coin {isActiveCoin ? 'active' : ''}"
                                src="https://p2w-object-store.fra1.cdn.digitaloceanspaces.com/resources/client/sc/Coin.svg"
                                alt="Coin"
                                />
                            </div>
                        {/if}
                        <!-- <ScratchMoonItem color='moon' win={win} text={scratchText[0]}/> -->
                    </div>
                    <div class="main-scratch__info">
                        <p class="main-scratch__info-text">
                            {$playerState.sc.description}
                        </p>
                    </div>
                    <div class="main-scratch__btns">
                        {#if $playerState.sc.error}
                            <div class="main-scratch__error">
                                {$playerState.sc.error}
                            </div>
                         {/if}
                        <button disabled={!!$playerState.sc.error} on:click={onScratch}  style="
                            background: linear-gradient(90deg, #272D3F 0%, #161924 100%);
                            border: 1px solid #4F44B6;
                            border-radius: 12px;
                            font-family: 'Poppins';
                            font-style: normal;
                            font-weight: 600;
                            text-transform: uppercase;
                            color: #E9E9E9;
                            gap: 4px;
                            " class="main-scratch__btn w-full h-full relative flex flex-row justify-center items-center father-anima z-[2] text-[12px] leading-[18px] animate-updated-button">
                            <div class="w-full h-full flex justify-center items-center gap-[3px] w-[12px] h-[12px] main-scratch__btn-offer">
                                {#if $playerState.sc.costOfScratch !== 0}
                                    {$playerState.sc.buttonText}
                                <span class="w-[14px] h-[14px]">
                                        <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="9" cy="9" r="9" fill="#FFEE1C"></circle>
                                            <circle cx="9.00023" cy="9.00023" r="6.92308" fill="#F9E920"></circle>
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                  d="M4.23856 8.11089C3.81517 8.22715 3.46094 8.56131 3.46094 9.00038C3.46094 9.43944 3.81517 9.7736 4.23856 9.88986C6.11582 10.4053 7.59446 11.884 8.10992 13.7612C8.22617 14.1846 8.56034 14.5388 8.9994 14.5388C9.43846 14.5388 9.77263 14.1846 9.88888 13.7612C10.4043 11.884 11.883 10.4053 13.7602 9.88986C14.1836 9.7736 14.5379 9.43944 14.5379 9.00038C14.5379 8.56131 14.1836 8.22715 13.7602 8.11089C11.883 7.59544 10.4043 6.1168 9.88888 4.23954C9.77263 3.81614 9.43846 3.46191 8.9994 3.46191C8.56034 3.46191 8.22617 3.81614 8.10992 4.23954C7.59446 6.1168 6.11582 7.59544 4.23856 8.11089Z"
                                                  fill="black"></path>
                                      </svg>
                                   </span>
                              {/if}
                            {$playerState.sc.costOfScratch === 0 ? 'free scratch' : $playerState.sc.costOfScratch}</div></button>
                    </div>
                </div>
            </div>
			<div class="absolute top-[16px] left-0 right-0 bottom-0 border-rounded overflow-hidden">
				<div
					style='background-image:linear-gradient(to bottom, rgba(0, 0, 0, 0) 90%, rgba(0, 0, 0, 1) 95%),  url({base}/reskin/blackHole.png)'
					class="w-full h-full bg-contain bg-no-repeat blackHole">

				</div>
			</div>
			<div style='background-image: url({base}/reskin/scratchAstro.png)'
					 class="absolute h-full bg-contain bg-no-repeat astronaut ">

			</div>
		{/key}

	{:else}
		<Spinner></Spinner>
	{/if}
</div>

<style lang='scss'>

.scratch-container {
    position: relative;
    width: 300px;
    height: 64px;
    overflow: hidden;
    border-radius: 10px;
  }

  .not-scratched {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-image: url('https://p2w.imgix.net/resources/client/sc/gold-close.svg?auto=compress&auto=format');
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    transition: clip-path 1.5s linear;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    z-index: 3;
  }

  .main-scratch__error{
    color: red;
  }
  .not-scratched.active {
    clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
  }

  .scratched {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-image: url('https://p2w.imgix.net/resources/client/sc/gold-open.svg?auto=compress&auto=format');
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    z-index: 1;
  }

  .coin {
    position: absolute;
    top: 50%;
    left: -60px;
    transform: translateY(-50%);
    width: 60px;
    height: 60px;
    z-index: 3;
    opacity: 0;
  }

  .coin.active {
    // display: none;
    opacity: 1;
    animation-fill-mode: forwards;
    animation-delay: 0s;
    animation: move-coin 1.5s linear, random-move 1.5s ease-in-out;
  }

  @keyframes move-coin {
    from {
      left: -50px;
    }
    to {
      left: 100%;
    }
  }

  @keyframes move-coin {
    from {
      left: -50px;
    }
    to {
      left: 100%;
    }
  }

  @keyframes random-move {
    0% {
      transform: translateY(-50%);
      display: none;
    }
    20% {
      transform: translateY(-80%);
    }
    40% {
      transform: translateY(-20%);
    }
    60% {
      transform: translateY(-80%);
    }
    80% {
      transform: translateY(-20%);
    }
    99% {
      transform: translateY(-80%);
    }
    100% {
        transform: translateY(-80%);
    }
  }

  // .coin.active {
  //   animation-play-state: running;
  // }

  .scratched-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 28px;
    font-weight: 700;
    font-weight: bold;
    color: black;
    gap: 7px;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .scratched-text svg {
    width: 12px;
      height: 12px;
      display: block;
  }

  .main-scratch {
    position: absolute;
    bottom: 24px;
    left: 0;
    z-index: 1;
    font-family: 'Poppins';
    width: calc(100% - 42px);
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    &__content {
        text-align: center;
        width: 100%;
        &-title {
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 16px;
            color: #9FA5B1;
        }
        &-value {
            background: linear-gradient(178deg, #F0FF6D 2%, #F5FD00 24.46%, #F8B000 55.63%, #DE8000 84.88%, #FEDD00 114.81%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 52px;
            font-style: normal;
            margin-top: 1px;
            font-weight: 900;
            line-height: 61.771px;
            &.active {
              animation-fill-mode: forwards;
              animation-delay: 0s;
              animation: pulls-value 1s ease;
            }
        }
        &-block {
            margin: 0 auto;
            margin-top: 30px;
            width: 300px;
            position: relative;
            height: 35px;
        }
    }
    &__btns {
        margin-top: 47px;
    }
    &__btn {
        padding: 7px 0px;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.2px;
        gap: 4px;
        text-transform: uppercase;
        span {
            display: flex;
            align-items: center;
        }
        svg {
            display: block;
            width: 14px;
            height: 14px;
        }
        &-offer {
            gap: 4px;
        }
    }
    &__info {
        margin-top: 46px;
        &-text {
            margin: 0 auto;
            font-family: 'Poppins';
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            color: #A1A5AD;
            line-height: 16px;
            max-width: 255px;
        }
    }
  }

  @keyframes pulls-value {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.15);
    }
    100% {
      transform: scale(1);
    }
  }


</style>
