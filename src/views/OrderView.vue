<script setup>
import { ref, onMounted, h, reactive } from "vue";
import { getOrders } from "../api/order";
import { useAuthStore } from "../stores/auth";
import {
  NDataTable,
  NButton,
  NModal,
  NSpace,
  NH1,
  NDescriptions,
  NDescriptionsItem,
} from "naive-ui";

const authStore = useAuthStore();
const orderList = ref([]);
const loading = ref(true);
const showView = ref(false);
const selectedRow = ref(null);
const paymentcolumn = reactive({
  key: "payment_status",
  title: "Payment Status",
  filter: true,
  filterMultiple: false,
  filterOptionValue: null,
  filterOptions: [
    {
      label: "Paid",
      value: true,
    },
    {
      label: "Unpaid",
      value: false,
    },
  ],
});

// columns for data table
const columns = ref([
  {
    key: "id",
    title: "Order ID",
  },
  {
    key: "course_name",
    title: "Course",
  },
  {
    key: "student_username",
    title: "Stundet",
  },
  {
    key: "campus",
    title: "Campus",
  },
  {
    key: "created_time",
    title: "Order Time",
  },
  {
    key: "original_price",
    title: "Price",
  },
  paymentcolumn,
  {
    key: "action",
    title: "Action",
    render(row) {
      return [
        h(
          NButton,
          {
            type: "primary",
            size: "small",
            onClick() {
              // console.log(row);
              showView.value = true;
              selectedRow.value = row;
            },
          },
          "View"
        ),

        // the second rendered component
        !row.data.paid &&
          // authStore.getUserInfo?.user_type == "User.Admin" &&
          h(
            NButton,
            {
              type: "primary",
              size: "small",
              style: {
                marginLeft: "8px",
              },

              onClick: () => {},
            },
            "Pay"
          ),
      ];
    },
  },
]);

const pagination = reactive({
  // current page
  page: 1,

  // total number of pages
  pageCount: 1,
  pageSize: 10,
  prefix({ itemCount }) {
    return `${itemCount} orders in total`;
  },
});

// transfer data from api to data table format
const mapOrder = (order) => {
  return {
    id: order.id,
    course_name: order.course.name,
    student_username: order.student.username,

    // toLocalString() is used to convert the time to local time (in this case, Melbourne time (browser dependent))
    created_time: new Date(order.created_time + "Z").toLocaleString(),

    campus: order.campus.name,
    payment_status: order.paid ? "Paid" : "Not paid",
    original_price: "$" + order.original_price,

    // if we want to handle later, we need original data
    data: order,
  };
};

const handlePageChange = async (page) => {
  loading.value = true;

  const data = await getOrders(page, paymentcolumn.filterOptionValue);
  orderList.value = data.items.map(mapOrder);

  // pagination
  pagination.pageCount = data.total_pages;
  pagination.itemCount = data.counts;
  pagination.page = data.page_num;

  loading.value = false;
};

const handleFilterChange = async (filters) => {
  loading.value = true;

  const data = await getOrders(1, filters.payment_status);
  orderList.value = data.items.map(mapOrder);

  // pagination
  pagination.pageCount = data.total_pages;
  pagination.itemCount = data.counts;
  pagination.page = data.page_num;
  paymentcolumn.filterOptionValue = filters.payment_status;
  loading.value = false;
};

// fetch orders from backend and set to orderList.value
onMounted(async () => {
  const data = await getOrders();
  orderList.value = data.items.map(mapOrder);

  // pagination
  pagination.pageCount = data.total_pages;
  pagination.itemCount = data.counts;

  loading.value = false;
});
</script>

<template>
  <n-space vertical>
    <n-h1>Orders</n-h1>
    <n-data-table
      remote
      :columns="columns"
      :data="orderList"
      striped
      :loading="loading"
      :pagination="pagination"
      @update:page="handlePageChange"
      @update:filters="handleFilterChange"
    ></n-data-table>
  </n-space>

  <!-- dialog for viewing specific order row -->
  <n-modal
    v-model:show="showView"
    preset="dialog"
    title="Order Details"
    style="width: 800px"
  >
    <n-descriptions
      label-placement="top"
      bordered
      :column="4"
      class="details-table"
    >
      <n-descriptions-item label="id" :span="2">
        {{ selectedRow.data.id }}
      </n-descriptions-item>
      <n-descriptions-item label="created_time" :span="2">
        {{ selectedRow.data.created_time }}
      </n-descriptions-item>
      <n-descriptions-item label="Campus">
        {{ selectedRow.data.campus.name }}
      </n-descriptions-item>
      <n-descriptions-item label="Course Name">
        {{ selectedRow.data.course.name }}
      </n-descriptions-item>
      <n-descriptions-item label="University Code">
        {{ selectedRow.data.course.uni_course_code }}
      </n-descriptions-item>
      <n-descriptions-item label="original_price">
        {{ selectedRow.data.original_price }}
      </n-descriptions-item>
      <n-descriptions-item label="paid">
        {{ selectedRow.data.paid }}
      </n-descriptions-item>
      <n-descriptions-item label="Paid Time" :span="2">
        {{ selectedRow.data.paid_time }}
      </n-descriptions-item>
      <n-descriptions-item label="Paid Price">
        {{ selectedRow.data.paid_price }}
      </n-descriptions-item>
      <n-descriptions-item label="Comment" :span="4">
        {{ selectedRow.data.paid_comment }}
      </n-descriptions-item>
    </n-descriptions>

    <template #action>
      <n-space
        ><n-button type="primary" @click="showView = false">
          Done
        </n-button></n-space
      >
    </template>
  </n-modal>
</template>

<style scoped>
.details-table {
  margin-top: 24px;
}
</style>
