<script lang="ts">
	export let image: string;
	export let isTutorialMission: boolean;
	export let pathToImg = 'https://p2w-object-store.fra1.cdn.digitaloceanspaces.com/p2w/mission-logos/';
</script>

<div style="aspect-ratio: 1/1;" class="w-[18.2%] port:w-[18.5%] relative">
	<button on:click style="aspect-ratio: 1/1;" class="w-[3vh] port:w-[19%]   h-full absolute top-0 z-[4]">
		<div style="background-image: url('{pathToImg}{image}'); aspect-ratio: 1/1; background-position: center center;"
				 class="border-[0.02vw] drop-shadow-[length:0_0.1vw_0_#8E7D5C]  rounded-[0.35vw] port:rounded-[1.5vw] border-[#AD825B] bg-[gray] bg-contain h-full bg-no-repeat flex self-center"></div>
		<div style=" width: 90%; height: 45%; position: absolute; left: 5%; right: 5%; top: 5%; background: linear-gradient(360deg, #6F6F6F 0%, #414141 32.9%, #282828 65.4%, #A7A7A7 100%); mix-blend-mode: screen;
" class="top-glass-p2w"></div>
		<div
			class="absolute z-[6] land:left-[77.5%]  top-[-0.25vw] port:right-[-3%] port:top-[-3%]  vhHeight-[16] port:w-[3.148vw] port:h-[3.148vw] port:text-[2.87vw] port:leading-[1.1] vhWidth-[16] ">
			<svg style="width: 100%; height: 100%" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect width="34" height="34" rx="12" fill="url(#paint0_linear_952_3592)" />
				<g filter="url(#filter0_d_952_3592)">
					<mask id="path-2-outside-1_952_3592" maskUnits="userSpaceOnUse" x="12" y="4" width="9" height="25"
								fill="black">
						<rect fill="white" x="12" y="4" width="9" height="25" />
						<path
							d="M19.24 13.116V27H14.092V13.116H19.24ZM16.666 5.446C17.498 5.446 18.1827 5.71467 18.72 6.252C19.2747 6.772 19.552 7.422 19.552 8.202C19.552 8.982 19.2747 9.64067 18.72 10.178C18.1827 10.698 17.498 10.958 16.666 10.958C15.834 10.958 15.1407 10.698 14.586 10.178C14.0487 9.64067 13.78 8.982 13.78 8.202C13.78 7.422 14.0487 6.772 14.586 6.252C15.1407 5.71467 15.834 5.446 16.666 5.446Z" />
					</mask>
					<path
						d="M19.24 13.116V27H14.092V13.116H19.24ZM16.666 5.446C17.498 5.446 18.1827 5.71467 18.72 6.252C19.2747 6.772 19.552 7.422 19.552 8.202C19.552 8.982 19.2747 9.64067 18.72 10.178C18.1827 10.698 17.498 10.958 16.666 10.958C15.834 10.958 15.1407 10.698 14.586 10.178C14.0487 9.64067 13.78 8.982 13.78 8.202C13.78 7.422 14.0487 6.772 14.586 6.252C15.1407 5.71467 15.834 5.446 16.666 5.446Z"
						fill="#FFFFF7" />
					<path
						d="M19.24 13.116H20.54V11.816H19.24V13.116ZM19.24 27V28.3H20.54V27H19.24ZM14.092 27H12.792V28.3H14.092V27ZM14.092 13.116V11.816H12.792V13.116H14.092ZM18.72 6.252L17.8008 7.17124L17.8156 7.18606L17.8309 7.2004L18.72 6.252ZM18.72 10.178L19.624 11.1122L19.6245 11.1117L18.72 10.178ZM14.586 10.178L13.6668 11.0972L13.6816 11.1121L13.6969 11.1264L14.586 10.178ZM14.586 6.252L15.49 7.18618L15.4905 7.18571L14.586 6.252ZM17.94 13.116V27H20.54V13.116H17.94ZM19.24 25.7H14.092V28.3H19.24V25.7ZM15.392 27V13.116H12.792V27H15.392ZM14.092 14.416H19.24V11.816H14.092V14.416ZM16.666 6.746C17.1892 6.746 17.5315 6.90202 17.8008 7.17124L19.6392 5.33276C18.8338 4.52731 17.8068 4.146 16.666 4.146V6.746ZM17.8309 7.2004C18.1158 7.46752 18.252 7.7708 18.252 8.202H20.852C20.852 7.0732 20.4335 6.07648 19.6091 5.3036L17.8309 7.2004ZM18.252 8.202C18.252 8.63405 18.1145 8.95459 17.8155 9.24429L19.6245 11.1117C20.4348 10.3267 20.852 9.32995 20.852 8.202H18.252ZM17.816 9.24382C17.5493 9.50187 17.202 9.658 16.666 9.658V12.258C17.794 12.258 18.816 11.8941 19.624 11.1122L17.816 9.24382ZM16.666 9.658C16.1303 9.658 15.7652 9.50152 15.4751 9.2296L13.6969 11.1264C14.5162 11.8945 15.5377 12.258 16.666 12.258V9.658ZM15.5052 9.25876C15.2188 8.97235 15.08 8.64743 15.08 8.202H12.48C12.48 9.31657 12.8785 10.309 13.6668 11.0972L15.5052 9.25876ZM15.08 8.202C15.08 7.75715 15.2178 7.44968 15.49 7.18618L13.682 5.31782C12.8796 6.09431 12.48 7.08685 12.48 8.202H15.08ZM15.4905 7.18571C15.7828 6.90256 16.1429 6.746 16.666 6.746V4.146C15.5251 4.146 14.4985 4.52677 13.6815 5.31829L15.4905 7.18571Z"
						fill="#3E3A37" mask="url(#path-2-outside-1_952_3592)" />
				</g>
				<defs>
					<filter id="filter0_d_952_3592" x="13.7798" y="5.44629" width="5.77197" height="23.2719"
									filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
						<feFlood flood-opacity="0" result="BackgroundImageFix" />
						<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
													 result="hardAlpha" />
						<feOffset dy="1.71818" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix type="matrix" values="0 0 0 0 0.0816664 0 0 0 0 0.0788617 0 0 0 0 0.076222 0 0 0 1 0" />
						<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_952_3592" />
						<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_952_3592" result="shape" />
					</filter>
					<linearGradient id="paint0_linear_952_3592" x1="17" y1="0" x2="17" y2="34" gradientUnits="userSpaceOnUse">
						<stop stop-color="#030D15" stop-opacity="0.96" />
						<stop offset="1" stop-color="#476BA1" stop-opacity="0.7" />
					</linearGradient>
				</defs>
			</svg>
		</div>
		<div style=" width: 90%; height: 37.5%; position: absolute; left: 5%; right: 5%; bottom: 5%; background: linear-gradient(360deg, #717171 0%, #000000 100%); mix-blend-mode: screen;" class="bottom-glass-p2w"></div>
			{#if isTutorialMission}
				<img class="z-[7] absolute top-[-10%] left-[-5%] w-[44%] aspect-[1/1]  pointer-events-none" src="https://p2w.imgix.net/resources/client/tutorial/Badge.png?auto=compress&auto=format" alt="Tutorial Badge" />
			{/if}

	</button>
</div>

<style lang="scss">
	.top-glass-p2w{
    border-radius: 0.25vw 0.25vw 0.4vw 0.4vw;
	}
	.bottom-glass-p2w{
    border-radius: 0.25vw;
	}
	@media (orientation: portrait) {
    .top-glass-p2w{
      border-radius: 1vw 1vw 1.5vw 1.5vw;
    }
    .bottom-glass-p2w{
      border-radius: 1vw;
    }
	}
</style>