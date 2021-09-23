<template>
  <div class="container shadow-lg p-3 mb-5 bg-white rounded">
    <div class="overflow-auto">
      <b-table
        id="my-table"
        :per-page="perPage"
        :current-page="currentPage"
        small
        striped
        hover
        :items="items"
        :fields="fields"
      ></b-table>
      <p class="mt-3">Current Page: {{ currentPage }}</p>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>
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
const axios = require("axios");
export default {
    name:'Table',
  data: () => {
    return {
      perPage: 10,
      currentPage: 1,
      items: [],
      store: [],
      message: "",
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
    filterChart(message) {
      this.items = this.store.slice(30 - message);
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