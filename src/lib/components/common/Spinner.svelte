<div class="w-full h-full flex justify-center self-center items-center lds-ellipsis">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>

<style>
    .lds-ellipsis {
        color:#ffec14;
        position: relative;
        top: 50%;
        left: 0;
        transform: translate(0%, -50%);
    }
    .lds-ellipsis,
    .lds-ellipsis div {
        box-sizing: border-box;
    }
    .lds-ellipsis {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 100%
    }
    .lds-ellipsis div {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 13.33333px;
        height: 13.33333px;
        border-radius: 50%;
        background: currentColor;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }
    .lds-ellipsis div:nth-child(1) {
        left: 8px;
        animation: lds-ellipsis1 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(2) {
        left: 8px;
        animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(3) {
        left: 32px;
        animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(4) {
        left: 56px;
        animation: lds-ellipsis3 0.6s infinite;
    }
    @keyframes lds-ellipsis1 {
        0% {
            transform: translateY(-50%) scale(0);
        }
        100% {
            transform: translateY(-50%) scale(1);
        }
    }
    @keyframes lds-ellipsis3 {
        0% {
            transform:translateY(-50%) scale(1);
        }
        100% {
            transform: translateY(-50%) scale(0);
        }
    }
    @keyframes lds-ellipsis2 {
        0% {
            transform: translateY(-50%) translate(0, 0);
        }
        100% {
            transform: translateY(-50%) translate(24px, 0);
        }
    }

</style>
