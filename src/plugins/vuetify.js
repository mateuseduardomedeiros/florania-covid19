import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true,
        },
        themes: {
            light: {
                primary: '#3D844A',
                secondary: '#ED4137',
                accent: '#82B1FF',
                error: '#FF5252',
                info: '#fff',
                success: '#4CAF50',
                warning: '#FFC107'
            },
        },
    },
});
