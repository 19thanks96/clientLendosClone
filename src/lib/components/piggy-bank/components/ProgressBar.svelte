<script>
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';

    export let currentValue = 0;
    export let maxValue = 5000;

    const percentageFilled = tweened(0, {
        duration: 1500,
        easing: cubicOut
    });
    $: percentageFilled.set((currentValue / maxValue) * 100);
</script>

<div class="main__progress">
    <div class="main__progress__bar" style="height: {$percentageFilled}%;">
        <div class="inner__main__progress__bar"></div>
    </div>
</div>


<style>
    .main__progress{
        position: absolute;
        width: 35px;
        height: 240px;
        top: 24%;
        left: 5%;
        background-color: rgba(4, 16, 62, 0.4);
        border-radius: 9px;
        padding: 1px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
    }
    .main__progress__bar, .inner__main__progress__bar{
        border-radius: 9px;
        transition: 0.4s linear;
        transition-property: height, background-color;
    }
    .main__progress__bar{
        margin: 0 1px;
        width: 32px;
        background-image: linear-gradient(to right, rgba(44, 104, 227, 1), rgba(39, 124, 230, 1), rgba(23, 231, 237, 1));
    }
    .inner__main__progress__bar{
        margin-left: 2px;
        width: 16px;
        height: 95%;
        background-image: linear-gradient(to right, rgba(156, 207, 247, 1),rgba(85, 139, 234, 1), rgba(86, 153, 235, 1));

    }
    .main__progress__bar{
        height: 0;
        background-color: rgba(62, 32, 132, 1);
    }

    @media screen and (max-width: 450px) {
        .main__progress{
            width: 30px;
            left: 13%;
            height: 180px;
            top: 20%;
        }
    }
</style>