<template>
    <div class="btn-group border rounded-pill vertical-sm">
        <b-button
            :class="[ showEventWithStatus === 'SalesReport' ? 'btn-primary' : '' ]"
            class="btn-report-status text-uppercase border-left-radius"
            variant="white"
            @click="() => showEventWithStatus = 'SalesReport'"
        >Sales Report</b-button>
        <b-button
            :class="[ showEventWithStatus === 'Orders' ? 'btn-primary' : '' ]"
            class="btn-report-status text-uppercase"
            variant="white"
            @click="() => showEventWithStatus = 'Orders'"
        >Orders</b-button>
        <b-button
            :class="[ showEventWithStatus === 'GuestList' ? 'btn-primary' : '' ]"
            class="btn-report-status text-uppercase"
            variant="white"
            @click="() => showEventWithStatus = 'GuestList'"
        >Guest List</b-button>
        <b-button
            :class="[ showEventWithStatus === 'Promotions' ? 'btn-primary' : '' ]"
            class="btn-report-status text-uppercase"
            variant="white"
            @click="() => showEventWithStatus = 'Promotions'"
        >Promotions</b-button>
        <b-button
            :class="[ showEventWithStatus === 'EmailUpdates' ? 'btn-primary' : '' ]"
            class="btn-report-status text-uppercase border-right-radius"
            variant="white"
            @click="() => showEventWithStatus = 'EmailUpdates'"
        >Email Updates</b-button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class ButtonGroup extends Vue {
    private buttonActive: number = 1;
    private showEventWithStatus: string = 'SalesReport';
}
</script>
<style scoped>
.btn-report-status {
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.15em;
  height: 35px;
  border:1px solid #2080bf;
}
@media screen and (max-width: 760px) {
    .vertical-sm{
        display: flex;
        flex-direction: column;
    }
    .vertical-sm .button{
        border-radius: 4px;
    }
    .border-left-radius{
        border-radius: 4px !important;
    }
    .border-right-radius{
        border-radius: 4px !important;
    }
}

.border-left-radius{
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
}

.border-right-radius{
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
}
</style>
