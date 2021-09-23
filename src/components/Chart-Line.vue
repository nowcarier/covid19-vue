<template>
  <div class="container shadow-lg p-3 mb-5 bg-white rounded">
    <canvas
      id="myChart"
      style="position: relative; height: 40vh; width: 80vw"
    ></canvas>
    <br />
    <div class="row">
      <div class="col">
        <input
          v-model="message"
          placeholder="Filter by date"
          type="text"
          class="form-control"
        />
      </div>
      <div class="col-1">
        <button
          @click="filterChart(message)"
          type="submit"
          class="btn btn-primary mb-2"
        >
          submit
        </button>
      </div>
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
      message: "",
    };
  },
  methods: {
    filterChart(message) {
      console.log(this.label.slice(30 - message));
      this.myLineChart.data.labels = this.label.slice(30 - message);
      this.myLineChart.update();
    },
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