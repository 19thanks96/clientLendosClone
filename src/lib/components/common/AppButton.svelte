<script lang="ts">
    import Spinner from '$lib/components/common/Spinner.svelte';

    export let isActive = true;
    export let showBorderWhenInactive = false;
    export let color: string;
    export let caption: string;
		export let index: number;
    export let isLoading = false;
		export let requiresAttentionSeeker :boolean | undefined;
    export let bigButton = false;
		const animationDelay =  1 + ((index+1) /2 ) + 's' ;
    let images: Record<string, Record<string, string>> = {
        yellow: {
            center: `https://p2w.imgix.net/resources/client/common/Btn_Cmn_M_Yellow_Up.png?auto=compress&auto=format`,
            mainbg: ``,
            secondBg: `background: linear-gradient(180deg, #FFFC4C 0%, #FFE73E 54%, #FFBE36 100%);`,
            stroke: '#A54007'
        },
        green: {
            center: `https://p2w.imgix.net/resources/client/common/Btn_Cmn_M_Green_Up.png?auto=compress&auto=format`,
            mainbg: ``,
            secondBg: ` background: linear-gradient(180deg, #9CF99A 0%, #46F352 54%, #40E25F 100%);`,
            stroke: '#017416'
        }
    };
</script>
{#if !isLoading}

	{#if isActive}
		<div class="w-full h-full ">
			<button on:click
							style=" {images[color].mainbg} -webkit-text-stroke-width: thin; -webkit-text-stroke-color: {images[color].stroke}; text-shadow: 0px 0.1em {images[color].stroke}; {requiresAttentionSeeker ? ` --scaling-delay: ${animationDelay}` : ''}"
							class="w-full {requiresAttentionSeeker  ? 'requiresAttentionSeeker ' : ''} {bigButton ? 'big-button-border' : 'button-border'}  overflow-hidden relative h-[100%] font-['Fira_Sans'] font-black  text-slate-200 bg-[length:100%_100%] flex justify-center items-center father-anima {color + '-button'} {!isLoading ? 'animate-updated-button' : ''}">

				<div
					style="position: absolute; height: 50%; left: 2%;  top: 8.5%; width: 96%; border-radius: 16px; {images[color].secondBg}"
					class="w-full h-full    ">
				</div>
				<div class="absolute w-full h-full flex justify-center items-center ">
					{caption}
				</div>
			</button>
		</div>
	{:else}
		{#if showBorderWhenInactive}
			<div
				style=" -webkit-text-stroke-width: thin; -webkit-text-stroke-color: {images[color].stroke}; text-shadow: 0px 0.1em {images[color].stroke}; {images[color].mainbg}"
				class="opacity-40  {bigButton ? 'big-button-border' : ' button-border'} relative w-full h-full font-['Fira_Sans'] overflow-hidden font-black text-slate-200 bg-[length:100%_100%] father-anima flex justify-center items-center">
				<div class="w-full h-full flex relative overflow-hidden  {color + '-button'}  ">
					<div class="button-hidden-image bg-contain bg-repeat-x flex-1  flex items-center  justify-center "
							 style="position: absolute; height: 50%; left: 2%;  top: 8.5%; width: 96%; border-radius: 16px; {images[color].secondBg} ">
					</div>
				</div>
				<div class=" z-[2] absolute">{caption}</div>
			</div>
		{:else}
			<div
				class="font-['Fira_Sans'] font-black text-[#CBC6B0] port:text-[3.7vw] vhFont-[17] flex justify-center items-center cursor-not-allowed">
				{caption}
			</div>
		{/if}
	{/if}
{:else}
    <Spinner></Spinner>
{/if}

<style lang="scss">
  .green-button {
    background: linear-gradient(180deg, #28D323 1%, #16BC34 52.5%, #31F02D 100%);
    box-shadow: 0 0.2vw 0.2vw rgba(0, 0, 0, 0.25), inset 0 -0.2vw 0.2vw rgba(25, 158, 38, 0.5), inset -0.2vw 0px 0.2vw rgba(25, 158, 38, 0.5), inset 0.2vw 0px 0.2vw rgba(25, 158, 38, 0.5), inset 0px 0.2vw 0.2vw rgba(25, 158, 38, 0.5);
  }

  .yellow-button {
    background: linear-gradient(180deg, #F2E436 1%, #E29C14 52.5%, #EEBD2A 100%);
    box-shadow: 0 0.2vw 0.2vw rgba(0, 0, 0, 0.25), inset 0  -0.2vw 0.2vw #DF8E26, inset -0.2vw 0px 0.2vw rgba(223, 142, 38, 0.5), inset 0.2vw 0px 0.2vw rgba(223, 142, 38, 0.5), inset 0px 0.2vw 0.2vw rgba(223, 142, 38, 0.5);
  }

  .button-border {
    border-radius: 1vh;
  }

  .big-button-border {
    border-radius: 2.5vh;
  }


  @media (orientation: portrait) {
    .green-button {
      background: linear-gradient(180deg, #28D323 1%, #16BC34 52.5%, #31F02D 100%);
      box-shadow: 0px 0.469vw 0.313vw rgba(0, 0, 0, 0.25), inset 0px -0.313vw 0.313vw rgba(25, 158, 38, 0.5), inset -0.313vw 0px 0.313vw rgba(25, 158, 38, 0.5), inset 0.313vw 0px 0.313vw rgba(25, 158, 38, 0.5), inset 0px 0.313vw 0.313vw rgba(25, 158, 38, 0.5);
    }

    .yellow-button {
      background: linear-gradient(180deg, #F2E436 1%, #E29C14 52.5%, #EEBD2A 100%);
      box-shadow: 0px 0.469vw 0.313vw rgba(0, 0, 0, 0.25), inset 0px -0.313vw 0.313vw #DF8E26, inset -0.313vw 0px 0.313vw rgba(223, 142, 38, 0.5), inset 0.313vw 0px 0.313vw rgba(223, 142, 38, 0.5), inset 0px 0.313vw 0.313vw rgba(223, 142, 38, 0.5);
    }

    .button-border {
      border-radius: 1.25vh;
    }
    .big-button-border {
      border-radius: 2vh;
    }
  }


  .father-anima:not(:active) {
    animation: shrink 0.5s ease forwards;
  }

  .father-anima:active {
    animation: decrease 0.5s ease forwards;
  }

  .father-anima:hover {
    animation: decrease 0.5s ease forwards;
  }

  .father-anima:not(:hover) {
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


  @keyframes slideIn {
    from {
      transform: translate(-200px, 0px) rotate(35deg);
    }
    to {
      transform: translate(calc(500px), 0px) rotate(35deg);
    }
  }

  .yellow-button.animate-updated-button:before {
    background: linear-gradient(to right, #fdfcf200, #fdfcf2);
    content: "";
    height: 15vw;
    will-change: transform;
    position: absolute;
    transform: translate(-300px, -200px);
    width: 6vw;
    animation: slideIn 2s  both;
    animation-delay: 0.75s;
    z-index: 4;
  }

  .requiresAttentionSeeker.animate-updated-button:before {
    background: linear-gradient(to right, #fdfcf200, #fdfcf2);
    content: "";
    position: absolute;
    width: 6vw;
    will-change: transform;
    height: 15vw;
    animation: slideIn 3s infinite;
		transform: translate(1200px, 1220px) rotate(35deg);
		animation-delay:  0.5s;
    z-index: 4;
	}


  .requiresAttentionSeeker:not(:hover){
    animation: scalingBig  3s cubic-bezier(0.22, 0.61, 0.36, 1) infinite;
    animation-delay:  var(--scaling-delay);

  }


  @keyframes scalingBig {
    0%, 10%, 20%, 25% {

      transform: scale(1, 1);
    }
    5%, 15% {

      transform: scale(1.1, 1.1);
    }
    100% {

      transform: scale(1, 1) ;
    }
  }


</style>
