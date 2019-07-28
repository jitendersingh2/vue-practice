<script>
import { Bar } from 'vue-chartjs';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

export default {
  extends: Bar,
  mounted() {
    this.renderChart(
      {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: this.datasets,
      },
      {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                color: 'transparent',
              },
            },
          ],
        },
      },
    );
  },
  props: {
    datasets: {
      type: Array,
      default: null,
    },
  },
};
</script>
