<template lang="">
  <div class="q-pa-md">
    <q-toolbar-title class="q-pb-sm flex justify-between">
      Quotation [{{ quotation?.status }}]
    </q-toolbar-title>

    <div class="flex justify-between">
      <div>
        <strong>Customer:</strong> {{ quotation?.user.first_name }}
        {{ quotation?.user.last_name }}
      </div>
      <revert-quotation v-if="!isRevered" @revertQuotation="revertQuotation" />
    </div>

    <div class="q-my-sm flex justify-between">
      <div><strong>Email:</strong> {{ quotation?.user.email }}</div>
    </div>
    <q-markup-table>
      <thead>
        <tr>
          <th colspan="2" class="text-left">Product</th>
          <th class="text-left">Quantity</th>
          <th class="text-left">Unit Cost</th>
          <th class="text-left">Total Cost</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in quotation?.items" :key="item.id">
          <td class="text-left">
            <img width="50" :src="item.product.image.file" />
          </td>
          <td class="text-left">{{ item.name }}</td>
          <td class="text-left">{{ item.quantity }}</td>
          <td class="text-left">
            <input
              v-if="!isRevered"
              type="number"
              :value="item.price"
              :id="`quantity-input-${item.id}`"
              @blur="computeItemTotalCost(item)"
            />
            <label v-else>{{ item.price }}</label>
          </td>
          <td class="text-left">{{ commaSeparator(item.totalCost || 0) }}</td>
        </tr>
        <!-- <tfoot> -->
        <tr>
          <td colspan="4">Total</td>
          <td>{{ commaSeparator(totalCost) }}</td>
        </tr>
        <!-- </tfoot> -->
      </tbody>
    </q-markup-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      quotation: null,
    };
  },

  created() {
    this.getQuotation();
  },

  computed: {
    totalCost() {
      if (this.quotation) {
        return `${this.quotation.items
          .map((item) => {
            item.totalCost = item.price * item.quantity;
            return parseInt(
              `${item.price * item.quantity || 0}`.replace(",", "")
            );
          })
          .reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          )}`
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      return 0;
    },

    isRevered() {
      return this.quotation?.status == "REVERTED";
    },
  },

  methods: {
    getQuotation() {
      this.$api.get(`quotations/${this.$route.params["id"]}/`).then((res) => {
        this.quotation = res.data;
        console.log(this.quotation.items);
      });
    },

    computeItemTotalCost(item) {
      console.log(item);
      var input = document.getElementById(`quantity-input-${item.id}`);
      console.log(input);
      var price = parseInt(input.value.replace(",", ""));
      item["totalCost"] = `${item.quantity * price}`
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (price) {
        item.price = price;
        this.updateQutationItem(item, { price: price });
      }
    },

    updateQutationItem(item, data) {
      this.$api.patch(`quotation-items/${item.id}/`, data).then((res) => {
        console.log(res);
      });
    },

    commaSeparator(number) {
      return `${number}`
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    revertQuotation() {
      console.log(this.quotation);
      this.$api
        .put(`quotations/${this.quotation.id}/revert/`)
        .then((res) => {
          this.quotation = res.data;
          console.log(this.quotation);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>
<style lang=""></style>
