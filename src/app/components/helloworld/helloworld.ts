
import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './helloworld.html?style=./helloworld.scss';

/**
 * @Important
 * Example for vue-template-loader
 */
@WithRender
@Component
export default class HelloWorld extends Vue {
    @Prop() private msg!: string;
}
