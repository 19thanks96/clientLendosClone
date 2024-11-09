<script lang="ts">
    import Spinner from '$lib/components/common/Spinner.svelte';

    export let text:string
    export let className:string
    export let isLoading:boolean = false

</script>
{#if !isLoading}
    <button on:click class={`mainButton ${className === 'disabled' && 'mainButton__disabled'} ${className === 'info' && 'info__button__container'} ${className === 'claim' && 'mainButton__claim'} ${className === 'claimDisabled' && 'mainButton__claim__disabled'} ${className === 'main' && 'father-anima'} ${className === 'claim' && 'father-anima'}`} >
        <span class={`mainButton__inner ${className === 'disabled' && 'mainButton__inner__disabled'} ${className === 'claimDisabled' && 'mainButton__inner__disabled'} ${className === 'claim' && 'mainButton__claim__inner'} ${className === 'info' && 'info__button__inner'}`}></span>
        <span class={`mainButton__text ${className === 'disabled' && 'mainButton__text__disabled'}`}>{text}</span>
    </button>
{:else }
    <div class="flex items-center justify-center port:ml-[30px]">
        <Spinner/>
    </div>
{/if}

<style>
    .mainButton{
        height: 50px;
        width: 150px;
        border-radius: 15px;
        border: none;
        background-image: linear-gradient(to bottom, rgba(40, 211, 35, 1), rgba(22, 188, 52, 1), rgba(49, 240, 45, 1));
        box-shadow: 0 3px 4px rgba(25, 158, 38, 0.5);
        cursor: pointer;
        position: relative;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .mainButton__claim{
        background: linear-gradient(to bottom, rgba(247, 236, 48, 1), rgba(255, 246, 70, 1), rgba(255, 241, 108, 1));
        box-shadow: 0 3px 4px rgba(223, 142, 38, 0.5);
    }
    .mainButton__disabled{
        background-image: linear-gradient(to bottom, rgba(40, 211, 35, 1), rgba(22, 188, 52, 1), rgba(49, 240, 45, 1));
        box-shadow: 0 5px 5px rgba(223, 142, 38, 0.5),
        5px 0 5px rgba(223, 142, 38, 0.5),
        -5px 0 5px rgba(223, 142, 38, 0.5),
        0 -5px 5px rgba(223, 142, 38, 0.5),
        0 8px 5px rgba(0, 0, 0, 0.25);
        opacity: 50%;
    }
    .mainButton__claim__disabled{
        opacity: 50%;
        background-image: linear-gradient(to bottom, rgba(242, 228, 54, 1), rgba(226, 156, 20, 1), rgba(238, 189, 42, 1));
    }
    .mainButton__inner{
        position: absolute;
        top: 8%;
        height: 25px;
        width: 140px;
        border-radius: 10px;
        background-image: linear-gradient(to bottom,rgba(156, 249, 154, 1),rgba(70, 243, 82, 1), rgba(64, 226, 95, 1));
    }

    .mainButton__claim__inner{
        background: linear-gradient(to bottom, rgba(255, 254, 156, 1), rgba(255, 246, 70, 1), rgba(255, 241, 108, 1))
    }
    .mainButton__inner__disabled{
        background-image: linear-gradient(to bottom, rgba(255, 252, 76, 0.5), rgba(255, 231, 62, 0.5),rgba(255, 190, 54, 0.5));
    }
    .mainButton__text__disabled{
        -webkit-text-stroke: 1px rgba(165, 64, 7, 1);
        text-shadow: 0 3px rgba(165, 64, 7, 1);
    }
    .mainButton__text{
        color: rgba(255, 255, 247, 1);
        font-family: "Fira Sans", sans-serif;
        font-weight: 900;
        font-size: 24px;
        -webkit-text-stroke: 1px rgba(1, 116, 22, 1);
        text-shadow: 0 3px rgba(1, 116, 22, 1);
        z-index: 1;
        letter-spacing: -1px;
    }

    .info__button__container{
        width:240px
    }
    .info__button__inner{
        width:230px
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
            left: -300px;
        }
        to {
            left: calc(200% + 30px);
        }
    }

    @media screen and (max-width: 450px) {
        .mainButton{
            height: 40px;
            width: 120px;
            border-radius: 13px;
        }
        .mainButton__inner{
            width:110px;
            height: 20px;
        }
        .mainButton__text{
            font-size: 20px;
        }
        .info__button__container{
            width: 180px;
        }
        .info__button__inner{
            width: 170px;
        }
    }
</style>