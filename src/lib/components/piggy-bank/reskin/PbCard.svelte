<script lang="ts">
import { base } from '$app/paths';
import coin from '$lib/components/common/Coin.svelte?raw';
import SecondAppButton from '$lib/components/common/SecondAppButton.svelte';
import { pbState } from '$lib/state/pb.state';
import {playerState} from '$lib/state/player.state';
import InfoButton from '$lib/components/common/InfoButton.svelte';
import MainButton from '$lib/components/common/MainButton.svelte';


export let multiplier:number = 1;
export let price:number = 1;
export let priceDescription:string = '';
export let finalCoins:number = 1;
export let currentBalance:number = 0;
export let id:string;

const isPbClaimButton = id === 'pbClaimIntermediateButton';
const isBalanceNotMax = isPbClaimButton && currentBalance === $playerState.pb.balanceMax;
const checker = currentBalance >= price && !isBalanceNotMax;

const openPopup = () => {

}
</script>


<div class="cash-card">
	<div class="cash-card__inner">
		<div class="cash-card__info">
			<button on:click={openPopup} style="aspect-ratio: 1/1" class="absolute top-0  h-full flex items-center  justify-center  z-[6] justify-center ">
				<InfoButton rounded={0}/>
			</button>
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
				<MainButton
					caption="OPEN"  on:click
					isLoading={$pbState?.isLoading} {id}
					textStyles="color: #E9E9E9; font-size: 12px; font-family: Poppins; font-weight: 600; text-transform: uppercase;  word-wrap: break-word; "
					wrapBtnStyles="width: 166px; height: 30px; border-radius: 8px; "
					variant="blue"
				/>
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
			overflow: hidden;
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
	@media screen and (max-width: 380px) {
	  .cash-card {
        margin-left: 8px;
        margin-right: 8px;
        padding: 16px 5px 9px 8px;
        .cash-card__content-value {
          font-size: 38px;
		  line-height: 45px;
		}
        .cash-card__content-title {
          font-size: 15px;
		}
        .cash-card__more {
		  max-width: 152px;
          width: 100%;
		}
        .cash-card__more-btns {
          width: 100%;
        }
	  }
	}
</style>
