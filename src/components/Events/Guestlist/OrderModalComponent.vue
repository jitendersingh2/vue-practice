<template>
  <b-modal :id="id" ref="modal" centered hide-footer hide-header modal-class="guest-list-class">
    <b-col cols="12" md="auto" class="modal-title py-2 text-center">
      <h3 class="font-weight-semibold">Survey Answers</h3>
    </b-col>

    <form action="#" @submit.prevent="submitForm(index)">
      <div v-for="(items, index) in ticket.details" :index="index" :key="index">
        <b-form-row class="survey-form">
          <div class="form-data w-100">
            <b-col class="mb-3">
              <label for="input-small" class="font-weight-semibold">{{ index + 1 }}. {{ items.que }}</label>
              
              <b-form-group>
                <b-form-textarea
                  v-if="items.type === 'textarea'"
                  v-model="items.ans"
                  name="textareas"
                  value="notes"
                  placeholder="Enter your note"
                ></b-form-textarea>

                <b-form-radio-group
                  v-if="items.type === 'radio'"
                  v-model="items.ans"
                  :options="multiChoices"
                  stacked
                  name="radio-options"
                ></b-form-radio-group>

                <v-select
                  v-if="items.type === 'dropdown'"
                  v-model="items.ans"
                  name="dropdown"
                  :options="multiChoiceDropdown"
                />

                <b-form-checkbox-group
                  v-if="items.type === 'checkbox'"
                  v-model="items.ans"
                  name="checked"
                  stacked
                  :options="checkboxOptions"
                ></b-form-checkbox-group>
              </b-form-group>
            </b-col>
          </div>
        </b-form-row>
      </div>

      <b-row class="mt-5 survey-form text-center">
        <b-col>
          <b-button pill type="submit" class="font-weight-semibold w-100" variant="primary">Update</b-button>
        </b-col>

        <b-col>
          <b-button
            pill
            variant="light"
            class="btn-grey font-weight-semibold w-100"
            @click="$refs['modal'].hide()"
          >Cancel</b-button>
        </b-col>
      </b-row>
    </form>
  </b-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import vSelect from 'vue-select';

@Component({
  components: {
    vSelect,
  },
})
export default class OrderModalComponent extends Vue {
  @Prop(String) public readonly id!: string;
  @Prop(Object) public readonly ticket!: object;
  @Prop(Number) public readonly ticketIndex!: number;

  private multiChoices = [
    { text: 'Pizza', value: 'pizza' },
    { text: 'Hamburger', value: 'hamburger' },
    { text: 'Burger', value: 'burger' },
  ];

  private multiChoiceDropdown = [
    { label: 'S', text: 'S' },
    { label: 'M', text: 'M' },
    { label: 'L', text: 'L' },
    { label: 'XL', text: 'XL' },
  ];

  private checkboxOptions = [
    { text: 'Splendor', value: 'Splendor' },
    { text: 'Hero', value: 'Hero' },
    { text: 'Pletina', value: 'Pletina' },
  ];

  private submitForm(i) {
    // TODO: Save the form ...
  }
}
</script>

<style>
.guest-list-class .modal-content{
  border-radius: 25px !important;
  max-height: 400px !important;
  overflow-x: hidden !important;
  overflow-y: scroll !important;
  padding: 0px 10px !important;
}
</style>
