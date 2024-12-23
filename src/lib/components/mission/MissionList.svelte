<script lang="ts">
    import Mission from './Mission.svelte';
    import type {Mission as MissionType} from '../../../common/models/mission.type';

    export let missions: MissionType[];
    console.log(missions, 'missions');

</script>


<div class="flex flex-col  touch-pan-y  w-full px-[8px] gap-y-[8px]" >
    {#each missions as mission, index }
        <Mission {mission} {index}/>
    {/each}
</div>
