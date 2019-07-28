<template>
  <b-modal :id="id" ref="modal" body-class="p-0" size="xl" centered hide-footer hide-header>
    <div class="bg-light">
      <div class="jumbotron">
        <div id="event-background" :style="{ 'background-image': 'url(' + event.backgroundImage + ')' }"></div>
        
        <div id="event-header">
          <div class="row">
            <div class="col mb-4 ml-2 text-left">
              <img class="event-logo" :src="event.ownerLogo" />
            </div>
          </div>

          <div class="bg-white p-3" style="border-radius: 10px;">
            <div class="row">
              <div class="col-md">
                <p class="font-weight-semibold mb-1 text-muted text-uppercase">Impact Project Presents</p>
                <h4 class="font-weight-semibold mb-0">Back to the Ballpark 2019</h4>
              </div>
          
              <div class="col-md d-flex align-items-center justify-content-end">
                <button
                  type="button"
                  class="btn btn-primary btn-get-tickets font-weight-semibold rounded-pill text-uppercase"
                  disabled
                >Get Tickets</button>
              </div>
            </div>

            <hr />
            
            <div class="row">
              <div class="col-md d-flex align-items-center">
                <span class="d-inline-block mr-4">
                  <img src="@/assets/icons/calender-time.svg" />
                  <span class="font-weight-semibold ml-2">Sat, Aug 31 3:00 PM</span>
                </span>

                <span class="d-inline-block mr-4">
                  <img src="@/assets/icons/currency.svg" />
                  <span class="font-weight-semibold ml-2">$0 - $20</span>
                </span>
                
                <span class="d-inline-block">
                  <img src="@/assets/icons/location-pin.svg" />
                  <span class="font-weight-semibold ml-2">Globelife Park Stadium</span>
                </span>
              </div>
              
              <div class="col-md text-right">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-donate-now font-weight-semibold rounded-pill text-uppercase"
                  disabled
                >Donate Now</button>
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
                <img class="mb-3" :src="event.backgroundImage" />
      
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
                <a class="mr-2" href="#">
                  <img src="@/assets/icons/facebook.svg" />
                </a>
          
                <a class="mr-2" href="#">
                  <img src="@/assets/icons/twitter.svg" />
                </a>
          
                <a class="mr-2" href="#">
                  <img src="@/assets/icons/linkedin.svg" />
                </a>
          
                <a class="mr-2" href="#">
                  <img src="@/assets/icons/mail.svg" />
                </a>
              </div>
            </div>
          
            <div class="text-center">
              <button
                type="button"
                class="btn btn-outline-primary btn-lg rounded-pill font-weight-semibold mt-3"
                disabled
              >Contact Promoter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class EventPreviewModalComponent extends Vue {
  public $refs!: {
    modal: any;
  };

  @Prop(Object) public readonly event!: object;
  @Prop(String) public readonly id!: string;
}
</script>

<style lang="scss" scoped>
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
</style>