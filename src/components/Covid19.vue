<template>
  <div>
    <div>
      <h2>Cases</h2>
      <ChartLine :date="dates" :chart-data="cases" :death="deaths"></ChartLine>
      <br /><br />
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import ChartLine from "@/components/Chart-Line";
export default {
  name:"Covid19",
  data: () => {
    return {
      dates: [],
      cases: [],
      deaths: [],
    };
  },
  components: {
    ChartLine,
  },
  async created() {
    const { data } = await axios.get(
      "https://disease.sh/v3/covid-19/historical/all?lastdays=30"
    );
    for (var key in data.cases) {
      this.dates.push(key);
      this.cases.push(data.cases[key]);
      this.deaths.push(data.deaths[key]);
    }

  },
};
</script>