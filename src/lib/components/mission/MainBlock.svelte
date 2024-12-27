<script lang="ts">
    import {t} from '$lib/i18n/config';
    import {base} from '$app/paths';
</script>


<div style={`border-image-source: url(${base}/newImg/Cmt_Dm_Bg_PopUp.png);`}
     class="relative w-[20.65%] h-[65%] mt-[9%]  port:w-[77.05%] port:h-[66.75%]  port:mt-[29%] main-block ">
    <div class="absolute w-[108%] h-[26%]  port:h-[42%] top-[-16%] port:top-[-20%]  left-[50%] sofa" style="">
        <slot name="header"/>
    </div>
    <div class="relative w-full h-[-webkit-fill-available] flex justify-center pb-[7%] port:pb-[7%] port:px-[2%]">
        <div
          id="scrollBlockDm"
          class=" overflow-y-scroll overflow-hidden touch-pan-y rounded-[0.822vw] port:rounded-[3.056vw] land:w-[106%] port:bg-[#c5b49b] land:pl-[3%] land:mr-[-1.06vw]    port:w-[97.75%] land:h-[100%]   scrolled  scrollable land:pr-[1.19vw]"
          style="" >
            <div
                    class="rounded-[0.822vw]   port:rounded-[3.056vw] bg-[#c5b49b] h-[-webkit-fill-available] ">
                <div
                        class="h-auto   bg-[#c5b49b]  p-[0.15vw] rounded-[0.822vw] port:rounded-[3.056vw] port:p-[0.65vw]">
                    <slot name="mission"/>
                </div>
            </div>
        </div>
        <div style="background-image: url({base + '/newImg/corner.png'})" class="absolute port:hidden bottom-[1.1vw] right-[1%] scale-[0.7] w-[1.667vw] h-[1.667vw] bg-contain"></div>
        <div style="background-image: url({base + '/newImg/corner.png'}); transform: rotate3d(0,1, 0, 3.142rad) scale(0.7)" class="absolute port:hidden bottom-[1.1vw] left-[1%]   w-[1.667vw] h-[1.667vw] bg-contain"></div>
    </div>
    <slot name="title"/>
    <div id="dmTimer"
         class="absolute  left-0 bottom-[-2%] text-[0.7rem]    text-[#CCB5A5]  flex justify-center items-center w-[100%] vhHeight-[31] port:h-[6.111vw]">

        <img src='https://p2w.imgix.net/resources/client/dm/Dm_Timer_Left.png?auto=compress&auto=format'
             class="h-full" alt="btn" draggable="false"/>
        <div
          style="background-image: url('https://p2w.imgix.net/resources/client/dm/Dm_Timer_Center.png?auto=compress&auto=format');"
          class="bg-contain h-full flex items-center bg-repeat-x vhFont-[14] port:text-[3.056vw]">
            <div class=" px-[0.1vw] port:px-[1vw]">
                {$t('kit.timer')}
                <slot name="timer"/>
            </div>
        </div>
        <img src='https://p2w.imgix.net/resources/client/dm/Dm_Timer_Right.png?auto=compress&auto=format'
             class="h-full "  draggable="false"/>

    </div>
</div>


<style lang="scss">
    .scrollable {
        overscroll-behavior: none;
    }

    .scrollable::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 0.313vw rgba(0, 0, 0, 0.7);
        border-radius: 0.521vw;
        border-color: rgba(0, 0, 0, 0.7);
        background-color: rgba(0, 0, 0, 0.2);
        margin: 4vw 0 0vw 0;

    }

    .scrollable::-webkit-scrollbar {
        border-radius: 10px;
        width: 0.521vw;
        height: 0.521vw;
        background-color: none;


    }

    .scrollable::-webkit-scrollbar-thumb {
        border-radius: 0.2vw;
        -webkit-box-shadow: inset 0px 0px 0.521vw 0.251vw rgba(0, 0, 0, .3);
        height: 0.521vw;
        width: 110%;


        background: #FCAE39;
        box-shadow: 0px 1.90625px 0px #AA6601, 0px 3.8125px 3.8125px rgba(0, 5, 23, 0.5), inset 1.90625px 1.90625px 1.90625px rgba(255, 238, 82, 0.5), inset -1.90625px -1.90625px 1.90625px rgba(255, 216, 116, 0.3);

    }

    .main-block {
        border-image-slice: 75 fill;
        border-image-width: 1.75vw;
        border-image-outset: 0px;
        border-image-repeat: stretch;
    }

    .sofa {
        //transform: translate(-50%, -60%);
        transform: translateX(-50%);

    }

    @media (orientation: portrait) {

        .scrollable {
            box-shadow: 0px 0.442vw 0.442vw 0px rgba(159, 138, 108, 0.70) inset, 0px 0.262vw 0px 0px #FAEFD0;
        }
        .sofa {
            width: 100%;
            //transform: translate(-50%, -53%);
        }

        .main-block {
            border-image-width: 7vw;
        }

        .scrollable::-webkit-scrollbar {
            width: 1.574vw;
            display: none;
            scrollbar-width: none;
        }
    }

</style>
