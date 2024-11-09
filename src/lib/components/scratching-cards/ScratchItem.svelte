<script lang='ts'>
    import {base} from "$app/paths";
    import {scratchState} from "$lib/state/scratch.state";
    import {browser} from "$app/environment";
    import {onMount} from "svelte";

    export let color: string;
    export let text: string;

    let idleScratch = {
        gold: {
            forward: 'https://p2w.imgix.net/resources/client/sc/Img_Line_Gold_Idle.png?auto=compress&auto=format',
            background: 'https://p2w.imgix.net/resources/client/sc/Img_Line_Gold_Idle_Scratch.png?auto=compress&auto=format'
        },
        silver: {
            forward: 'https://p2w.imgix.net/resources/client/sc/Img_Line_Silver_Idle.png?auto=compress&auto=format',
            background: 'https://p2w.imgix.net/resources/client/sc/Img_Line_Silver_Idle_Scratch.png?auto=compress&auto=format'
        },
        empty: {
            forward: 'https://p2w.imgix.net/resources/client/sc/Img_Line_Empty.png?auto=compress&auto=format',
            background: 'https://p2w.imgix.net/resources/client/sc/Img_Line_Empty.png?auto=compress&auto=format'
        }
    }

    let scratchLib;


    onMount(async () => {
        if (browser) scratchLib = await import('scratchcard-js');
        const scContainer = document.getElementById('js--sc--container')
        const sc = new ScratchCard('#js--sc--container', {
            scratchType: SCRATCH_TYPE.BRUSH,
            containerWidth: scContainer.offsetWidth,
            brushSrc: `https://p2w.imgix.net/resources/client/sc/Icn_Coin_Сlover_curs_resized.png?auto=compress&auto=format`,
            imageForwardSrc: `${idleScratch[color].forward}`,
            htmlBackground: `
        <div style="background-image: url('${idleScratch[color].background}')" class="z-[1] bg-[length:100%_100%] bg-no-repeat w-full h-full absolute left-0 top-0 flex justify-center items-center"><div class="absolute items-center vhHeight-[24] leading-[1.2] vhFont-[34] items-center font-semibold flex">${text}</div></div>`,
            clearZoneRadius: 0,
            nPoints: 50,
            pointSize: 1,
            callback: function () {
                $scratchState.isScratch = true
            }
        })


        // Init
        sc.init().then(() => {
            sc.canvas.style.position = 'absolute'
            sc.canvas.style.height = '100%'
            sc.canvas.style.width = '100%'
            sc.canvas.style.zIndex = '2'


            sc.canvas.addEventListener('scratch.move', () => {
                let percent = sc.getPercent().toFixed(0);
                if (percent < 50) {
                    isScratched = true
                }
                // console.log(percent)
            })
        }).catch((error) => {
            // image not loaded
            alert(error.message);
        });
    })
</script>

<div class="cursor-wrapper w-[100%] vwHeight-[100] port:h-[5.6vh] flex justify-center items-center my-[1vh] ">
    <div class="sc__wrapper w-[75%] h-[70%]  bg-contain bg-no-repeat flex items-center justify-center bg-center  relative  ">
        <!-- scratchcard -->
        {#if !$scratchState.isSratchBtnClck}
            <div id="js--sc--container"
                 class="w-full h-full bg-contain bg-no-repeat flex items-center justify-center bg-center relative  ">
                <!-- background image insert here by scratchcard-js -->
                <!-- canvas generate here -->
            </div>
        {/if}
        <div style="{$scratchState.isSratchBtnClck ? '' : 'opacity:0'}"
             class="absolute top-0 left-0 w-full h-full flex justify-center items-center ">
            <div class="absolute z-[1] vhHeight-[24] leading-[1.2] vhFont-[34] self-center flex items-center font-semibold">{text}</div>
            <div style="background-image: url('{idleScratch[color].forward}')"
                 class="z-[1] bg-[length:100%_100%] bg-no-repeat w-full h-full {$scratchState.isSratchBtnClck  ? 'faded' : ' '} absolute "></div>
            <div style="background-image: url('{idleScratch[color].background}')"
                 class="z-[0] bg-[length:100%_100%] bg-no-repeat w-full h-full absolute"></div>
        </div>

    </div>
</div>


<style lang='scss'>

  .faded {
    animation: 1.3s faded ease-out forwards;
  }

  @keyframes faded {
    0% {
      visibility: visible;
      opacity: 1;
      transition: opacity 2s linear;
    }
    100% {
      visibility: hidden;
      opacity: 0;
      transition: visibility 0s 2s, opacity 2s linear;
    }
  }

  .cursor-wrapper {
    cursor: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAACACAMAAAHPIW7SAAADAFBMVEWYWBK5bxS/dxi9eBfPiB7Ohx3Ffxq9aRTAehfBexrVjxrDfBPclSfjnC7dkiS4cBa4cBW6cRa+dRfCeRjFfBnEfRG/egK+dwLGfQLIfwLOgAHKhgXMghrMhR/akyH1xjbRhADShgHXiADSjQTZjwLYkwTUlQnRixLamQbanArdmg/ckRbljRjkihjbiRzQhR3YiyPXjCXbjybfkiThkybilCXglCjjkhzmkhjdnRngoSL85y7+9zb++Tv+/kj+/j7nkxfnlhfpmRXnmhfnnRPqnRXomyDllyPrnyDrniLsoxnoniPsoBHspBHjoxDjmSLmoQTkpgzhqBDjpxDmqw/mqxDgqBHnqBDuqhHqrBLyph7wqB7tpiTmoSrnmi3lnSr4rB34rh3wsB3xsBHqsBHtsBDysQzwsB7yswzytQvwuQ30sQnlsxHrtxrtsi3usy/vuDDwuDL0rTvvqTnvpTjupDfyqDnqoDPqpjHquAzvugfkrAL32h3+9jD++zr+/IT5uQr5ugn8uQj4vQn0wQn5wAr+vQj8ugzxxBL0xwv4xwf7wQ//vxb+uBf9tBn5yAX+uB38tyD8yh34wyf30Rb50RX80w35zQf+1w781gr+1Qb51gr80QT91AT+1gL21gT+2hD+2xH/3Qv93BT+3Bn93Br94Q793Qf+4gb94gb+4QL84Qb+5RT84BX82x/92gX+5gT+5wP95wP94g/93iP81Sf+0Cf7zij9yiv6xSz3wS30yS7zvy7xvy7yvjL3vDr5szz7wDz7xz34zz/82T764Dr85y/520D+6CH96iP+7Sb87B/+6yb+8Cj+8jv751L+7yT+9yb/+Sn+9iT+/CP/+yL/+jD+9Bv//jT//Dv/+0b++i3++1L98UT+7g396wb//iH+/Rz+/BP++A/++Av++An+9gf+9gf++AP++QH+9QD+8AX+7gH97AL+9i3+/F3+/F/++3H//Hv99oH//Yj++5D+/Z7++6r+/rv+/sf//tb+/uL+/eH+/u3+/dkAAABSzy4oAAABAHRSTlMOJC4mEChXe5ujnqNPQG3k+f3++v/9//////////LRXP////////79/v7//v///////v7//////f//8n5PMhsK/////////////////////////////////////////////////////////////////////v///v74////0591JP////////////////////////////////////////////7//v7+/v////////7+//////3+///////////////////+///++/7+//3x///43/v//v7///3////+/v//////////////////////0/jf///8//////7///nS8IAAmjkjSQAAAAlwSFlzAAALEgAACxIB0t1+/AAAGTdJREFUeJykWgtUk1e2Th0fd7j1jcprzaRV8EWqGFB61QgIWh0QRMKAIKPXkYVoBWmFSV1ImiKNLsRqBSQGtIESb1YwZEaeBZWHguCrWOWlhATIwvBrBwuKOC137/P/eYCPTu/da5Wmv18/d85/zt7f/g6sERI8/MHCH0lDPT0PE8jnpKGf3uvpiYvAz8OOKSkifSx+1g0Jnz5L6YvlwmdFr2dbv0gTA5+bDxo89K1CzT74nCOg/AyGw4Vc+CylPPMNHLki3J+1JjpU3UcFqYq/WstKtFeoz6yV5JxMncC6YR94xPOvWSVhqSOsVXnBwZu0zeEbrSCHenFee2el/2LMraG+viXG1ZXO84/V8Z8uN+Vsmf9wV48+jv48/Pw9x56rcfh56EVASoq+Z/lS+Kye19/vc76PC587Agz3fnQ+r+EuY42oog0G960aDTxfnU1RmQaOuphrzcqyoQyUIUpeGj6NlbFZTVGhKtVXaSOs04EKtW9QTl7qsRFWbnCgFz9fciINcs7bFBzcqS3fuBVyqG/ce73pnr//OMwH0r/PdZ1G51lbFZ8w1SJ//Aov23p6utreHbF8nDQ8BO8Dorc6Lm6c8fHLF0ObHUUiEXwj3d8S4qzIY556ONa7ZNAH3pNGr4/hurrg4zUKte25L9t+7B/giM73wUvDrzrCUyls4dvqta3OQqFGA++PPM5R2T42GHwMa/U97sJCjXIbFxepMXsuRVFR+QaDQeMhVyiq3Ljc6fBepU7J7hTVAX/mmaySn/s6bcfWCaxVWQv4KrVaraHUnN05KlVx6rGv5o6wbqTPDozeoVZzQoMyJNmSYrFYvBm+5ZO8hcHBWwIDA7dom2Wysq1bw+BVj7B4ygL7TbCOTZ2d2uuV6zb4ONBrcqe+vl5Z0H6/vb3SDWK6calW32yob2mt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") 32 32, auto;
  }

</style>