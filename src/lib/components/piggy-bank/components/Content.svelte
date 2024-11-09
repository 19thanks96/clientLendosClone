<script lang="ts">
import pigIcon from "$lib/components/piggy-bank/images/pigIcon.svelte?raw";
import Title from "./Title.svelte";
import Curtain from "./Curtain.svelte";
import MainContent from "./MainContent.svelte";
import type {PiggyBankType} from "../../../../common/models/piggy-bank.type.js";

export let piggyBank:PiggyBankType
$:piggyBankBalance = piggyBank.balance
$:piggyBankBalanceMax = piggyBank.balanceMax


</script>
<section class="content">
    <div class="pigIcon">
        {@html pigIcon}
    </div>
    <Title
            name={piggyBank.name}
    />
    <Curtain
            currentBalance={piggyBankBalance}
            maxBalance={piggyBankBalanceMax}
    />
    <MainContent
           piggyBank={piggyBank}
    />
</section>


<style>
    .content{
        width: 480px;
        height: 800px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }

    @media screen and (max-width: 450px) {
       .pigIcon{
           margin-top: 10px;
       }
    }

</style>