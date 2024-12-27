<script lang="ts">
import { base } from '$app/paths';
import coin from '$lib/components/common/Coin.svelte?raw';
import SecondAppButton from '$lib/components/common/SecondAppButton.svelte';
import { pbState } from '$lib/state/pb.state';

export let multiplier:number = 1;
export let price:number = 1;
export let priceDescription:string = '';
export let finalCoins:number = 1;
export let currentBalance:number = 0;
export let id:string;

</script>


<div class="w-full h-full flex  card justify-between relative" >
	<div class="w-[140px]">
		<div class="price">
			{finalCoins}
		</div>
		<div class="card-description">
			{priceDescription}
		</div>
		<div class="coin" style='background-image: url({base}/reskin/goldDown.png)'>
		</div>
	</div>
	<div class="w-[170px]">
		<div class="description-multiplier w-[120px] mx-auto leading-[1.2] mt-[10px]">
			By depositing  you can
			pick up x{multiplier} cashback
		</div>
		<div class="flex items-center justify-center flex-row pt-[13px]">
			<div class="description-multiplier">
				Requirements:
			</div>
			<div class="coin-wrapper px-[6px]">
				{@html coin}
			</div>
			<div class="coin-multiplier">
				{price}
			</div>
		</div>
		<div class="w-[166px] h-[30px] mt-[10px] {currentBalance < price ? 'opacity-30' : 'opacity-[1]'} flex justify-center items-center">
			<SecondAppButton caption="OPEN"  on:click variant="reward" isLoading={$pbState?.isLoading} {id}/>
		</div>


	</div>
</div>

<style lang="scss">
  .card{
    padding: 8px;
    width: calc(100% - 16px);
    height: 120px;
    background: #0E0F12;
    border: 1px solid #1E2025;
    border-radius: 12px;
    overflow: hidden;
		margin: auto;
  }

  .price {
    width: 157px;
    height: 60px;
    font-size: 58px;
  }
  .card-description{
    width: max-content;
    height: 32px;
    font-size: 17px;
  }
  .price,
  .card-description{
    font-style: normal;
    font-weight: 900;
    font-family: 'Poppins';
    line-height: 1;

    text-align: center;
    text-transform: uppercase;

    background: radial-gradient(44.33% 56.25% at 78.03% 120%, #F0FB5D 0%, rgba(240, 251, 91, 0) 100%) , linear-gradient(177.61deg, #F0FF6D 2%, #F5FD00 24.46%, #F8B000 55.63%, #DE8000 84.88%, #FEDD00 114.81%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    -webkit-text-stroke: thin #481402;
  }

  .coin {
    width: 100%;
    height: 20px;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .description-multiplier {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    text-align: center;

    color: #9FA5B1;
  }

  .coin-wrapper{
    display: inline-block;
    height: 13px;
  }

  .coin-multiplier{
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 1;
    color: #E9E9E9;
  }
</style>