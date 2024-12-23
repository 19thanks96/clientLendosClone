<script lang="ts">
	import { showPopUpStoreLayout } from '$lib/state/storePopup.state';
</script>



	<div class="w-[102px] h-[38px] left-[1px] top-[63px] absolute">
		<div class="left-0 top-[21px] absolute">
			<span class="text-[#a2a6ad] text-xs font-normal font-['Poppins'] leading-[14.40px]">Min Bet</span>
			<span class="text-[#e4e4e4] text-sm font-bold font-['Poppins'] leading-[16.80px]">0.5 EUR  </span>
		</div>
		<div class="left-0 top-0 absolute">
			<span class="text-[#a2a6ad] text-xs font-normal font-['Poppins'] leading-[14.40px]">Bet </span>&nbsp;
			<span class="text-[#e4e4e4] text-sm font-bold font-['Poppins'] leading-[16.80px]">x1</span>
		</div>
	</div>
	<div class="w-[222px] h-[18px] left-0 top-[39px] absolute"><span
		class="text-[#a0a5ad] text-xs font-medium font-['Poppins'] leading-none">Get </span><span
		class="text-[#a1a5ad] text-xs font-medium font-['Poppins'] leading-none">50 Free Spins</span>

		<span class="text-[#a1a5ad] text-xs font-medium font-['Poppins'] leading-none">with x10 wagering</span>
	</div>
	<div class="w-[91px] h-[33px] left-0 top-0 absolute flex-col justify-between items-start inline-flex">
		<div class="self-stretch text-[#dddddd] text-sm font-semibold font-['Poppins'] leading-[16.80px]">
			{$showPopUpStoreLayout.name}
		</div>
		<div class="self-stretch h-3.5 text-[#a0a5ad] text-xs font-medium font-['Poppins'] leading-3">Provider
			name
		</div>
	</div>
