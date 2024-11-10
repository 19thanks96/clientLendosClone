<script>
    import close from "$lib/components/piggy-bank/images/close.svelte?raw";
</script>
<button class="close__button" on:click>
    <span class="close__button__inner"></span>
    <span class="close__button__icon">
        {@html close}
    </span>
</button>

<style>
    .close__button{
        border: none;
        height: 35px;
        width: 35px;
        border-radius: 15px;
        background-image: linear-gradient(to bottom, rgba(235, 5, 5, 1), rgba(156, 0, 26, 1), rgba(239, 10, 51, 1));
        box-shadow: 0 3px 4px rgba(99, 11, 18, 0.5),
        4px 0 4px rgba(99, 11, 18, 0.5),
        -4px 0 4px rgba(99, 11, 18, 0.5),
        0 -4px 4px rgba(99, 11, 18, 0.5),
        0 6px 4px rgba(0, 0, 0, 0.25);
        cursor: pointer;
        position: absolute;
        top: 13%;
        right: 22%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .close__button__inner{
        position: absolute;
        height: 17px;
        width: 28px;
        top: 9%;
        right: 10%;
        border-radius: 9px;
        background-image: linear-gradient(to bottom, rgba(255, 110, 110, 1),rgba(187, 65, 65, 1),rgba(197, 22, 22, 1));
    }

    .close__button__icon{
        display: flex;
        position: absolute;
        z-index: 1;
    }

    @media screen and (max-width: 760px) {
        .close__button {
            top: 12%;
            right: 10%;
        }
    }
    @media screen and (max-width: 450px) {
        .close__button {
            top: -10px;
            right: 15%;
            height: 30px;
            width: 30px;
            border-radius: 13px;
        }
        .close__button__inner{
            width: 24px;
        }
    }
</style>