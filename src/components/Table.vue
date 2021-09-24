<template>
  <div class="container shadow-lg p-3 mb-5 bg-white rounded">
    <input class="form-control" id="exampleInputEmail1" placeholder="MM/DD/YY" type="text" v-model="textDate"><br>
    <div class="overflow-auto">
      <b-table
        :filter="textDate"
        id="my-table"
        :per-page="perPage"
        :current-page="currentPage"
        small
        striped
        hover
        :items="items"
        :fields="fields"
        key="items.date"
      ></b-table>
      <p class="mt-3">Current Page: {{ currentPage }}</p>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "Table",
  data: () => {
    return {
      perPage: 10,
      currentPage: 1,
      textDate:'',
      items: [],
      store: [],
      startDate: "",
      intData: "",
      fields: [
        "Date",
        "Cases",
        {
          key: "Deaths",
          label: "Deaths",
          variant: "danger",
        },
      ],
    };
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  methods: {
    filterTable() {
      let myDate = new Date(this.startDate);
      for (let i = 0; i < this.items.length; i++) {
        const element = new Date(Object.values(this.items[i])[0]);
        if (myDate.getDate() === element.getDate()) {
          console.log(element);
          console.log(i);
          console.log(myDate);
          this.items = this.store.slice(i);
          break;
        }
      }
    },
  },
  async created() {
    const { data } = await axios.get(
      "https://disease.sh/v3/covid-19/historical/all?lastdays=30"
    );
    for (var key in data.cases) {
      this.items.push({
        Date: key,
        Cases: data.cases[key],
        Deaths: data.deaths[key],
      });
      this.store.push({
        Date: key,
        Cases: data.cases[key],
        Deaths: data.deaths[key],
      });
    }
  },
};
</script>

<style>
</style>