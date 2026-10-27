import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TodoItem from '../../src/components/TodoItem.vue';
import { Quasar } from 'quasar';

describe('TodoItem.vue', () => {
  const mockTodo = {
    id: '1',
    title: 'Тестовая задача',
    completed: false,
    createdAt: Date.now(),
  };

  it('должен отображать название задачи', () => {
    const wrapper = mount(TodoItem, {
      props: { todo: mockTodo },
      global: { plugins: [Quasar] }
    });
    expect(wrapper.text()).toContain('Тестовая задача');
  });

  it('должен эмитить событие toggle при клике на чекбокс', async () => {
    const wrapper = mount(TodoItem, {
      props: { todo: mockTodo },
      global: { plugins: [Quasar] }
    });
    
    // Находим QCheckbox и кликаем
    const checkbox = wrapper.findComponent({ name: 'QCheckbox' });
    await checkbox.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('toggle');
    expect(wrapper.emitted('toggle')?.[0]).toEqual(['1']);
  });
});
