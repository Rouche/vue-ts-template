
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloMars extends Vue {

    public serviceUrl: string = process.env.VUE_APP_CONFIG_SERVICE_URL || '';

    @Prop() private msg!: string;

}
