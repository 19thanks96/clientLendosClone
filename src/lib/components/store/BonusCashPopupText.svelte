<script lang="ts">
	import { showPopUpStoreLayout } from '$lib/state/storePopup.state';
</script>

<div class="w-[207px] h-10 leading-[1]">
	<span class="text-[#a0a5ad] text-xs font-medium font-['Poppins'] ">Get </span>
	<span class="text-[#e7e9eb] text-xs font-bold font-['Poppins'] "> {$showPopUpStoreLayout.reward ? $showPopUpStoreLayout.reward : '???'  } Bonus Cash </span>
	<span class="text-[#a0a5ad] text-xs font-bold font-['Poppins'] "> with </span>
	<span class="text-[#e8e9ec] text-xs font-bold font-['Poppins'] "> x{$showPopUpStoreLayout.wager ? $showPopUpStoreLayout.wager + 'wagering' : 'no wager'  }  </span>
	<span class="text-[#a0a5ad] text-xs font-medium font-['Poppins'] "> in any slot game </span>
</div>

<div>
	<span class="text-[#a2a6ad] text-xs font-normal font-['Poppins'] leading-[14.40px]">{$showPopUpStoreLayout.wager ? 'Wager' : 'No wager'  } </span>
	<span class="text-[#e4e4e4] text-sm font-bold font-['Poppins'] leading-[16.80px]">x{$showPopUpStoreLayout.wager ? $showPopUpStoreLayout.wager : '???'  }</span>

</div>