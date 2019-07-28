<template>
  <b-modal :id="id" ref="modal" centered hide-footer hide-header>
    <div class="p-3">
      <div class="mb-4 text-center">
        <h3 class="font-weight-bold mb-4">{{ edit ? 'Edit' : 'New' }} Subscriber</h3>
      </div>

      <div class="mb-3">
        <label-component for="subscriber-email" text="Email Address"></label-component>

        <input-component
          id="subscriber-email"
          name="subscriber-email"
          placeholder="Enter email address"
          :input-class="{ 'border-danger text-danger': errors.has('subscriber-email') }"
          v-validate="'required|email'"
          v-model="name"
          required
        ></input-component>

        <span class="d-block mt-2 text-danger" v-text="errors.first('email')" v-if="name.length > 0"></span>
      </div>

      <div class="mb-4">
        <label-component for="subscriber-interval" text="Interval"></label-component>

        <select-component :options="intervals" v-model="interval" @input="val => interval = val" />
      </div>

      <div class="row">
        <div class="col text-left">
          <button
            type="button"
            class="btn btn-primary btn-md rounded-pill text-uppercase w-100"
            @click="handleSubmit"
          >Add</button>
        </div>

        <div class="col text-right">
          <button
            type="submit"
            class="btn btn-secondary btn-md rounded-pill text-uppercase w-100"
            @click="() => $emit('close')"
          >Cancel</button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

import InputComponent from '@/components/FormElements/InputComponent.vue';
import LabelComponent from '@/components/FormElements/LabelComponent.vue';
import SelectComponent from '@/components/FormElements/SelectComponent.vue';

@Component({
  components: {
    InputComponent,
    LabelComponent,
    SelectComponent,
  },
})
export default class CreateSubscriber extends Vue {
  @Prop(String) public readonly id;
  @Prop(Boolean) public readonly edit;
  @Prop() public readonly init;

  private name: string = '';
  private intervals: any[] = [
    {
      text: 'Daily',
      value: 'DAILY',
    },
    {
      text: 'Weekly',
      value: 'WEEKLY',
    },
    {
      text: 'Monthly',
      value: 'MONTHLY',
    },
  ];
  private interval: string = '';

  private handleSubmit() {
    const promises: any = [];
    promises.push(this.$validator.validateAll());

    Promise.all(promises).then((validations) => {
      // If one validation has failed, we stop here
      if (validations.some((validation) => validation === false)) { return; }

      this.$emit('input', {
        email: this.name,
        interval: this.interval,
      });

      this.name = '';
      this.interval = '';
    });
  }

  @Watch('edit')
  private onEditChanged() {
    if (this.edit === true) {
      this.$set(this, 'name', this.init.email);
      this.$set(this, 'interval', this.init.interval);
    }
  }
}
</script>
