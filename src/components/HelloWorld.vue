<template>
  <div class="affiliate-dashboard-container">
    <div class="dashboard-header d-lg-flex d-none justify-content-around align-items-center bg-white shadow-sm mb-4">
      <div>
        <router-link to="/"><i class="bi bi-house dashboard-header-icon"></i></router-link>
      </div>
      <div>
        <el-input v-model="selected" placeholder="Search on something..." class="input-with-select header-search-input">
          <template #prepend>
            <el-select v-model="selected" placeholder="Select" style="width: 115px">
              <el-option v-for="(option, i) in selectOptions" :key="i" :label="option.label" :value="option.value" />
            </el-select>
          </template>
          <template #append>
            <i class="bi bi-search" style="font-size: 18px; cursor: pointer"></i>
          </template>
        </el-input>
      </div>
      <div class="d-flex justify-content-center align-items-center header-account-controls">
        <el-dropdown placement="bottom">
          <router-link to="/customer/notic" class="header-icon-link"><i class="bi bi-bell"></i></router-link>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item> Your account is active now you can pay or sale and get deposit... </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown placement="bottom" class="ms-3">
          <i class="bi bi-person dashboard-header-icon"></i>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <router-link to="/customer/setting" class="dropdown-item-link"><i class="bi bi-gear dropdown-item-icon"></i>Setting</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/customer/payment" class="dropdown-item-link"><i class="bi bi-wallet dropdown-item-icon"></i>Payments</router-link>
              </el-dropdown-item>
              <hr class="my-1"/>
              <el-dropdown-item>
                <router-link to="/customer/logout" class="dropdown-item-link"><i class="bi bi-box-arrow-right dropdown-item-icon"></i>Logout</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    
    <div class="affiliate-dashboard">
      <h2 class="dashboard-title mb-4">Affiliate Dashboard</h2>

      <section class="summary-section mb-5">
        <h3 class="section-title mb-3">Your Performance Overview</h3>
        <div class="summary-blocks-grid">
          <div class="summary-card">
            <h1 class="fw-bold"><i class="bi bi-bag-heart"></i> Orders</h1>
            <span class="fs-4 text-primary">113</span>
            <span class="d-flex justify-content-between align-items-center w-100">
              <small class="text-success fw-bold">35%</small>
              <small class="text-muted fw-bold">Count</small>
            </span>
          </div>

          <div class="summary-card">
            <h1 class="fw-bold"><i class="bi bi-cursor"></i> Clicks</h1>
            <span class="fs-4 text-primary">1250</span>
            <span class="d-flex justify-content-between align-items-center w-100">
              <small class="text-success fw-bold">15%</small>
              <small class="text-muted fw-bold">View Details</small>
            </span>
          </div>

          <div class="summary-card">
            <h1 class="fw-bold"><i class="bi bi-bar-chart-line"></i> Conversions</h1>
            <span class="fs-4 text-info">32</span>
            <span class="d-flex justify-content-between align-items-center w-100">
              <small class="text-success fw-bold">5%</small>
              <small class="text-muted fw-bold">Details</small>
            </span>
          </div>

          <div class="summary-card">
            <h1 class="fw-bold"><i class="bi bi-coin"></i> Earnings</h1>
            <span class="fs-4 text-warning">$540.25</span>
            <span class="d-flex justify-content-between align-items-center w-100">
              <small class="text-success fw-bold">12%</small>
              <small class="text-muted fw-bold">Payouts</small>
            </span>
          </div>
        </div>
      </section>

      <section class="charts-section mb-5 el-card-wrapper">
        <h3 class="section-title mb-3">Performance Trends</h3>
        <el-card class="chart-card">
          <div class="chart-header d-flex justify-content-between align-items-center mb-3">
            <h4 class="chart-title mb-0">Clicks & Conversions Over Time</h4>
            <el-date-picker v-model="chartDateRange" type="daterange" range-separator="To" start-placeholder="Start date" end-placeholder="End date" size="small" @change="fetchChartData" class="dashboard-date-picker" />
          </div>
          <div class="chart-container">
            <div v-if="!chartDataLoaded" class="loading-overlay">
              <el-icon class="is-loading"><loading /></el-icon>
              <p>Loading chart data...</p>
            </div>
            <p v-else-if="chartData.labels.length === 0" class="text-muted text-center py-5">No chart data available for selected period.</p>
            <div v-else :id="clicksConversionsChartId" style="width: 100%; height: 300px;"></div>
          </div>
        </el-card>

        <el-card class="chart-card mt-4">
          <div class="chart-header d-flex justify-content-between align-items-center mb-3">
            <h4 class="chart-title mb-0">Earnings Over Time</h4>
          </div>
          <div class="chart-container">
            <div v-if="!chartDataLoaded" class="loading-overlay">
              <el-icon class="is-loading"><loading /></el-icon>
              <p>Loading earnings data...</p>
            </div>
            <p v-else-if="chartData.labels.length === 0" class="text-muted text-center py-5">No earnings data available.</p>
            <div v-else :id="earningsChartId" style="width: 100%; height: 300px;"></div>
          </div>
        </el-card>
      </section>

      <section class="promo-materials-section mb-5 el-card-wrapper">
        <h3 class="section-title mb-3">Promotional Tools</h3>
        <el-row :gutter="20">
          <el-col :md="12" :sm="24" class="mb-4">
            <el-card class="promo-card">
              <div class="card-body">
                <h5 class="card-title"><i class="bi bi-link-45deg me-2"></i>Link Generator</h5>
                <p class="card-text">Quickly create custom tracking links for any product or page on the vendor's site.</p>
                <el-input v-model="linkGeneratorProductId" placeholder="Product ID (Optional)" class="mb-2" />
                <el-button type="primary" size="default" :icon="Link" @click="generateLink">Generate Link</el-button>
                <el-input v-if="generatedLink" v-model="generatedLink" readonly class="mt-3" />
                <el-button v-if="generatedLink" type="text" size="small" @click="copyToClipboard(generatedLink)" class="mt-1">Copy to Clipboard</el-button>
              </div>
            </el-card>
          </el-col>
          <el-col :md="12" :sm="24" class="mb-4">
            <el-card class="promo-card">
              <div class="card-body">
                <h5 class="card-title"><i class="bi bi-image me-2"></i>Banners & Media</h5>
                <p class="card-text">Access pre-designed banners, high-quality images, and video assets to use in your campaigns.</p>
                <el-button type="primary" size="default" :icon="Images" @click="browseMedia">Browse Media</el-button>
              </div>
            </el-card>
          </el-col>
          <el-col :md="12" :sm="24" class="mb-4">
            <el-card class="promo-card">
              <div class="card-body">
                <h5 class="card-title"><i class="bi bi-file-earmark-text me-2"></i>Content Swipes</h5>
                <p class="card-text">Download ready-to-use email swipes, social media posts, and review templates.</p>
                <el-button type="primary" size="default" :icon="Download" @click="downloadContentSwipes">Download Swipes</el-button>
              </div>
            </el-card>
          </el-col>
          <el-col :md="12" :sm="24" class="mb-4">
            <el-card class="promo-card">
              <div class="card-body">
                <h5 class="card-title"><i class="bi bi-bullseye me-2"></i>Offers List</h5>
                <p class="card-text">See all available products and offers you can promote, with commission details.</p>
                <el-button type="primary" size="default" :icon="Grid" @click="$router.push('/customer/offers')">View Offers</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </section>

      <section class="payouts-section mb-5 el-card-wrapper">
        <h3 class="section-title mb-3">Payouts & Earnings</h3>
        <el-row :gutter="20">
          <el-col :lg="8" :md="24" class="mb-4">
            <el-card class="payout-summary-card">
              <h5 class="card-title"><i class="bi bi-wallet-fill me-2"></i>Current Balance</h5>
              <p class="card-value text-success fs-3">${{ payoutsData.currentBalance.toFixed(2) }}</p>
              <small class="text-muted">Minimum Payout Threshold: ${{ payoutsData.minThreshold.toFixed(2) }}</small>
              <div class="mt-3">
                <el-button type="warning" plain size="small" :disabled="payoutsData.currentBalance < payoutsData.minThreshold">Request Payout</el-button>
                <el-button type="info" plain size="small" @click="$router.push('/customer/settings?tab=payout')">Manage Payment Info</el-button>
              </div>
            </el-card>
          </el-col>
          <el-col :lg="16" :md="24" class="mb-4">
            <el-card class="payout-history-card">
              <h5 class="card-title"><i class="bi bi-clock-history me-2"></i>Recent Payouts History</h5>
              <el-table :data="payoutsData.recentPayouts" style="width: 100%" max-height="300" empty-text="No recent payouts.">
                <el-table-column prop="date" label="Date" width="120"></el-table-column>
                <el-table-column prop="amount" label="Amount" width="120">
                  <template #default="scope">${{ scope.row.amount.toFixed(2) }}</template>
                </el-table-column>
                <el-table-column prop="method" label="Method" width="150"></el-table-column>
                <el-table-column prop="status" label="Status">
                  <template #default="scope">
                    <el-tag :type="getPayoutStatusTagType(scope.row.status)">{{ scope.row.status }}</el-tag>
                  </template>
                </el-table-column>
              </el-table>
              <div class="text-end mt-3">
                <el-button link type="primary" @click="$router.push('/customer/commissions')">View All Payouts</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </section>

      <section class="top-offers-section mb-5 el-card-wrapper">
        <h3 class="section-title mb-3">Top Performing Offers</h3>
        <el-card>
          <el-table :data="topOffersData" style="width: 100%" empty-text="No top offers yet.">
            <el-table-column prop="productName" label="Product/Offer"></el-table-column>
            <el-table-column prop="clicks" label="Clicks" sortable width="100"></el-table-column>
            <el-table-column prop="conversions" label="Conversions" sortable width="120"></el-table-column>
            <el-table-column prop="earnings" label="Earnings" sortable width="120">
              <template #default="scope">${{ scope.row.earnings.toFixed(2) }}</template>
            </el-table-column>
            <el-table-column label="Action" width="120">
              <template #default="scope">
                <el-button link type="primary" size="small" @click="copyToClipboard(scope.row.affiliateLink)">Copy Link</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="text-end mt-3">
            <el-button link type="primary" @click="$router.push('/customer/offers')">View All Offers</el-button>
          </div>
        </el-card>
      </section>
    </div>
  </div>
</template>

<script>
import {
  ElCard,
  ElRow,
  ElCol,
  ElButton,
  ElDatePicker,
  ElInput,
  ElMessage,
  ElTable,
  ElTableColumn,
  ElTag,
  ElSelect, // For search bar prepend
  ElOption, // For search bar prepend
  ElDropdown, ElDropdownMenu, ElDropdownItem, // For header dropdowns
  ElIcon, // For loading icon
} from "element-plus";
import { Link, Images, Download, Grid, Loading } from "@element-plus/icons-vue"; // Import Loading icon

import * as echarts from 'echarts'; // Import Echarts library

export default {
  name: "AffiliateDashboard",
  components: {
    ElCard,
    ElRow,
    ElCol,
    ElButton,
    ElDatePicker,
    ElInput,
    ElTable,
    ElTableColumn,
    ElTag,
    ElSelect,
    ElOption,
    ElDropdown, ElDropdownMenu, ElDropdownItem,
    ElIcon, // Register ElIcon
    Link,
    Images,
    Download,
    Grid,
    Loading, // Register Loading icon
  },
  data() {
    return {
      selectOptions: [
        { value: "Login&Security", label: "Login & Security" }, // Fixed label
        { value: "Payments methods", label: "Payments" }, // Fixed label
        { value: "Orders", label: "Orders" },
        { value: "Generate Links", label: "Affiliate Links" }, // Fixed label
      ],
      selected: "Orders", // Default selected value for search
      chartDateRange: [],
      chartDataLoaded: false,
      chartData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        clicks: [100, 150, 120, 180, 200, 170, 220, 190, 250, 230, 280, 260],
        conversions: [5, 8, 6, 10, 12, 9, 11, 10, 13, 12, 15, 14],
        earnings: [50, 75, 60, 90, 100, 85, 110, 95, 125, 115, 140, 130],
      },
      linkGeneratorProductId: "",
      generatedLink: "",
      payoutsData: {
        currentBalance: 125.75,
        minThreshold: 50.0,
        recentPayouts: [
          { date: "2025-06-15", amount: 150.0, method: "PayPal", status: "Paid" },
          { date: "2025-05-30", amount: 200.0, method: "Bank Transfer", status: "Paid" },
          { date: "2025-05-15", amount: 75.5, method: "PayPal", status: "Pending" },
          { date: "2025-04-30", amount: 120.0, method: "Stripe", status: "Paid" },
          { date: "2025-04-15", amount: 90.0, method: "PayPal", status: "Paid" },
        ],
      },
      topOffersData: [
        { productName: "Gaming Laptop X", clicks: 1200, conversions: 30, earnings: 450.0, affiliateLink: "https://yourdomain.com/track/laptop-x?affid=abc" },
        { productName: "Smartwatch Pro", clicks: 800, conversions: 20, earnings: 300.0, affiliateLink: "https://yourdomain.com/track/smartwatch-pro?affid=abc" },
        { productName: "Wireless Earbuds", clicks: 500, conversions: 15, earnings: 200.0, affiliateLink: "https://yourdomain.com/track/earbuds?affid=abc" },
      ],
      // Chart instances to allow for destruction later
      clicksConversionsChartInstance: null,
      earningsChartInstance: null,
    };
  },
  methods: {
    // --- Chart Methods ---
    fetchChartData() {
      this.chartDataLoaded = false;
      console.log("Fetching chart data for range:", this.chartDateRange);

      // Simulate API call for placeholder
      setTimeout(() => {
        this.chartDataLoaded = true;
        this.$nextTick(() => {
          this.renderClicksConversionsChart();
          this.renderEarningsChart();
        });
      }, 1000);
    },
    renderClicksConversionsChart() {
      const chartDom = document.getElementById(this.clicksConversionsChartId);
      if (!chartDom) return;

      // Dispose of existing instance if it exists
      if (this.clicksConversionsChartInstance) {
        echarts.dispose(this.clicksConversionsChartInstance);
      }

      this.clicksConversionsChartInstance = echarts.init(chartDom);
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        legend: {
          data: ['Clicks', 'Conversions']
        },
        xAxis: {
          type: 'category',
          data: this.chartData.labels,
          axisLabel: {
            interval: 0,
            rotate: 30
          }
        },
        yAxis: [
          {
            type: 'value',
            name: 'Clicks',
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: 'Conversions',
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: 'Clicks',
            type: 'bar',
            data: this.chartData.clicks,
            yAxisIndex: 0,
            itemStyle: {
              color: '#409EFF'
            }
          },
          {
            name: 'Conversions',
            type: 'line',
            data: this.chartData.conversions,
            yAxisIndex: 1,
            itemStyle: {
              color: '#67C23A'
            },
            symbol: 'circle', // Show dots on the line
            symbolSize: 8,
          }
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        // dataZoom: [...] (commented out for cleaner initial view, uncomment if needed)
      };
      this.clicksConversionsChartInstance.setOption(option);
      window.addEventListener('resize', () => {
        if (this.clicksConversionsChartInstance) {
          this.clicksConversionsChartInstance.resize();
        }
      });
    },
    renderEarningsChart() {
      const chartDom = document.getElementById(this.earningsChartId);
      if (!chartDom) return;

      // Dispose of existing instance if it exists
      if (this.earningsChartInstance) {
        echarts.dispose(this.earningsChartInstance);
      }

      this.earningsChartInstance = echarts.init(chartDom);
      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            return params[0].name + ': $' + params[0].value.toFixed(2);
          }
        },
        xAxis: {
          type: 'category',
          data: this.chartData.labels,
          axisLabel: {
            interval: 0,
            rotate: 30
          }
        },
        yAxis: {
          type: 'value',
          name: 'Earnings ($)',
          axisLabel: {
            formatter: '${value}'
          }
        },
        series: [{
          name: 'Earnings',
          type: 'line',
          data: this.chartData.earnings,
          smooth: true,
          itemStyle: {
            color: '#E6A23C'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0, color: 'rgba(230,162,60,0.3)'
            }, {
              offset: 1, color: 'rgba(230,162,60,0)'
            }])
          },
          symbol: 'circle', // Show dots on the line
          symbolSize: 8,
        }],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        }
      };
      this.earningsChartInstance.setOption(option);
      window.addEventListener('resize', () => {
        if (this.earningsChartInstance) {
          this.earningsChartInstance.resize();
        }
      });
    },

    // --- Promotional Tools Methods ---
    generateLink() {
      const baseUrl = "https://yourvendorwebsite.com/product/";
      const affiliateId = "your_affiliate_id_here";

      let productPath = this.linkGeneratorProductId ? `${this.linkGeneratorProductId}` : "all-products";
      this.generatedLink = `${baseUrl}${productPath}?ref=${affiliateId}`;
      ElMessage.success("Affiliate link generated!");
    },
    copyToClipboard(text) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          ElMessage.success("Link copied to clipboard!");
        })
        .catch((err) => {
          ElMessage.error("Failed to copy link.");
          console.error("Could not copy text: ", err);
        });
    },
    browseMedia() {
      this.$router.push("/customer/media-library");
      ElMessage.info("Navigating to Media Library...");
    },
    downloadContentSwipes() {
      ElMessage.info("Downloading content swipes...");
    },

    // --- Payouts Methods ---
    getPayoutStatusTagType(status) {
      if (status === "Paid") return "success";
      if (status === "Pending") return "warning";
      return "info";
    },
  },
  computed: {
    // Generate unique IDs for charts to avoid conflicts if component is reused
    clicksConversionsChartId() {
      return 'clicks-conversions-chart-' + Math.random().toString(36).substring(2, 9);
    },
    earningsChartId() {
      return 'earnings-chart-' + Math.random().toString(36).substring(2, 9);
    }
  },
  mounted() {
    // Ensure Echarts is imported before calling this
    this.fetchChartData();
  },
  beforeUnmount() {
    // Dispose chart instances to prevent memory leaks
    if (this.clicksConversionsChartInstance) {
      echarts.dispose(this.clicksConversionsChartInstance);
      this.clicksConversionsChartInstance = null;
    }
    if (this.earningsChartInstance) {
      echarts.dispose(this.earningsChartInstance);
      this.earningsChartInstance = null;
    }
  }
};
</script>

<style scoped>
/* Base container for the whole dashboard content */
.affiliate-dashboard-container {
  background-color: #f5f7fa; /* Light background for the overall dashboard area */
  min-height: 100vh; /* Ensure it takes full viewport height */
  padding: 20px; /* Overall padding */
}

/* --- Dashboard Header (Search, Notifications, Account) --- */
.dashboard-header {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 15px 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
}

.dashboard-header-icon {
  font-size: 24px;
  color: #409eff; /* Primary color for icons */
  cursor: pointer;
}

.header-search-input {
  max-width: 900px; /* Constrain width for larger screens */
}

.header-account-controls .el-dropdown {
  cursor: pointer;
}

.header-icon-link {
  color: #606266; /* Default color for dropdown triggers */
  font-size: 24px;
  text-decoration: none; /* Remove underline for links */
}
.header-icon-link:hover {
  color: #409eff; /* Hover color */
}

.dropdown-item-link {
  color: #606266;
  font-weight: 500;
  text-decoration: none;
  display: flex; /* For icon alignment */
  align-items: center;
}
.dropdown-item-link:hover {
  color: #409eff; /* El-Plus primary */
}
.dropdown-item-icon {
  font-size: 15px;
  color: #606266; /* Match link color */
  margin-right: 8px;
}
/* Ensure hr line is styled within El-Dropdown-Menu */
.el-dropdown-menu .my-1 {
  border-top: 1px solid #EBEEF5; /* Element-Plus border color */
  margin: 5px 0;
}


/* --- Main Dashboard Content Area (excluding the header) --- */
.affiliate-dashboard {
  padding: 0 10px; /* Reduced padding here as outer container has padding */
  color: #333;
}

.dashboard-title {
  font-size: 2.5em;
  font-weight: 700;
  color: #303133;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 15px;
  margin-bottom: 30px;
}

.section-title {
  font-size: 1.8em;
  font-weight: 600;
  color: #404040;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

/* --- Summary Blocks Section --- */
.summary-blocks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Responsive columns */
  gap: 25px; /* Space between cards */
}

.summary-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* Soft shadow */
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  display: flex; /* Make content aligned easily */
  flex-direction: column; /* Stack content vertically */
  justify-content: space-between; /* Distribute space */
  align-items: flex-start; /* Align content to start */
  min-height: 180px; /* Give it a minimum height */
}

.summary-card:hover {
  transform: translateY(-5px); /* Slight lift on hover */
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.summary-card h1 {
  font-size: 1.5em;
  font-weight: bold;
  color: #303133;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap; /* Prevent text wrapping */
}

.summary-card h1 i {
  font-size: 1.2em;
  color: #e51748; /* Accent color for main icons */
}

.summary-card .fs-4 {
  font-size: 1.8em !important; /* Larger value */
  font-weight: 700;
  margin-bottom: 10px;
  display: block;
}

.summary-card .w-100 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: auto; /* Push to bottom */
}
.summary-card .w-100 small {
    font-size: 0.9em;
}


/* --- Charts Section --- */
.chart-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 20px;
  position: relative;
}
.chart-header {
  flex-wrap: wrap;
  gap: 15px;
}
.chart-title {
  font-size: 1.2em;
  color: #404040;
}
.chart-container {
  min-height: 300px; /* Ensure enough height for chart */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  border-radius: 12px;
}
.loading-overlay .el-icon {
  font-size: 3em;
  color: #409eff;
}
.loading-overlay p {
  margin-top: 10px;
  color: #606266;
}

/* --- Promotional Materials Section --- */
.promo-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 25px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.promo-card .card-title {
  font-size: 1.3em;
  font-weight: 600;
  color: #404040;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.promo-card .card-text {
  color: #606266;
  margin-bottom: 15px;
  flex-grow: 1;
}
.promo-card .el-button {
  align-self: flex-start;
  width: auto;
}
.promo-card .el-input {
  width: 100%;
}

/* --- Payouts Section --- */
.payout-summary-card, .payout-history-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 25px;
  height: 100%;
}
.payout-summary-card .card-title {
  font-size: 1.2em;
  font-weight: 600;
  color: #404040;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.payout-summary-card .card-value {
  font-size: 2.5em;
  font-weight: 700;
  margin-bottom: 5px;
  display: block;
}
.payout-history-card .card-title {
  font-size: 1.3em;
  font-weight: 600;
  color: #404040;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}
.payout-history-card .el-table {
  border-radius: 8px;
}

/* --- Top Offers Section --- */
.top-offers-section .el-table {
  border-radius: 8px;
}

/* --- Basic Bootstrap-like utility classes (ensure your main bootstrap.css is loaded) --- */
.text-success { color: #67c23a !important; }
.text-danger { color: #f56c6c !important; }
.text-primary { color: #409eff !important; }
.text-info { color: #909399 !important; }
.text-warning { color: #e6a23c !important; }
.text-muted { color: #909399 !important; }

/* --- Responsive Adjustments --- */
@media (max-width: 1200px) { /* Adjust search bar width for smaller laptops */
  .header-search-input {
    width: 600px !important;
  }
}

@media (max-width: 992px) { /* Tablets and smaller laptops */
  .dashboard-header {
    padding: 15px 20px;
  }
  .header-search-input {
    width: 400px !important; /* Further reduce search bar width */
  }
  .affiliate-dashboard-container {
    padding: 15px;
  }
  .dashboard-title {
    font-size: 2.2em;
  }
  .section-title {
    font-size: 1.6em;
  }
  .summary-blocks-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); /* Adjust min-width */
    gap: 20px;
  }
}

@media (max-width: 768px) { /* Smaller tablets and mobile phones */
  .dashboard-header {
    display: none !important; /* Hide full header on mobile, should be replaced by mobile-specific header */
  }
  .affiliate-dashboard {
    padding: 0; /* Remove padding here, outer container already has it */
  }
  .dashboard-title {
    font-size: 2em;
    text-align: center;
    margin-bottom: 20px;
  }
  .section-title {
    font-size: 1.4em;
    text-align: center;
  }
  .summary-blocks-grid {
    grid-template-columns: 1fr; /* Stack blocks vertically */
    gap: 15px;
  }
  .el-col[class*="el-col-"] { /* Make all columns stack on mobile */
    max-width: 100%;
    flex: 0 0 100%;
  }
  .el-col.mb-4 { /* Add vertical spacing when columns stack */
    margin-bottom: 15px;
  }
  .chart-card, .promo-card, .payout-summary-card, .payout-history-card {
    padding: 15px;
  }
  .chart-header {
    flex-direction: column; /* Stack chart title and date picker */
    align-items: flex-start;
    gap: 10px;
  }
  .chart-title {
    margin-bottom: 0; /* Already has gap from parent */
  }
  .dashboard-date-picker {
    width: 100%; /* Make date picker full width */
  }
  .payout-summary-card .card-value {
    font-size: 2em;
  }
}

@media (max-width: 576px) { /* Very small phones */
  .dashboard-title {
    font-size: 1.8em;
  }
  .section-title {
    font-size: 1.3em;
  }
  .promo-card .el-button {
    width: 100%; /* Make buttons full width */
  }
}
</style>