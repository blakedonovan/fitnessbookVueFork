
import { Bar, mixins } from "vue-chartjs";

export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: ["chartData"],
  data() {
    return {
      options: {
        //Chart.js options
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
       },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  }
};
