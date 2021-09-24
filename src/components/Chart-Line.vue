<template>
  <div class="container shadow-lg p-3 mb-5 bg-white rounded">
    <canvas
      id="myChart"
      style="position: relative; height: 40vh; width: 80vw"
    ></canvas>
    <br />
    <div>
      <b-form-datepicker
        id="example-datepicker"
        @input="filterChart()"
        v-model="startDate"
        class="mb-2"
        max="2021-09-23"
        min="2021-08-25"
      ></b-form-datepicker>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
export default {
  props: {
    date: {
      type: Array,
    },
    chartData: {
      type: Array,
    },
    death: {
      type: Array,
    },
  },
  data() {
    return {
      myLineChart: null,
      startDate: "",
      endDate: "",
      maxDate:'',
      minDate:''
    };
  },
  methods: {
    filterChart() {
      let myDate = new Date(this.startDate);
      for (let i = 0; i < this.date.length; i++) {
        const element = new Date(this.date[i]);
        if (myDate.getDate() === element.getDate()) {
          this.myLineChart.data.labels = this.date.slice(i, 30);
          this.myLineChart.update();
          break;
        }
      }
    },
  },
  created() {
    setTimeout(() => {
      this.myLineChart.update();
    }, 100);
  },
  mounted() {
    var ctx = document.getElementById("myChart");
    this.myLineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.date,
        datasets: [
          {
            label: "CASES",
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(255, 236, 220, 0.4)",
            data: this.chartData,
          },
          {
            label: "DEATH",
            borderColor: "rgb(75, 75, 192)",
            backgroundColor: "rgba(255, 236, 220, 0.4)",
            data: this.death,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  },
};
</script>
<style scoped>
</style>