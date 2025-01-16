<script lang="ts">
    import Mission from './Mission.svelte';
    import type {Mission as MissionType} from '../../../common/models/mission.type';

    export let missions: MissionType[];
    console.log(missions, 'missions');

</script>


<div class="flex   touch-pan-y  w-full px-[8px] gap-y-[8px] {missions.length === 0 ? 'flex-row h-full' : 'flex-col'}" >
    {#if missions.length === 0}
        <div class="w-full text-center text-[#9fa5b1] text-base font-medium font-['Poppins'] leading-none h-full flex items-center justify-center">
            Expecting new missions
        </div>
        {:else}
            {#each missions as mission, index }
                <Mission {mission} {index}/>
            {/each}
    {/if}
</div>
