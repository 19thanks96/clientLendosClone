<script lang="ts">

	import { pbState } from '$lib/state/pb.state';
	import {playerState} from "$lib/state/player.state";
	import {AdapterCommunicationService} from "$lib/adapter-listener";
	import coin from '$lib/components/common/Coin.svelte?raw';
	import { onDestroy, onMount } from 'svelte';
	import LessGreaterThanSvg from '$lib/components/piggy-bank/reskin/LessGreaterThanSvg.svelte?raw';
	let isSendTutorialRequest = false;
	let currentPos =  0;
	let step = $pbState.step / $playerState.pb.balanceMax * 100
	let maxPercent = ($playerState.general.balance  / ($playerState.pb.balanceMax -  $playerState.pb.balance)  * 100)
	let hideTimeoutHint : number;


	$:currentPosInPercent = currentPos * 100;
	$:currentPosInHalfPercent  = currentPosInPercent / 2
	let currentPosInBalance = Math.round($playerState.pb.balanceMax / 100 * currentPosInPercent)  || 0 ;

	const increaseDesiredHoldAmount = () => {
		currentPosInPercent = Math.max(0, Math.min( Math.max(0, Math.min(currentPosInPercent + step, 100) ), maxPercent) );
		currentPosInBalance = Math.round(($playerState.pb.balanceMax - $playerState.pb.balance) / 100 * currentPosInPercent)  || 0 ;



		const holdDepositCeil = $pbState?.bankRemainingBalance > $playerState?.general?.balance
			? $playerState?.general?.balance
			: $pbState.bankRemainingBalance;

		$pbState.desiredHoldDepositAmount += $pbState.step;
		if ($pbState.desiredHoldDepositAmount > holdDepositCeil) {
			$pbState.desiredHoldDepositAmount = holdDepositCeil
		}

		//#tutorial
		if($playerState.tutorial && $playerState.tutorial.step===2){
			AdapterCommunicationService.sendMessage({
				type: 'track',
				message: {type: 'clickTutorPbS1PlusButton'}
			});
		}


		if ($playerState.tutorial && $playerState.tutorial.step === 2 && $pbState.desiredHoldDepositAmount === $pbState.bankRemainingBalance) {
			if (isSendTutorialRequest) return;
			const holdPbButton = document.getElementById('pbHoldButton');
			const coordinates = holdPbButton?.getBoundingClientRect();
			AdapterCommunicationService.sendMessage({
				type: 'setTutorialCoordinates', message: {
					element: 'holdPbButton',
					coordinates: {
						x: coordinates?.x || 0,
						y: coordinates?.y || 0,
						width: coordinates?.width || 0,
						height: coordinates?.height || 0
					}
				}
			})
			isSendTutorialRequest = true;
		}
		handleChange()
	}

	const decreaseDesiredHoldAmount = () => {

		currentPosInPercent = Math.max(0, Math.min(Math.min(100, Math.max(currentPosInPercent - step, 0) ), maxPercent) );
		currentPosInBalance = Math.round(($playerState.pb.balanceMax - $playerState.pb.balance) / 100 * currentPosInPercent)  || 0 ;

		//#tutorial
		if ($playerState.tutorial && $playerState.tutorial.step === 2 && $pbState.desiredHoldDepositAmount === $pbState.bankRemainingBalance) {
			return;
		} else {
			if($playerState.tutorial && $playerState.tutorial.step===2){
				AdapterCommunicationService.sendMessage({
					type: 'track',
					message: {type: 'clickTutorPbS1MinusButton'}
				});
			}
			$pbState.desiredHoldDepositAmount -= $pbState.step;
			$pbState.desiredHoldDepositAmount = $pbState.desiredHoldDepositAmount < 0
				? 0
				: $pbState.desiredHoldDepositAmount;
		}

		handleChange()
	}
	let thumb: HTMLDivElement | undefined = undefined;
	let hint: HTMLDivElement | undefined;
	let container: HTMLDivElement | undefined;
	let isDragging = false; // Флаг отслеживания состояния перетаскивания

	const getClientX = (event: MouseEvent | TouchEvent): number => {
		if (event instanceof MouseEvent) {
			return event.clientX; // Используем стандартный clientX для мыши
		}
		if (event instanceof TouchEvent && event.touches.length > 0) {
			return event.touches[0].clientX; // Для сенсорных устройств выбираем первое касание
		}
		return 0; // Если ничего не подходит
	};

	const handleMove = (event: MouseEvent | TouchEvent) => {
		if (!isDragging || !thumb || !container) return;


		const containerRect = container.getBoundingClientRect();
		const clientX = getClientX(event);
		const left = Math.max(0, Math.min(clientX - containerRect.left - thumb.offsetWidth / 2, containerRect.width));
		const leftInPercent = (left / containerRect.width) * 100;

		if (leftInPercent >= 0 && leftInPercent <= 100) {
			currentPosInPercent = Math.max(0, Math.min(leftInPercent,  ($playerState.general.balance  / ($playerState.pb.balanceMax -  $playerState.pb.balance)  * 100)) );
			currentPosInBalance = Math.round(($playerState.pb.balanceMax - $playerState.pb.balance) / 100 * currentPosInPercent)  || 0 ;
			handleChange()
		}
	};

	const handleMouseDown = () => {
		isDragging = true;
		document.addEventListener('mousemove', handleMove);
		document.addEventListener('mouseup', handleMouseUp);
	};

	const handleMouseUp = () => {
		isDragging = false;
		document.removeEventListener('mousemove', handleMove);
		document.removeEventListener('mouseup', handleMouseUp);
	};

	const handleTouchDown = () => {
		isDragging = true;
		document.addEventListener('touchmove', handleMove);
		document.addEventListener('touchend', handleTouchUp);
	};

	const handleTouchUp = () => {
		isDragging = false;
		document.removeEventListener('touchmove', handleMove);
		document.removeEventListener('touchend', handleTouchUp);
	};


	const handleChange  = () => {
		$pbState.desiredHoldDepositAmount = currentPosInBalance +  $playerState.pb.balance
		if(thumb && hint && hint.style.opacity !== '1') {
			hint.style.opacity = '1';
			hint.style.transition = 'opacity 0.1s ease-in-out';
			if(hideTimeoutHint) {
				clearTimeout(hideTimeoutHint);
			}
			hideTimeoutHint = setTimeout(() => {
				hint.style.opacity = '0';
				hint.style.transition = 'opacity 0.5s ease-in-out';
				hideTimeoutHint = undefined;
			}, 1500);

		}
	}


	onMount(() => {

		if (thumb) {
			thumb.addEventListener('mousedown', handleMouseDown);
			thumb.addEventListener('touchstart', handleTouchDown);
		}
	});

	// Убираем слушатели при уничтожении компонента
	onDestroy(() => {
		if (thumb) {
			thumb.removeEventListener('mousedown', handleMouseDown);
			thumb.removeEventListener('touchend', handleTouchDown);
		}
		document.removeEventListener('mousemove', handleMove);
		document.removeEventListener('mouseup', handleMouseUp);
	});
</script>

<button class="control-buttons minus"  on:click={decreaseDesiredHoldAmount}>
</button>
<div bind:this={hint} style="left: {currentPosInHalfPercent}%" class="absolute top-[0] slider-description bg-white flex justify-center items-center opacity-[0]	">
	<div class="coin-wrapper px-[6px] flex flex-row text-xl">
		{@html coin}
	</div>
	<div class="text-[#d1d1d1] text-xl font-bold font-['Poppins'] uppercase tracking-tight inline">
		{currentPosInBalance}
		/
		{$playerState.pb.balanceMax - $playerState.pb.balance}</div>
</div>
<div bind:this={container} class="slider-container">
	<div class="slider">
		<div
			bind:this={thumb}

			style="left: {currentPosInPercent}%"
			class="thumb text-[#7E8394] " id="my-thumb"
		>
			<div class="flex justify-center items-center w-1/2 h-1/2" >
			{@html LessGreaterThanSvg}

			</div>
		</div>
	</div>
</div>


<button on:click={increaseDesiredHoldAmount} id="increasePbButton" class="control-buttons plus">

</button>

<style lang="scss">

  .control-buttons {
    width: 38px;
    height: 38px;
    background: #1E2025;
    border: 1px solid #272A30;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 38px;
    line-height: 1;
    text-align: center;
    color: #BEC2C9;
    border-radius: 11px;
  }

  .control-buttons::before,
  .control-buttons::after {
    content: '';
    position: absolute;
    background-color: rgba(126, 131, 148, 1);
    border-radius: 2px ;
    transform: translate(-50%, -50%);
  }

  .control-buttons::before {
    width: 16px;
    height: 2px;
  }

  .control-buttons:not(.minus)::after {
    width: 2px;
    height: 16px;
  }

	.slider-description{
		top: -62%;
    z-index: 2;
    width: 165px;
    height: 50px;


    background: #000000;
    border: 1px solid #1E2026;
    border-radius: 12px;
  }
  .slider-description:after{
		content: '';
		position: absolute;
		top: 48px;
    width: 15px;
		height: 15px;
    background: #000000;
    border: 1px solid #1E2026;
		transform: rotate(45deg) translateY(-70%);
		left: 50%;
		mask: linear-gradient(to right bottom, rgb(0,0,0,0) 49%, rgb(0,0,0,1) 50%);
  }

  .slider-container {
    position: relative;
    width: 225px;
    margin: 0 20px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 6px;
    background-color: #333;
    border-radius: 3px;
    outline: none;
    margin: 0;
    position: relative;
  }


  #my-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 32px;
    height: 32px;
    background-color: #292929; /* Цвет круга */
    border-radius: 50%;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5); /* Тень для красоты */
    cursor: pointer;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
		position: absolute;
    top: 50%;

    transform: translate(-50%, -50%);
  }


  .coin-wrapper{
    display: inline-block;
    height: 18px;
  }

  .slider-container {
    position: relative;
    width: 225px;
    height: 32px;
  }

  .slider {
    width: 100%;
    height: 6px;
    background-color: #333;
    border-radius: 3px;
    position: relative;
  }

  .thumb {
    width: 32px;
    height: 32px;
    background-color: #292929;
    border-radius: 50%;
    position: absolute;
    cursor: grab;
    top: 50%;
    transform: translate(-50%, -50%);
  }

</style>