
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/app/components/helloworld/helloworld'; // @ is an alias to /src
import HelloMars from '@/app/components/hellomars/hellomars.vue'; // @ is an alias to /src

@Component({
    components: {
        helloworld: HelloWorld,
        hellomars: HelloMars,
    },
})
export default class Home extends Vue {
    public message: string = 'Welcome to Your Vue.js + TypeScript App';
    public message2: string = 'Mars Attack!!!';
}
