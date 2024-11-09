<script lang="ts">
    import {writable} from "svelte/store";
    import {onDestroy} from "svelte";

    export let endDate:Date

    interface TimeLeft {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    }

    let expire = new Date(endDate);

    const calculateTimeLeft = () => {
        const difference = +expire - (+new Date());

        let timeLeft:TimeLeft = {
            days:0,
            hours:0,
            minutes:0,
            seconds:0
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const timeLeft = writable(calculateTimeLeft());

    const timer = setInterval(() => {
        timeLeft.set(calculateTimeLeft());
    }, 1000);

    onDestroy(() => {
        clearInterval(timer);
    });
</script>


<div class="container__timer">
    <span class="container__timer__text">Ends in:</span>
    <span class="container__timer__time">{$timeLeft.days}d {$timeLeft.hours}h {$timeLeft.minutes}m {$timeLeft.seconds}s</span>
</div>


<style>
    .container__timer{
        width: 200px;
        height: 50px;
        background-image: url("/src/lib/components/piggy-bank/images/containertimer.svg");
        background-size: 200px 50px;
        background-repeat: no-repeat;
        position: absolute;
        bottom:-4%;
        left: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
    }
    .container__timer__text{
        color: rgba(204, 181, 165, 1);
        font-family: "Fira Sans", sans-serif;
        font-weight: 500;
        font-size: 13px;
    }
    .container__timer__time{
        color:rgba(246, 234, 192, 1);
        font-family: "Fira Sans", sans-serif;
        font-weight: 900;
        font-size: 13px;
    }

    @media screen and (max-width: 450px) {
        .container__timer{
            bottom:6%
        }
    }

</style>