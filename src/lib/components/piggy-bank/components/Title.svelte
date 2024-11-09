<script lang="ts">
import infoBtn from "$lib/components/piggy-bank/images/infoBtn.svelte?raw";
import title from "$lib/components/piggy-bank/images/title.svelte?raw";
import {AdapterCommunicationService} from "$lib/adapter-listener";
import {showInfoPopUp} from "$lib/state/infoPopUp.state";

const openInfoPopUp = () => {
    $showInfoPopUp.isOpen = true;
    AdapterCommunicationService.sendMessage({ type: 'openPopup', message: 'click' });
}

export let name:string
</script>
<div class="title">
    <div class="text__wrapper">
        <div>
                <span  class="title__text">
                    {name}
                    <span class="inner__title__text">{name}</span>
                 </span>
                <button class="info__button" on:click={openInfoPopUp}>
                    {@html infoBtn}
                </button>
        </div>
    </div>
    {@html title}
</div>


<style>
    .title{
        margin-top: -65px;
        height: 40px;
        z-index: 2;
        position: relative;
    }
    .text__wrapper{
        position: absolute;

        top: 10%;
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
    .info__button{
        background: none;
        border: none;
        cursor: pointer;
        position: absolute;
        margin-left: 5px;
        margin-top: 15px;
    }
    .title__text{
        font-size:40px;
        font-family: "Fira Sans", sans-serif;
        font-weight: 900;
        background: -webkit-linear-gradient(90deg, rgba(255, 255, 113, 1),rgba(252, 224, 0, 1) 50% ,rgba(255, 255, 113, 1) 50%);
        -webkit-background-clip: text;
        color: transparent;
        position: relative;
        z-index: 1;
        letter-spacing: -2px;
        padding-right: 5px;
        word-spacing: 3px;
    }
    .inner__title__text {
        font-size: 40px;
        font-family: "Fira Sans", sans-serif;
        font-weight: 900;
        position: absolute;
        letter-spacing: -2px;
        padding-right: 5px;
        word-spacing: 3px;
        transform: translate(0%, -4%);

        top: -5%;
        left: 0;
        -webkit-text-stroke: 5px rgba(16, 50, 166, 1);
        pointer-events: none;
        white-space: pre;
        color: rgba(17, 41, 155, 1);
        text-shadow: 0 5px 1px rgba(17, 41, 155, 1),
        0 7px 5px rgba(17, 41, 155, 1);
        z-index: -1;
    }
    @media screen and (max-width: 450px) {
        .title{
            margin-top: -90px;
        }
        .text__wrapper{
            top: 50%;
        }
        .title__text{
            font-size: 28px;
        }
        .inner__title__text{
            font-size: 28px;
            text-shadow: 0 5px 1px rgba(17, 41, 155, 1),
            0 2px 0 rgba(17, 41, 155, 1);
        }
        .info__button{
            margin-top: 10px;
        }
    }


</style>