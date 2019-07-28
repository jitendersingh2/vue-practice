<template>
  <div>
    <div id="main" class="site-content bg-light">
      <div class="jumbotron">
        <div id="event-background" :style="{ backgroundImage: 'url(' + event.backgroundImage + ')' }"></div>
        <div id="event-header">
          <div class="row">
            <div class="col mb-4 ml-2 text-left">
              <img class="event-logo" :src="event.ownerLogo">
            </div>
          </div>
          <div class="bg-white p-3" style="border-radius: 10px;">
            <div class="row">
              <div class="col-md">
                <p class="font-weight-semibold mb-1 text-muted text-uppercase">Impact Project Presents</p>
                <h4 class="font-weight-semibold mb-0">Back to the Ballpark 2019</h4>
              </div>
              <div class="col-md d-flex align-items-center justify-content-end">
                <button type="button" class="btn btn-primary btn-get-tickets font-weight-semibold rounded-pill text-uppercase" v-b-modal.register-event-tickets-modal>Get Tickets</button>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-md d-flex align-items-center">
                <span class="d-inline-block mr-4">
                  <img src="@/assets/icons/calender-time.svg">
                  <span class="font-weight-semibold ml-2">Sat, Aug 31 3:00 PM</span>
                </span>
                <span class="d-inline-block mr-4">
                  <img src="@/assets/icons/currency.svg">
                  <span class="font-weight-semibold ml-2">$0 - $20</span>
                </span>
                <span class="d-inline-block">
                  <img src="@/assets/icons/location-pin.svg">
                  <span class="font-weight-semibold ml-2">Globelife Park Stadium</span>
                </span>
              </div>
              <div class="col-md text-right">
                <button type="button" class="btn btn-outline-primary btn-donate-now font-weight-semibold rounded-pill text-uppercase">Donate Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="event-info">
        <div class="row">
          <div class="col-md-8">
            <div class="bg-white" style="border-radius: 10px;">
              <div class="border-bottom py-3 px-4">
                <h5 class="font-weight-semibold">Details</h5>
                <p>Come join us for a night at the ole ballpark. We'll cheer on the Rangers as they launch a new season</p>
                <img class="mb-3" :src="event.backgroundImage">
                <p>
                  <a href="#">Be sure to create your own personal fundraising page to support Caleb's Kids</a>
                </p>
                
                <p>Now that's how to catch a baseball at a major league game...</p>
                <p>But be nice and consider fans around you or this can <a href="#">happen</a></p>
              </div>
              <div class="py-3 px-4">
                <div class="row">
                  <div class="col-md-6">
                    <h5 class="font-weight-semibold">Terms &amp; Conditions</h5>
                    <p class="tac-paragraph">Minimum purchase of 2 tickets; maximum purchase of 6 tickets. General admission seats on the first base side.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md">
            <div class="bg-white py-3 px-4 mb-4" style="border-radius: 10px;">
              <h5 class="font-weight-bold">Location</h5>
              <p class="font-weight-semibold mb-1">Globelife Park Stadium</p>
              <p>2500 Ballpark Way, Arlington, TX, United States</p>
            </div>
            <div class="bg-white py-3 px-4" style="border-radius: 10px;">
              <h5 class="font-weight-bold">Share</h5>
              <div class="social-icons d-flex align-items-center">
                <a class="mr-2" href="#"><img src="@/assets/icons/facebook.svg"></a>
                <a class="mr-2" href="#"><img src="@/assets/icons/twitter.svg"></a>
                <a class="mr-2" href="#"><img src="@/assets/icons/linkedin.svg"></a>
                <a class="mr-2" href="#"><img src="@/assets/icons/mail.svg"></a>
              </div>
            </div>
            <div class="text-center">
              <button type="button" class="btn btn-outline-primary btn-lg rounded-pill font-weight-semibold mt-3" v-b-modal.event-contact-promoter-modal>Contact Promoter</button>
            </div>
          </div>
        </div>
      </div>
      <div id="event-sponsors">
        <div class="row">
          <div class="col">
            <div class="bg-white py-3 px-4 mb-4" style="border-radius: 10px;">
              <h5 class="font-weight-semibold text-center mb-4">Thank you to our sponsors</h5>
              <div class="sponsors">
                <h6 class="sponsor-tier-1 tier-heading bg-white text-center text-muted text-uppercase">Sponsor Tier 1</h6>
              
                <div class="sponsors-list mb-4">
                  <div class="sponsor">
                    <a href="#" class="d-block h-100">
                      <img src="@/assets/images/sponsor-1.png">
                      <span class="font-weight-semibold d-block">Salesforce</span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="sponsors">
                <h6 class="sponsor-tier-1 tier-heading bg-white text-center text-muted text-uppercase">Sponsor Tier 2</h6>
              
                <div class="sponsors-list mb-4">
                  <div class="sponsor">
                    <a href="#" class="d-block h-100">
                      <img src="@/assets/images/sponsor-2.png">
                      <span class="font-weight-semibold d-block">Lilly Oncology</span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="sponsors">
                <h6 class="sponsor-tier-1 tier-heading bg-white text-center text-muted text-uppercase">Sponsor Tier 3</h6>
              
                <div class="sponsors-list mb-4">
                  <div class="sponsor">
                    <a href="#" class="d-block h-100">
                      <img src="@/assets/images/sponsor-3.png">
                      <span class="font-weight-semibold d-block">Eisai</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="powered-by">
        <img src="@/assets/icons/powered-by.svg">
      </div>
    </div>

    <event-contact-promoter-modal-component
      id="event-contact-promoter-modal"
      :eventId="$route.params.eventId"
    ></event-contact-promoter-modal-component>

    <register-event-tickets-modal-component
      id="register-event-tickets-modal"
      :eventId="$route.params.eventId"
    ></register-event-tickets-modal-component>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import EventContactPromoterModalComponent from '@/components/Events/EventContactPromoterModalComponent.vue';
import RegisterEventTicketsModalComponent from '@/components/Events/Tickets/RegisterEventTicketsModalComponent.vue';

@Component({
  components: {
    EventContactPromoterModalComponent,
    RegisterEventTicketsModalComponent,
  },
})
export default class EventPreview extends Vue {
  private event = {
    backgroundImage: require('@/assets/images/demo-event-background.jpeg'),
    ownerLogo: require('@/assets/images/demo-event-owner-logo.png'),
  };
}
</script>
<style lang="scss" scoped>
.site-content {
  min-height: 100vh;
}
.jumbotron {
  min-height: 300px;
  position: relative;
  #event-background {
    border-radius: 0 0 15px 15px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    overflow: hidden;
    &::after {
      content: '';
      background-color: rgba(0, 0, 0, 0.6);
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
    }
  }
  #event-header {
    position: relative;
    top: 140px;
    .event-logo {
      max-width: 160px;
    }
    .btn-get-tickets {
      font-size: 18px;
      line-height: 21px;
      padding: 15px 30px;
    }
    .btn-donate-now {
      line-height: 21px;
      padding: 10px 20px;
    }
  }
}
#event-info {
  padding: 4rem 2rem 1rem;
  img {
    max-width: 460px;
    width: 100%;
  }
  .tac-paragraph {
    font-size: 12px;
  }
}
#event-sponsors {
  padding: 1rem 2rem 0;
  .sponsors {
    border-top: 2px solid #D0D2D4;
    text-align: center;
    .tier-heading {
      display: inline-block;
      padding: 5px 10px;
      position: relative;
      top: -15px;
    }
    .sponsors-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .sponsor {
      margin: 20px 15px;
      max-height: 90px;
      img {
        height: 100%;
      }
    }
  }
}
#powered-by {
  padding: 0 2rem 1rem;
}
</style>