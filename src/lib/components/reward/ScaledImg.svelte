<script lang="ts">
    export let image:string
    export let starsImage: string;

</script>
<div style="transform: translate(-0%, -100%);" class="absolute w-full h-full flex justify-center items-center z-[12] scaled" >
    <div style="transform: translate(-50%, -50%) scale(0); background-image: url({starsImage}); " class="absolute top-1/2 left-1/2 w-[60vw] port:w-[95vw] port:h-[89vw] h-[60vh] opacity-0 bg-contain bg-center bg-no-repeat starsScailing"></div>
    <div style="transform: translate(-50%, -50%) scale(0); background-image: url({image}); " class="absolute z-2 top-1/2 left-1/2 w-[60vw] port:w-[95vw] port:h-[89vw] h-[60vh] opacity-0 bg-contain bg-center bg-no-repeat scailing"></div>

</div>

<style lang="css">
    .starsScailing{
        will-change: transform;
        animation: scaledStarsImg 0.1s forwards;
        animation-delay: 0.8s;
    }
    .scailing{
        will-change: transform;
        animation: scaledImg 0.2s forwards;
        animation-delay: 0.8s;
    }

    @keyframes scaledImg{
        0%{
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
        }
        100%{
            opacity: 1;
            transform: translate(-50%, -49%) scale(0.85);

        }
    }

    @keyframes scaledStarsImg{
        0%{
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
        }
        100%{
            opacity: 1;
            transform: translate(-50%, -51%) scale(1.45);

        }
    }
    @media (orientation: portrait) {
        .starsScailing{
            will-change: transform;
            animation: scaledStarsImg 0.1s forwards;
            animation-delay: 0.8s;
        }
        .scailing{
            will-change: transform;
            animation: scaledImg 0.2s forwards;
            animation-delay: 0.8s;
        }

        @keyframes scaledImg{
            0%{
                opacity: 0;
                transform: translate(-50%, -50%) scale(0);
            }
            100%{
                opacity: 1;
                transform: translate(-50%, -48%) scale(0.66);

            }
        }

        @keyframes scaledStarsImg{
            0%{
                opacity: 0;
                transform: translate(-50%, -50%) scale(0);
            }
            100%{
                opacity: 1;
                transform: translate(-50%, -50%) scale(0.75);

            }
        }
    }
</style>
