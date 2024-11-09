<script lang='ts'>
    import {base} from "$app/paths";

    const image: string = `https://p2w.imgix.net/resources/client/sc/Img_Title_SC.png?auto=compress&auto=format`;
    const text: string = 'scratch'
    const textUpperCase = text.toLocaleUpperCase()
    let style = "    background: linear-gradient(to top, #FFCB13, #FFF730);color: transparent;-webkit-background-clip: text;-webkit-text-stroke-color: #166D43;-webkit-text-stroke-width: 0.7px; filter: drop-shadow(2px 2px #0A4A2B);line-height: 1.01;"
</script>

<div style="background-image: url({image});"
     class="w-full h-full bg-contain bg-no-repeat bg-center flex justify-center items-center">
    <div style="transform: translate(-10%, -45%); {style}"
         class="port:text-[6.41vw] self-center vwFont-[50] font-['Changa_One'] self-center">{textUpperCase}</div>
</div>