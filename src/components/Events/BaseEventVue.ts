import { Vue } from 'vue-property-decorator';
import IEventData from '@/api/model/IEventData';
import BaseVue from '@/components/BaseVue';

export default class BaseEventVue extends BaseVue {
    protected ERROR_UPDATE_PATH: string = 'data.event.update.errors';
    protected event = new IEventData();

    public onPageCreated(page) {
        const previousPage = this.$store.getters.eventPage;
        this.$store.commit('eventPage', page);
    }

    public updateEventDontProceed(res: any, errorPath: string = 'data.event.update.errors') {
        const errors = BaseVue.getValueFromPath(res, errorPath);
        const gqlErrors = BaseVue.getValueFromPath(res, 'errors');
        if (errors && errors.length > 0) {
          this.$msgbox(errors, 'Errors');
        } else if (gqlErrors && gqlErrors.length > 0) {
            this.$msgbox(gqlErrors, 'System Errors');
        }
    }

    public updateEventAndProceed(route: string, res: any, errorPath: string = 'data.event.update.errors', params?: any) {
        const errors = BaseVue.getValueFromPath(res, errorPath);
        const gqlErrors = BaseVue.getValueFromPath(res, 'errors');
        if (errors && errors.length > 0) {
          this.$msgbox(errors, 'Errors');
        } else if (gqlErrors && gqlErrors.length > 0) {
            this.$msgbox(gqlErrors, 'System Errors');
        } else {
            this.proceed(route, params);
        }
    }

    protected sendEmailOperation(eventId: string, evt: IEventData, test: boolean = false) {
        const mutation = {
          emailLogoImage: evt.receiptLogoImageUrl,
          subject: evt.receiptSubject,
          content: evt.receiptContent,
        };

        if (test) {
            this.api.sendEmailTest(eventId, mutation)
                .then(this.handleMessage).catch(this.handleFailure);
        } else {
            this.api.sendEmail(eventId, mutation)
                .then(this.handleMessage).catch(this.handleFailure);
        }
    }
}
