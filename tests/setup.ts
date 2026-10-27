import { config } from '@vue/test-utils';
import { Quasar } from 'quasar';

// Подключаем Quasar ко всем тестам
config.global.plugins = [Quasar];
