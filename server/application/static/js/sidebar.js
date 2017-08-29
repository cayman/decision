/**
 * Created by rustem on 29.08.17.
 */

const SideBar = {
    template: '#sidebar',
    data () {
        return {
            sectors:sharedStore.sectors,
        }
    },
    created () {
        // запрашиваем данные когда реактивное представление уже создано
    },
    watch: {
        // в случае изменения маршрута запрашиваем данные вновь
    },
    // beforeRouteUpdate (to, from, next) {
    //   // обработка изменений параметров пути...
    //   // не забудьте вызывать next()
    // }
    methods: {
    }
};
