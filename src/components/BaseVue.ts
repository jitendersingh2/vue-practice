import { Vue } from 'vue-property-decorator';
import { EventApi } from '@/api/EventApi';
import ApiUtils from '@/api/ApiUtils';

export default class BaseVue extends Vue {
    public static getValueFromPath(obj, path: string) {
        return path.split('.').reduce((o, x) => {
            return (typeof o === 'undefined' || o === null) ? o : o[x];
        }, obj);
    }

    public static removeNull(obj: object) {
        for (const propName in obj) {
          if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
            delete obj[propName];
          }
        }
        return obj;
    }

    public static isUUID(val: string) {
        return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(val);
    }

    protected ERROR_UPDATE_PATH: string = 'data.event.update.errors';
    protected api: EventApi;

    constructor() {
        super();
        if (this.$store.getters.baseUrl === undefined || this.$store.getters.baseUrl === '') {
            ApiUtils.storeFrameInfo(this.$store);
        }
        const baseUrl: string = this.$store.getters.baseUrl;
        const sessionKey: string = this.$store.getters.sessionKey;
        this.api = new EventApi(baseUrl, sessionKey);
    }

    public handleSuccess(res: any, objPath: string, errorPath: string = 'errors') {
        const errors = BaseVue.getValueFromPath(res, errorPath);
        const gqlErrors = BaseVue.getValueFromPath(res, 'errors');
        if (errors && errors.length > 0) {
          this.$msgbox(errors, 'Error');
        } else if (gqlErrors && gqlErrors.length > 0) {
            this.$msgbox(gqlErrors, 'System Error');
        } else {
          return BaseVue.getValueFromPath(res, objPath);
        }
    }

    public handleFailure(errors) {
        if (this === undefined) {
            (new Vue()).$msgbox(errors, 'Errors');
        } else {
            this.$msgbox(errors, 'Errors');
        }
    }

    public handleMessage(res: any) {
        const errors = BaseVue.getValueFromPath(res, 'errors');
        if (errors && errors.length > 0) {
            this.$msgbox(errors, 'System Errors');
        }
    }

    public proceed(route: string, params?: any) {
        if (params) {
            this.$router.push({ name: route, params });
        } else {
            this.$router.push({ name: route });
        }
    }

}
