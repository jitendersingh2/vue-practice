<template>
  <div>
    <b-table
      table-class="table-attendees-list"
      :responsive="true"
      :items="attendees"
      :fields="fields"
      small
      borderless
    >
      <template slot="attendee" slot-scope="data">
        <div class="font-weight-semibold">{{data.item.firstName + ' ' + data.item.lastName}}</div>
        <div class="text-success" style="font-size: 10px;">{{data.item.ticketNumber}}</div>
      </template>

      <template slot="actions" slot-scope="data">
        <span class="edit-btn" @click="() => hideAttendeeRow(data)">Edit</span>
      </template>

      <template slot="row-details" slot-scope="data">
        <!-- <div class="attendee-row-edit"> -->
        <input
          class="form-custom form-control rounded-pill"
          id="first-name"
          placeholder="First name"
          v-model="data.item.editedAttendee.firstName"
        />
        <input
          class="form-custom form-control rounded-pill"
          id="last-name"
          placeholder="Last name"
          v-model="data.item.editedAttendee.lastName"
        />
        <input
          class="form-custom form-control rounded-pill"
          id="company"
          placeholder="Company"
          v-model="data.item.editedAttendee.company"
        />
        <input
          class="form-custom form-control rounded-pill"
          :class="{ 'border-danger text-danger': errors.has('attendee-email') }"
          id="email"
          name="attendee-email"
          placeholder="Email"
          v-validate="'email'"
          v-model="data.item.editedAttendee.email"
        />
        <span class="update-row">
          <i class="fas fa-check" @click="() => updateAttendeeDetails(data)"></i>
        </span>
        <span class="cancel-row">
          <i class="fas fa-times" @click="() => cancelAttendeeDetails(data)"></i>
        </span>
        <!-- </div> -->
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AttendeesListComponent extends Vue {
  private attendeesList: any = [
    {
      id: 1,
      ticket: 'General Child',
      ticketDate: 'Sat,Jun 29, 2019',
      price: '$25.00',
      tax: '$0.00',
      total: '$25.00',
      firstName: 'Jared',
      lastName: 'Waters',
      company: 'XYZ',
      email: 'xyz@abc.com',
      ticketNumber: 'A53467TRHJ90DD',
      editedAttendee: {
        firstName: 'Jared',
        lastName: 'Waters',
        company: 'XYZ',
        email: 'xyz@abc.com',
      },
    },
    {
      id: 2,
      ticket: 'General Child',
      ticketDate: 'Sat,Jun 29, 2019',
      price: '$25.00',
      tax: '$0.00',
      total: '$25.00',
      firstName: 'Jared',
      lastName: 'Waters',
      company: 'XYZ',
      email: 'xyz@abc.com',
      ticketNumber: 'A53467TRHJ90DD',
      editedAttendee: {
        firstName: 'Jared',
        lastName: 'Waters',
        company: 'XYZ',
        email: 'xyz@abc.com',
      },
    },
    {
      id: 3,
      ticket: 'General Child',
      ticketDate: 'Sat,Jun 29, 2019',
      price: '$25.00',
      tax: '$0.00',
      total: '$25.00',
      firstName: 'Jared',
      lastName: 'Waters',
      company: 'XYZ',
      email: 'xyz@abc.com',
      ticketNumber: 'A53467TRHJ90DD',
      editedAttendee: {
        firstName: 'Jared',
        lastName: 'Waters',
        company: 'XYZ',
        email: 'xyz@abc.com',
      },
    },
    {
      id: 4,
      ticket: 'General Child',
      ticketDate: 'Sat,Jun 29, 2019',
      price: '$25.00',
      tax: '$0.00',
      total: '$25.00',
      firstName: 'Jared',
      lastName: 'Waters',
      company: 'XYZ',
      email: 'xyz@abc.com',
      ticketNumber: 'A53467TRHJ90DD',
      editedAttendee: {
        firstName: 'Jared',
        lastName: 'Waters',
        company: 'XYZ',
        email: 'xyz@abc.com',
      },
    },
    {
      id: 5,
      ticket: 'General Child',
      ticketDate: 'Sat,Jun 29, 2019',
      price: '$25.00',
      tax: '$0.00',
      total: '$25.00',
      firstName: 'Jared',
      lastName: 'Waters',
      company: 'XYZ',
      email: 'xyz@abc.com',
      ticketNumber: 'A53467TRHJ90DD',
      editedAttendee: {
        firstName: 'Jared',
        lastName: 'Waters',
        company: 'XYZ',
        email: 'xyz@abc.com',
      },
    },
  ];
  private fields = [
    {
      key: 'attendee',
      label: 'Attendee',
      sortable: false,
    },
    {
      key: 'ticket',
      label: 'Ticket',
      sortable: false,
    },
    {
      key: 'ticketDate',
      label: 'Ticket Date',
      sortable: false,
    },
    {
      key: 'price',
      label: 'Price',
      sortable: false,
    },
    {
      key: 'tax',
      label: 'Tax',
      sortable: false,
    },
    {
      key: 'total',
      label: 'Total',
      sortable: false,
    },
    {
      key: 'actions',
      label: '',
      sortable: false,
    },
  ];
  private attendees = [...this.attendeesList];

  private hideAttendeeRow(row) {
    row.toggleDetails();
    row.item._rowVariant = 'hidden';
  }

  private showAttendeeRow(row) {
    row.toggleDetails();
    row.item._rowVariant = 'display';
  }

  private updateAttendeeDetails(row) {
    const promises: any = [];
    promises.push(this.$validator.validateAll());

    Promise.all(promises).then((validations) => {
      // If one validation has failed, we stop here
      if (validations.some((validation) => validation === false)) { return; }

      this.showAttendeeRow(row);
      const updatedAttendee = { ...row.item, ...row.item.editedAttendee };
      this.updateAttendee(updatedAttendee, 'save');
    });
  }

  private cancelAttendeeDetails(row) {
    this.showAttendeeRow(row);
    const updatedAttendee = { ...row.item, ...row.item.editedAttendee };
    this.updateAttendee(updatedAttendee, 'cancel');
  }

  private updateAttendee(updatedAttendee, type) {
    this.attendees = this.attendeesList.map((attendee) => {
      if (attendee.id === updatedAttendee.id) {
        if (type === 'save') {
          attendee = updatedAttendee;
        } else if (type === 'cancel') {
          attendee.editedAttendee = {
            firstName: attendee.firstName,
            lastName: attendee.lastName,
            company: attendee.company,
            email: attendee.email,
          };
        }
      }
      return attendee;
    });
  }
}
</script>

<style lang="scss">
.table-attendees-list {
  overflow-y: visible;

  td,
  th {
    font-size: 14px !important;
    padding: 0.3rem;
    vertical-align: middle !important;
  }

  td {
    border-top: 1px solid #388cd0 !important;
  }

  th {
    border-top: none !important;
  }

  .form-custom {
    display: initial !important;
    width: 20% !important;
    margin-right: 5px;
    font-weight: 600;
  }

  .update-row {
    color: #45af71;
    padding-left: 20px;
    font-size: 16px;
    cursor: pointer;
  }

  .cancel-row {
    color: rgba(0, 0, 0, 0.3);
    padding-left: 20px;
    font-size: 16px;
    cursor: pointer;
  }

  .edit-btn {
    padding: 2px 10px;
    background: #2284c3;
    border-radius: 6px;
    color: #fff;
    cursor: pointer;
    font-size: 12px;
  }
}
</style>
