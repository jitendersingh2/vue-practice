<script>
import { HorizontalBar } from 'vue-chartjs';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

export default {
  extends: HorizontalBar,
  props: {
      chartdata: {
          type: Object,
      },
      options: {
          type: Object,
      },
  },
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(this.chartdata, this.options);
  },
};
</script>