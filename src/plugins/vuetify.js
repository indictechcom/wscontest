import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#006699',
          secondary: '#004466',
          accent: '#0088bb',
          error: '#f44336',
          warning: '#ff9800',
          info: '#2196f3',
          success: '#4caf50',
        },
      },
    },
  },
})
