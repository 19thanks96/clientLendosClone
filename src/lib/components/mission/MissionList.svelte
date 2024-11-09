<script lang="ts">
    import Mission from './Mission.svelte';
    import type {Mission as MissionType} from '../../../common/models/mission.type';

    export let missions: MissionType[];

</script>


<div class="flex flex-col gap-y-[0.1475vw]  touch-pan-y port:gap-y-[0.45vw] " style="">
    <div class="w-full h-[1vw] port:h-[7.8vw]"></div>
    {#each missions as mission, index }
        <Mission {mission} {index}/>
    {/each}
</div>
