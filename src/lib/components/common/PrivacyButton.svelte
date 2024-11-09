<script lang="ts">
import { showPopUpLayout } from '$lib/state/popup.state';
  import { AdapterCommunicationService } from '$lib/adapter-listener';

    export let background:string
    export let image:string
    export let text:string;
    export let bgPopup:string
    
    function openPopup() {
        $showPopUpLayout.isOpen = true
        $showPopUpLayout.name = 'Privacy policy'
        $showPopUpLayout.description = text
        AdapterCommunicationService.sendMessage({type: 'openPopup', message: 'click'})


    }
</script>

<span on:click={openPopup} style="background-image: url({background}); cursor: pointer;" class=" privacy absolute bottom-[1.19792vw] left-[1.19792vw] port:left-[2.037vw] port:bottom-[2.037vw]   vwWidth-[35] vwHeight-[35] port:w-[7.407vw] port:h-[7.407vw] bg-cover  z-[1]"><img class='m-[25%]  vwWidth-[18] vwHeight-[18] port:w-[3.704vw] port:h-[3.704vw]'  src={image} alt="privacy" /></span>



