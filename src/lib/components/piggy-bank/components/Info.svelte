<script lang="ts">
    import infoTitle from "$lib/components/piggy-bank/images/infoTitle.svelte?raw";
    import Button from "./Button.svelte";
    import CloseButton from "./CloseButton.svelte";
    import {OverlayScrollbarsComponent} from "overlayscrollbars-svelte";
    import {showInfoPopUp} from "$lib/state/infoPopUp.state";


    export let infoText:string


    const closeInfoPopUp = () => {
        $showInfoPopUp.isOpen = false;
    }

</script>

<section class="info">
    <div class="close">
        <CloseButton on:click={closeInfoPopUp} />
    </div>
    <div class="info__background">
        <div class="info__title">
            {@html infoTitle}
            <span class="info__title__text">Info</span>
        </div>

        <div class="scroll-container">
            <OverlayScrollbarsComponent defer>
                <p class="info__text">
                    {infoText}
                </p>
               </OverlayScrollbarsComponent>
        </div>
        <div class="info__button">
            <Button text="Ok" className="info" on:click={closeInfoPopUp}/>
        </div>
    </div>
</section>



<style>
    :global(.os-scrollbar){
    --os-size: 10px;
    --os-padding-perpendicular: 0;
    --os-padding-axis: 0;
    --os-track-border-radius: 5px;
    --os-track-bg:rgba(0, 0, 0, 0.4) ;
    --os-handle-border-radius: 6px;
    --os-handle-bg: #303848;
    --os-handle-max-size: 20px;
    --os-handle-min-size : 20px;

    }
    :global(.os-scrollbar-vertical) {
        margin-right: 13px;
    }
    .info{
        position: absolute;
        width: 305px;
        height: 485px;
        border-image: url("/src/lib/components/piggy-bank/images/borderInfo.svg") 35 / 20px round;
    }
    .close{
        position: absolute;
        right: -15%;
        top: -10%;
    }
    .scroll-container{
        width: calc(100% + 40px);
        height: 250px;
        overflow: hidden;
        padding-right: 50px;
        padding-bottom: 80px;
        box-sizing: border-box;
        position: relative;
        margin-left: 40px;
        margin-top: 110px;
    }
    .info__button{
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 15px;
    }
    .info__text{
        font-family: "Fira Sans", sans-serif;
        font-weight: 600;
        color: rgba(108, 113, 126, 1);
        text-align: center;
        font-size: 16px;
        height:250px;
        position: relative;
        width: 100%;
        box-sizing: border-box;
        margin: 0;
        padding-right: 60px;
    }
    .info__title{
        position: absolute;
        right: -13%;
    }
    .info__title__text{
        position: absolute;
        left: 44%;
        top: 25%;
        color: rgba(255, 255, 247, 1);
        font-family: "Fira Sans", sans-serif;
        font-weight: 900;
        font-size: 36px;
        -webkit-text-stroke: 2.5px rgba(55, 62, 58, 1);
        text-shadow: 0 6px rgba(21, 20, 19, 1);
        letter-spacing: -2px;
    }
    .info__background{
        position: absolute;
        top: 1.5%;
        left: 2.5%;
        width: 290px;
        height: 490px;
        background-image: url("/src/lib/components/piggy-bank/images/backgroundInfo.svg");
        background-repeat: no-repeat;
        background-size: contain;
    }

    @media screen and (max-width: 450px) {
        .info{
            width: 265px;
            height: 410px;
            border-image:url("/src/lib/images/borderInfo.svg") 50 / 25px round;
        }
        .info__background{
            top: 1.3%;
            left: 3.5%;
            width: 300px;
            height: 400px;
        }
        .info__title{
            right: 6.5%;
        }
        .scroll-container{
            width: calc(100% - 10px);
            height: 220px;
            margin-top: 85px;
        }
        .info__title__text{
            font-size: 30px;
            -webkit-text-stroke: 1.5px rgba(55, 62, 58, 1);
            text-shadow: 0 4px rgba(21, 20, 19, 1);
            letter-spacing: -1px;
        }
        .info__button{
            padding-right: 50px;
        }
    }
</style>