<script lang="ts">
import { base } from '$app/paths';
import coin from '$lib/components/common/Coin.svelte?raw';
import SecondAppButton from '$lib/components/common/SecondAppButton.svelte';
import { pbState } from '$lib/state/pb.state';
import {playerState} from '$lib/state/player.state';


export let multiplier:number = 1;
export let price:number = 1;
export let priceDescription:string = '';
export let finalCoins:number = 1;
export let currentBalance:number = 0;
export let id:string;

const isPbClaimButton = id === 'pbClaimIntermediateButton';
const isBalanceNotMax = isPbClaimButton && currentBalance === $playerState.pb.balanceMax;
const checker = currentBalance >= price && !isBalanceNotMax;
</script>


<div class="cash-card">
	<div class="cash-card__inner">
		<div class="cash-card__info">
			<svg width="4" height="10" viewBox="0 0 4 11" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M2.34785 4.95654C2.73205 4.95654 3.0435 5.268 3.0435 5.6522V9.82611C3.0435 10.2103 2.73205 10.5218 2.34785 10.5218H1.6522C1.268 10.5218 0.956543 10.2103 0.956543 9.82611V5.6522C0.956543 5.268 1.268 4.95654 1.6522 4.95654H2.34785Z" fill="#7E8394"/>
				<path d="M1.2444 2.57613C1.44316 2.77166 1.69674 2.86943 2.00516 2.86943C2.30673 2.86943 2.55346 2.77166 2.74536 2.57613C2.94412 2.37307 3.0435 2.12489 3.0435 1.83159C3.0435 1.53077 2.94412 1.28259 2.74536 1.08705C2.55346 0.883998 2.30673 0.782471 2.00516 0.782471C1.69674 0.782471 1.44316 0.883998 1.2444 1.08705C1.05249 1.28259 0.956543 1.53077 0.956543 1.83159C0.956543 2.12489 1.05249 2.37307 1.2444 2.57613Z" fill="#7E8394"/>
			</svg>
		</div>
		<div class="cash-card__content">
			<p class="cash-card__content-value">
				{finalCoins}
			</p>
			<p class="cash-card__content-title">
				{priceDescription}
			</p>
			<div class="cash-card__content-coins" style='background-image: url({base}/reskin/goldDown.png)'>

			</div>
		</div>
		<div class="cash-card__more">
			<p class="cash-card__more-text">
				By depositing  you can<br>
				pick up <b>x{multiplier}</b> cashback
			</p>
			<div class="cash-card__more-coins f-center">
				<p class="cash-card__more-point">
					Requirements:
				</p>
				<div class="cash-card__more-offer">
					<div class="cash-card__more-coin">
						{@html coin}
					</div>
					<p class="cash-card__more-value">
						{price}
					</p>
				</div>
			</div>
			<div class="cash-card__more-btns { checker ? 'opacity-[1] pointer-events-all' : 'opacity-30 pointer-events-none'}">
				<SecondAppButton caption="OPEN"  on:click variant="reward" isLoading={$pbState?.isLoading} {id}/>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.cash-card{
      margin: 0 12px;
      border-radius: 12px;
      border: 1px solid #1E2025;
      background: #14151A;
      margin-bottom: 8px;
      padding: 16px 9px 9px 16px;
      position: relative;
      font-family: Poppins;
	  overflow: hidden;
      &:last-child {
        margin-bottom: 0;
	  }
	  &__more {
		text-align: center;
		max-width: 166px;
		&-text {
          font-size: 10px;
          font-style: normal;
          font-weight: 500;
          line-height: 12px;
          color: #9FA5B1;
		  b {
            font-weight: 600;
            color: #DEE2EA;
          }
        }
		&-coins {
		  display: flex;
		  align-items: center;
          margin-top: 9px;
          gap: 9px;
          justify-content: center;
		}
		&-point {
          font-size: 10px;
          font-style: normal;
          font-weight: 500;
          line-height: 12px;
          color: #A1A5AD;
        }
		&-offer {
		  display: flex;
          justify-content: center;
		  align-items: center;
          gap: 4px;
		}
		&-value {
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          line-height: 120%;
          color: #E9E9E9;
        }
		&-coin {
          width: 12px;
		  svg {
			display: block;
			width: 100%;
		  }
		}
		&-btns {
          height: 30px;
          width: 166px;
          border-radius: 5.565px;
          margin-top: 8px;
        }
	  }
	  &__inner {
		display: flex;
        justify-content: space-between;
	  }
	  &__info {
        position: absolute;
        top: 6px;
        right: 6px;
        z-index: 1;
        border-radius: 5.565px;
        border: 1px solid rgba(216, 225, 255, 0.20);
        padding: 0;
        margin: 0;
        background: rgba(0, 0, 0, 0.90);
        width: 16px;
        height: 16px;
		display: flex;
        justify-content: center;
		align-items: center;
		svg {
		  display: block;
		  //transform: translateX(0.5px);
		}
	  }
	  &__content {
		text-align: center;
		width: fit-content;
        position: relative;
		&-value {
          font-size: 58px;
          font-style: normal;
          -webkit-text-stroke-width: 1;
          -webkit-text-stroke-color: #481402;
          font-weight: 900;
          line-height: 50px; /* 68.477% */
          text-transform: uppercase;
          background: linear-gradient(178deg, #F0FF6D 2%, #F5FD00 24.46%, #F8B000 55.63%, #DE8000 84.88%, #FEDD00 114.81%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
		}
		&-title {
          font-size: 17px;
          font-style: normal;
          font-weight: 900;
          line-height: 20px; /* 233.627% */
          text-transform: uppercase;
		  background: linear-gradient(178deg, #F0FF6D 2%, #F5FD00 24.46%, #F2B600 51.02%, #FEDD00 114.81%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-top: 2px;
		}
		&-coins {
		  width: 151px;
          height: 20px;
		  background-size: contain;
          margin: 0 auto;
		  background-repeat: no-repeat;
		  pointer-events: none;
		  transform: translateY(9px);

        }
	  }
	}
</style>

<!--<div class="w-full h-full flex  card justify-between relative" >-->
<!--	<div class="w-[140px]">-->
<!--		<div class="price">-->
<!--			{finalCoins}-->
<!--		</div>-->
<!--		<div class="card-description">-->
<!--			{priceDescription}-->
<!--		</div>-->
<!--		<div class="coin" style='background-image: url({base}/reskin/goldDown.png)'>-->
<!--		</div>-->
<!--	</div>-->
<!--	<div class="w-[170px]">-->
<!--		<div class="description-multiplier w-[120px] mx-auto leading-[1.2] mt-[10px]">-->
<!--			By depositing  you can-->
<!--			pick up x{multiplier} cashback-->
<!--		</div>-->
<!--		<div class="flex items-center justify-center flex-row pt-[13px]">-->
<!--			<div class="description-multiplier">-->
<!--				Requirements:-->
<!--			</div>-->
<!--			<div class="coin-wrapper px-[6px]">-->
<!--				{@html coin}-->
<!--			</div>-->
<!--			<div class="coin-multiplier">-->
<!--				{price}-->
<!--			</div>-->
<!--		</div>-->
<!--		<div class="w-[166px] h-[30px] mt-[10px] { checker ? 'opacity-[1]' : 'opacity-30'} flex justify-center items-center">-->
<!--			<SecondAppButton caption="OPEN"  on:click variant="reward" isLoading={$pbState?.isLoading} {id}/>-->
<!--		</div>-->


<!--	</div>-->
<!--</div>-->

<!--<style lang="scss">-->
<!--  .card{-->
<!--    padding: 8px;-->
<!--    width: calc(100% - 16px);-->
<!--    height: 120px;-->
<!--    background: #0E0F12;-->
<!--    border: 1px solid #1E2025;-->
<!--    border-radius: 12px;-->
<!--    overflow: hidden;-->
<!--		margin: auto;-->
<!--  }-->

<!--  .price {-->
<!--    width: max-content;-->
<!--    height: 60px;-->
<!--    font-size: 58px;-->
<!--  }-->
<!--  .card-description{-->
<!--    width: 157px;-->
<!--		text-align: center;-->
<!--    height: 32px;-->
<!--    font-size: 17px;-->
<!--  }-->
<!--  .price,-->
<!--  .card-description{-->
<!--    font-style: normal;-->
<!--    font-weight: 900;-->
<!--    font-family: 'Poppins';-->
<!--    line-height: 1;-->

<!--    text-align: center;-->
<!--    text-transform: uppercase;-->

<!--    background: radial-gradient(44.33% 56.25% at 78.03% 120%, #F0FB5D 0%, rgba(240, 251, 91, 0) 100%) , linear-gradient(177.61deg, #F0FF6D 2%, #F5FD00 24.46%, #F8B000 55.63%, #DE8000 84.88%, #FEDD00 114.81%);-->
<!--    -webkit-background-clip: text;-->
<!--    -webkit-text-fill-color: transparent;-->
<!--    background-clip: text;-->
<!--    text-fill-color: transparent;-->
<!--    -webkit-text-stroke: thin #481402;-->
<!--  }-->


<!--  .coin {-->
<!--    width: 100%;-->
<!--    height: 20px;-->
<!--    background-size: contain;-->
<!--    background-repeat: no-repeat;-->
<!--  }-->

<!--  .description-multiplier {-->
<!--    font-family: 'Poppins';-->
<!--    font-style: normal;-->
<!--    font-weight: 500;-->
<!--    font-size: 10px;-->
<!--    text-align: center;-->

<!--    color: #9FA5B1;-->
<!--  }-->

<!--  .coin-wrapper{-->
<!--    display: inline-block;-->
<!--    height: 13px;-->
<!--  }-->

<!--  .coin-multiplier{-->
<!--    font-family: 'Poppins';-->
<!--    font-style: normal;-->
<!--    font-weight: 700;-->
<!--    font-size: 14px;-->
<!--    line-height: 1;-->
<!--    color: #E9E9E9;-->
<!--  }-->
<!--</style>-->