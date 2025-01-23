<script lang="ts">
	import { StoreOfferType } from '../../../common/enums';
	import Timer from '$lib/components/common/Timer.svelte?raw';
	import CountdownTimer from '$lib/components/common/CountdownTimer.svelte';
	import AppButton from '$lib/components/common/AppButton.svelte';
	import type { StoreOffer } from '../../../common/models/store-offer.type';
	import { playerState } from '$lib/state/player.state';
	import { handleTutorialStep } from '$lib/tutorial.service';
	import { deselectItemsOnPage, removeBackgroundGlass } from '$lib/tutorial.utils';
	import { showPopUpStoreLayout } from '$lib/state/storePopup.state';
	import { TutorialSteps } from '../../../common/enums';
	import { StorePopUpMode } from '../../../types/storePopup.type';
	import { AdapterCommunicationService } from '$lib/adapter-listener';
	import MainButton from '$lib/components/common/MainButton.svelte';

	export let offer;
	export let index;

	function showStorePopUp(storeOffer: StoreOffer) {
		//#tutorial
		if (storeOffer.id === 'tutorialOffer' && $playerState.general.balance >= storeOffer.price) {
			AdapterCommunicationService.sendMessage({
				type: 'track',
				message: { type: 'clickTutorOfferWelcomeScreen' }
			});
			handleTutorialStep(TutorialSteps.offerStep2);
		} else {
			deselectItemsOnPage(['tutorialOffer']);
			AdapterCommunicationService.sendMessage({
				type: 'hideTutorialHints'
			});
			removeBackgroundGlass();
			AdapterCommunicationService.sendMessage({ type: 'track', message: { type: 'clickOffer' } });
		}
		$showPopUpStoreLayout.mode = StorePopUpMode.view;
		$showPopUpStoreLayout.isOpen = true;
		$showPopUpStoreLayout.id = storeOffer.id;
		$showPopUpStoreLayout.name = storeOffer.name;
		$showPopUpStoreLayout.description = storeOffer.description;
		$showPopUpStoreLayout.price = storeOffer.price;
		$showPopUpStoreLayout.type = storeOffer.type;
		$showPopUpStoreLayout.reward = storeOffer.reward;
		$showPopUpStoreLayout.bet = storeOffer.bet;
		$showPopUpStoreLayout.wager = storeOffer.wager;
		$showPopUpStoreLayout.img = storeOffer.img;
		$showPopUpStoreLayout.endDate = storeOffer.endDate;
		$showPopUpStoreLayout.balance = $playerState.general.balance;
		AdapterCommunicationService.sendMessage({ type: 'openPopup', message: 'click' });
	}

</script>

<div  role="button" tabindex={index + 3}
			on:keydown={(e) => {
           if (e.key === 'Enter' || e.key === ' ') {
             e.preventDefault();
             showStorePopUp(offer);
           }
         }}
			on:click={() => showStorePopUp(offer)} class="store-item">
	<div class="store-card f-jcsb">
		<div class="store-card__offer f-center">
			<div class="store-card__image" style="background-color: brown; background-image: url('{offer.img  ?  offer.img : `https://p2w.imgix.net/resources/client/store/Icn_Str_Slot.png?auto=compress&auto=format)`}')">
				<div class="store-card__timer f-center-center">
					<div class="store-card__timer-icon">
						<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect opacity="0.5" x="1.44092" y="1.8999" width="11.6308" height="11.6308" rx="5.81538" fill="black"/>
							<path d="M7.2544 3.51582C7.16246 3.5158 7.07143 3.53389 6.98649 3.56906C6.90155 3.60423 6.82437 3.65579 6.75937 3.72079C6.69436 3.7858 6.6428 3.86297 6.60763 3.94791C6.57246 4.03285 6.55437 4.12389 6.5544 4.21582V7.28447L4.85293 8.14067C4.77084 8.18196 4.69768 8.23902 4.63764 8.30859C4.57759 8.37816 4.53184 8.45887 4.50299 8.54612C4.47414 8.63337 4.46275 8.72545 4.46949 8.8171C4.47622 8.90875 4.50094 8.99817 4.54224 9.08027C4.58353 9.16236 4.64059 9.23552 4.71016 9.29557C4.77973 9.35561 4.86044 9.40136 4.94769 9.43022C5.03494 9.45907 5.12702 9.47045 5.21867 9.46372C5.31031 9.45698 5.39974 9.43226 5.48184 9.39097L7.56885 8.34097C7.68478 8.28279 7.78224 8.1935 7.85033 8.0831C7.91842 7.9727 7.95445 7.84553 7.9544 7.71582V4.21582C7.95442 4.12389 7.93633 4.03285 7.90116 3.94791C7.86599 3.86297 7.81443 3.7858 7.74942 3.72079C7.68442 3.65579 7.60724 3.60423 7.5223 3.56906C7.43736 3.53389 7.34633 3.5158 7.2544 3.51582ZM7.2544 0.71582C5.86993 0.71582 4.51655 1.12636 3.36541 1.89553C2.21426 2.6647 1.31705 3.75795 0.787241 5.03704C0.257428 6.31612 0.118804 7.72358 0.388901 9.08145C0.658997 10.4393 1.32568 11.6866 2.30465 12.6656C3.28362 13.6445 4.5309 14.3112 5.88876 14.5813C7.24663 14.8514 8.6541 14.7128 9.93318 14.183C11.2123 13.6532 12.3055 12.756 13.0747 11.6048C13.8439 10.4537 14.2544 9.10029 14.2544 7.71582C14.2523 5.85996 13.5141 4.08071 12.2018 2.76842C10.8895 1.45612 9.11026 0.717943 7.2544 0.71582ZM7.2544 13.3158C6.14682 13.3158 5.06412 12.9874 4.1432 12.372C3.22229 11.7567 2.50452 10.8821 2.08067 9.85885C1.65682 8.83558 1.54592 7.70961 1.762 6.62331C1.97808 5.53702 2.51143 4.5392 3.2946 3.75602C4.07777 2.97285 5.0756 2.4395 6.16189 2.22342C7.24818 2.00735 8.37416 2.11824 9.39742 2.54209C10.4207 2.96595 11.2953 3.68371 11.9106 4.60463C12.526 5.52554 12.8544 6.60824 12.8544 7.71582C12.8527 9.20051 12.2622 10.6239 11.2123 11.6737C10.1625 12.7236 8.73909 13.3141 7.2544 13.3158Z" fill="white"/>
						</svg>

					</div>
					<p class="store-card__timer-text">
						<CountdownTimer dateEnd={offer.endDate} />
					</p>
				</div>
			</div>
			<div class="store-card__content">
				<h2 class="store-card__title">
					{offer.name}
				</h2>
				<p class="store-card__text">
					{offer.provider ? offer.provider : 'Provider name'}
				</p>
				<p class="store-card__bet">
					<b>{offer.wager || offer.wager === 0 ? 'x' + offer.wager :  ''}</b>{offer.wager || offer.wager === 0 ? 'Wagering' :  'No wager'}
				</p>
				<p class="store-card__min">
					Bet  <b>{offer.bet ? offer.bet : '???'}  </b>
				</p>
			</div>
		</div>
		<div class="store-card__price">
			<p class="store-card__price-value">
				{offer.reward ? offer.reward : '???'}
			</p>
			<div class="store-card__price-btn">
				<MainButton
					on:click={() => showStorePopUp(offer)}
					isLoading={$showPopUpStoreLayout.isOpen}
					caption={`${offer.price}`}
					withCoin={true}
					id={offer.id + '-btn'}
					textStyles="color: #E9E9E9; font-size: 14px; font-family: Poppins; font-weight: 600; line-height: 16.80px; word-wrap: break-word; height: 14px;"
					wrapBtnStyles="width: 110px; height: 30px; border-radius: 8px; "
					variant="default"
				/>
			</div>
		</div>

	</div>
</div>

<style lang="scss">
  .f-center {
	display: flex;
	align-items: center;
  }
  .f-center-center {
	display: flex;
    justify-content: center;
	align-items: center;
  }
  .f-jcsb {
	display: flex;
    justify-content: space-between;
  }
  .store {
	&-item {
      width: 100%;
      margin-bottom: 9px;
      position: relative;
      z-index: 1;
	  &:last-child {
        margin-bottom: 0;
	  }
	}
	&-card {
      border-radius: 12px;
      border: 1px solid #1E2025;
      background: #14151A;
      padding: 5px;
      position: relative;
      font-family: Poppins;
	  overflow: hidden;
	  align-items: flex-end;
	  &:after {
		content: '';
		display: block;
        width: 100%;
        bottom: 0;
        left: 0;
		background: #00000080;
        height: 38px;
        position: absolute;
	  }
	  &__info {
        position: absolute;
        top: 6px;
        right: 6px;
        border-radius: 5.565px;
        border: 0.667px solid rgba(216, 225, 255, 0.20);
        background: rgba(0, 0, 0, 0.90);
        width: 16px;
        height: 16px;
		svg {
		  display: block;
		}
	  }
	  &__offer {
        gap: 10px;
        position: relative;
        z-index: 1;
	  }
	  &__price {
        position: relative;
        z-index: 1;
        width: 110px;
		text-align: center;
		&-value {
          font-size: 24px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: 0.24px;
          text-transform: uppercase;
		  color: rgba(#E9E9E9, 0.8);
		}
		&-btn {
          margin-top: 15px;
		}
	  }
	  &__title {
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 120%;
        color: #DDD;
      }
	  &__text {
        margin-top: 2px;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 12px;
        color: #A1A5AD;
      }
	  &__bet {
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
		color: #A2A6AD;
        margin-top: 6px;
        line-height: 120%;
		span {
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
		  color: #E4E4E4;
          line-height: 120%;
		}
	  }
	  &__min {
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 120%;
		color: #A2A6AD;
        margin-top: 21px;
		b {
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          line-height: 120%;
          color: #E4E4E4;
        }
	  }
      &__image {
        width: 106px;
        position: relative;
        height: 106px;
        flex-shrink: 0;
        border-radius: 8px;
		background-position: center center;
		background-size: cover;
      }
	  &__timer {
        top: 2px;
        width: 98%;
        left: 50%;
        position: absolute;
		background: #0A0A0A99;
		border-radius: 5px;
        gap: 5px;
        padding: 5px 0px;
		transform: translateX(-50%);
		&-icon {
		  svg {
			display: block;
		  }
		}
		&-text {
          font-size: 9.341px;
          font-style: normal;
          font-weight: 600;
          line-height: 9px;
          color: #FFF;
        }
	  }
	}
  }
  .store-item, .store-card {
    width: 100%;
  }
  @media screen and (max-width: 360px) {
    .store-card__image {
      width: 90px;
      height: 90px;
	}
    .store-card__timer-text {
      font-size: 8px;
	}
    .store-card__timer-icon svg {
      width: 12px;
      height: 12px;
	}
    .store-card__offer {
      gap: 7px;
	}
    .store-card__title {
      font-size: 12px;
	}
    .store-card__text {
      font-size: 10px;
      margin-top: 1px;
	}
    .store-card__bet {
      font-size: 10px;
      margin-top: 4px;
	  span {
        font-size: 12px;
	  }
	}
    .store-card__min {
      font-size: 10px;
      margin-top: 15px;
	  b {
        font-size: 12px;
	  }
	}
    .store-card__price-value {
      font-size: 20px;
	}
  }
</style>