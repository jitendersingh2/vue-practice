<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <h1 class="navbar-brand mb-0">
      <a class="brand-logo align-middle d-inline-block" href="#">
        <img src="@/assets/images/idonate-logo.png" height="25px">
      </a>

      <span
        class="align-middle d-none d-sm-inline-block font-weight-bold text-light"
      >Organization Name</span>
    </h1>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navigation-top"
      aria-controls="navigation-top"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navigation-top">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle text-white"
            href="#"
            id="profile-dropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >User Name</a>

          <div class="dropdown-menu border-0 shadow-sm" aria-labelledby="profile-dropdown">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
          </div>
        </li>

        <li class="nav-item">
          <a class="nav-link text-white" href="#">
            <span class="d-none d-lg-block notification-icon">
              <img src="@/assets/icons/notification.svg" alt="notification">
              <span class="notification-count">4</span>
            </span>

            <span class="d-lg-none">Notification</span>
          </a>
        </li>

        <li class="d-lg-none" v-for="(item, index) in items" :index="index" :key="item.name">
          <a class="nav-link text-white" href="#" v-text="item.name"></a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

interface INavItem {
  name: string;
}

@Component
export default class NavbarComponent extends Vue {
  private items: INavItem[] = [
    {
      name: 'Dashboard',
    },
    {
      name: 'Donations',
    },
    {
      name: 'Campaigns',
    },
    {
      name: 'Embeds',
    },
    {
      name: 'Goal Meter',
    },
    {
      name: 'Peer-To-Peer',
    },
    {
      name: 'Landing Pages',
    },
    {
      name: 'Text',
    },
    {
      name: 'Reconciliation',
    },
    {
      name: 'Events',
    },
    {
      name: 'Organization',
    },
    {
      name: 'Help',
    },
  ];
}
</script>

<style lang="scss" scoped>
.brand-logo {
  img {
    margin-top: -8px;
  }

  + span {
    margin-left: 125px;
  }
}

.notification-icon {
  position: relative;

  img {
    width: 20px;
  }

  .notification-count {
    background: #f20f0f;
    border-radius: 10px;
    display: block;
    font-size: 12px;
    height: 18px;
    line-height: 18px;
    min-width: 18px;
    position: absolute;
    right: -6px;
    top: -8px;
    text-align: center;
  }
}
</style>
