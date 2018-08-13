// vue-template-loader (@see https://github.com/ktsn/vue-template-loader)
declare module '*.scss' {
    import Vue, { ComponentOptions } from 'vue';
    interface WithRender {
        <V extends Vue>(options: ComponentOptions<V>): ComponentOptions<V>;
        <V extends typeof Vue>(component: V): V;
    }
    const withRender: WithRender;
    export = withRender;
}
