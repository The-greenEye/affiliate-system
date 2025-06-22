<template>
  <div>
    <el-menu @mouseenter="isCollapse = false" @mouseleave="isCollapse = true" default-active="dashboard" class="el-menu-vertical-demo d-none d-lg-block z-2" :collapse="isCollapse" @open="handleOpen" @close="handleClose" router="true">
      <el-menu-item index="/">
        <i class="bi bi-person-circle"></i>
        <template #title class="d-flex justify-content-between">
          <span v-if="!isCollapse">Affiliate System</span>
          <el-tag :type="userData.accountState == true ? 'success' : 'danger'">{{ userData.accountState == true ? 'Active' : 'Unactive' }}</el-tag>
        </template>
      </el-menu-item>

      <el-menu-item index="/dashboard">
        <i class="bi bi-house-fill menu-icon"></i>
        <template #title>Dashboard</template>
      </el-menu-item>

      <el-sub-menu index="/affiliate-links">
        <template #title>
          <i class="bi bi-link-45deg menu-icon"></i>
          <span>Affiliate Links</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/customer/offers">Available Offers</el-menu-item>
          <el-menu-item index="/customer/create-link">Create Custom Link</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>

      <el-menu-item index="/customer/reports">
        <i class="bi bi-graph-up menu-icon"></i>
        <template #title>Performance Reports</template>
      </el-menu-item>

      <el-menu-item index="/customer/commissions">
        <i class="bi bi-wallet-fill menu-icon"></i>
        <template #title>Commissions & Payouts</template>
      </el-menu-item>

      <el-menu-item index="/customer/settings">
        <i class="bi bi-person-fill menu-icon"></i>
        <template #title>Settings</template>
      </el-menu-item>
      <hr />
      <el-menu-item index="/customer/settings">
        <i class="bi bi-box-arrow-right text-danger"></i>
        <template #title>Logout</template>
      </el-menu-item>
    </el-menu>
    <!-- Mobil -->
    <div class="d-lg-none d-flex justify-content-between align-items-center p-3 bg-white" style="width: 100vw">
      <img src="https://kolshy.ae/wp-content/uploads/2025/02/Untitled-3000-x-750-px.gif" width="150" class="img-fluid" />
      <el-dropdown placement="bottom">
        <div class="d-flex flex-column position-relative">
        <img :src="userData.image" class="ing-fluid rounded-circle" width="50" height="50" />
        <el-tag round class="position-absolute" style="bottom: -10px;right: 2px" :type="userData.accountState == true ? 'success' : 'danger'">{{ userData.accountState == true ? 'Active' : 'Unactive' }}</el-tag>
      </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Acount Setting</el-dropdown-item>
            <el-dropdown-item index="/customer/links">Affiliate Links</el-dropdown-item>
            <el-dropdown-item index="">Available Offers</el-dropdown-item>
            <el-dropdown-item index="">Create Custom Link</el-dropdown-item>
            <el-dropdown-item index="">Performance Reports</el-dropdown-item>
            <el-dropdown-item index="">Commissions & Payouts</el-dropdown-item>
            <hr />
            <el-dropdown-item class="text-danger">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      isCollapse: true,
      userData: {
        image: "https://avatars.githubusercontent.com/u/114336626?v=4?s=400",
        name: "kolshy system",
        type: "Affiliate Customer",
        accountState: true,
      },
    };
  },
};
</script>

<style>
.el-menu-vertical-demo {
  height: 100vh;
  font-weight: 600;
}
i {
  font-weight: bold;
  font-size: 30px;
  margin: 0 15px 0 0;
  color: #e51748;
  font-style: oblique;
  text-align: center;
}
</style>
