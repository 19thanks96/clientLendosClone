<script lang="ts">
    export let coinsIcon:string
    export let amount:number
    export let multiplier:number

    const isInteger = (num:number) => num % 1 === 0;

</script>
<div class="wrapper">
    <div class="container__coins">
        {@html coinsIcon}
        <span class={isInteger(multiplier) ? "coins__multiplier": "coins__multiplier coins__second__multiplier"}>x{multiplier}</span>
    </div>
    <div>
        <span class="container__amount" data-text={amount}>{amount}</span>
    </div>
</div>


<style>
    .wrapper{
        display: flex;
        align-items: center;
        width: 300px;
        margin-left: 45px;
    }

    .container__coins {
        background-image: url("/src/lib/components/piggy-bank/images/containerforcoins.svg");
        height: 90px;
        width: 90px;
        background-size: cover;
        background-repeat: no-repeat;
        position: relative;
        display: flex;
        align-items:flex-start;
        justify-content: center;
        margin-top: 10px;
        margin-right: 15px;
    }
    .coins__multiplier {
        position: absolute;
        left: 35%;
        bottom: 15%;
        color: rgba(255, 255, 247, 1);
        font-family: "Fira Sans", sans-serif;
        font-weight: 900;
        font-size: 26px;
        -webkit-text-stroke: 1px rgba(62, 58, 55, 1);
        text-shadow: 0 2.5px rgba(21, 20, 19, 1);
    }
    .coins__second__multiplier{
        position: absolute;
        left: 20%;
        bottom: 15%;
    }
    .container__amount {
        font-size: 54px;
        font-family: "Fira Sans", sans-serif;
        font-weight: 900;
        background: -webkit-linear-gradient(90deg, rgba(255, 255, 113, 1), rgba(252, 224, 0, 1) 50%, rgba(255, 255, 113, 1) 50%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        position: relative;
        z-index: 1;
        letter-spacing: -2px;
        padding-right: 5px;
    }
    .container__amount::before {
        content: attr(data-text);
        position: absolute;
        top:-5%;
        left: 0;
        -webkit-text-stroke: 3px rgba(155, 90, 5, 1);
        color: transparent;
        pointer-events: none;
        white-space: nowrap;
        text-shadow: 0 2px 1px rgba(155, 90, 5, 1),
        0 4px 5px rgba(17, 41, 155, 1);
        z-index: -1;
    }

    @media screen and (max-width: 450px) {
        .wrapper{
            width: 220px;
            padding-left: 20px;
            padding-top: 10px;
            margin-left: 0;
        }
        .container__coins{
            width: 65px;
            height: 65px;
            background-size: 65px 65px;
        }
        .coins__multiplier{
            font-size: 20px;
        }
        .container__amount{
            font-size: 42px;
        }
        .container__amount::before {
            text-shadow: 0 1px 0 rgba(155, 90, 5, 1),
            0 1px 1px rgba(17, 41, 155, 1);
        }
    }
</style>