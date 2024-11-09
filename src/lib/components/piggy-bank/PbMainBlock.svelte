<script lang="ts">
    import PbControls from '$lib/components/piggy-bank/menu/MainControls.svelte';

    export let pb;
    const mini_coin: string = `https://p2w.imgix.net/resources/client/common/Icn_Coin.png?auto=compress&auto=format`;
    const bg_text_hint: string = `https://p2w.imgix.net/resources/client/pb/Cmt_Hint_Flag_Cmn.png?auto=compress&auto=format`;

</script>


<div class="w-full h-[100%] port:w-full port:h-full ">
    <h2
            class="relative  header font-['Fira_Sans'] font-black	 mt-[1vh] port:mt-[6.5vh] vhBigFont-[115]  leading-[1.2] port:text-[5.99vh]   text-center port:mb-[9vh]  mb-[1vh]"
    >
        {pb?.name?.toUpperCase()}
    </h2>
    <div class="flex-col items-center">
        <div class="flex justify-center land:pb-[3vh] land:pt-[1vh]">
            <div class=" font-['Fira_Sans'] port:translate-y-[-35%] font-black relative z-[4] bg_hint">
                <div class=" flex justify-center items-center my-[0.25vh] port:my-[2%] mx-[2.75vh] port:mx-[4vw]">
                    <img src="{mini_coin}" class="vhBigHeight-[49] port:h-[6.4vw] " alt="mini_coin">&nbsp;
                    <p class="text-center flex justify-center items-center  vhBigFont-[40] port:text-[5.185vw] leading-[3.98vh] port:leading-[1.2] color_text ">
						<span>
						{pb?.balance}
						</span>
                        <span>
						 /
						</span>
                        <span>
						 {pb?.balanceMax}
						</span>
                    </p>
                </div>
                <div class="absolute w-full flex mt-[-0.5%] justify-center ">
                    <img src="{bg_text_hint}"
                         class="vhBigWidth-[40] vhBigHeight-[20] port:w-[2.917vh] port:h-[1.458vh]" alt="hint">
                </div>
            </div>
        </div>
        <div class="w-full ">
            <div class="mt-[-1.5%] port:mt-[-2.5%] relative w-full  ">
                <div
                        class="relative flex justify-center mb-[-2%] port:mb-[-4%] vhBigWidth-[640] vhBigHeight-[472]  mx-auto port:w-[84.259vw] port:h-[62.648vw] ">
                    <div
                            style="background-image: url('https://p2w.imgix.net/resources/client/pb/Pillow.png?auto=compress&auto=format')"
                            class=" vhBigWidth-[639] vhBigHeight-[242] port:w-[84.074vw] translate-x-[1%] bg-cover bg-no-repeat port:h-[31.944vw]  bottom-0   absolute h-full"
                    />
                    <img src="https://p2w.imgix.net/resources/client/pb/Pig.png?auto=compress&auto=format"
                         style="aspect-ratio: 12/9;"
                         class=" vhBigWidth-[348] vhBigHeight-[343] port:w-[45.833vw] port:h-[45.185vw] revative  z-[1]"
                         alt="piggy"/>
                </div>
            </div>
            <div class=" relative px-5 top-[-3.5vh] md:p-[0] bottom-[0] ">
                <PbControls {pb}></PbControls>
            </div>
        </div>
    </div>
</div>

<style>
    .header {
        background: linear-gradient(to top, #FFF859, #FFCD03, #FFF618, #FFF8D6);
        color: transparent;
        -webkit-background-clip: text;
        -webkit-text-stroke-color: #B84201;
        -webkit-text-stroke-width: 0.7px;
        filter: drop-shadow(2px 5px #B84201);
    }

    .bg_hint {
        background: #E7F0F4;
        border: 0.4vh solid #000000;
        box-shadow: 0px 1px 0px #000000;
        border-radius: 4vh;

    }


    .color_text {
        color: rgba(62, 81, 149, 1);
        font-family: Fira Sans;
        font-weight: 900;
        letter-spacing: 0em;
    }

    @media (orientation: portrait) {
        .header {
            background: linear-gradient(to top, #FFF859, #FFCD03, #FFF618, #FFF8D6);
            color: transparent;
            -webkit-background-clip: text;
            filter: drop-shadow(0vw 1vw #B84201);
            line-height: 0.75;
        }
    }
</style>
