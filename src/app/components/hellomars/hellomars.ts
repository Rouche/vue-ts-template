
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloMars extends Vue {
    @Prop() private msg!: string;
}
