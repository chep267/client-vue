/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/vue';
import { defineRule } from 'vee-validate';

/** components */
import FieldText from '@module-auth/components/general/FieldText.vue';

defineRule('required', (value: string) => !!value || 'required');

const renderFieldText = (props = {}) => {
    return render(FieldText, {
        props: {
            name: 'email',
            label: 'Text field',
            rules: 'required',
            ...props,
        },
    });
};

describe('FieldText', () => {
    const label = 'Text field';

    it('renders and shows label', () => {
        const { getByLabelText } = renderFieldText();
        const input = getByLabelText(label);
        expect(input).toBeInTheDocument();
    });

    it('emits update:model-value when typing', async () => {
        const text = 'Hello';
        const onUpdate = vi.fn();
        const { getByLabelText } = renderFieldText({
            'onUpdate:model-value': onUpdate,
        });
        const input = getByLabelText(label);
        await fireEvent.update(input, text);
        expect(onUpdate).toHaveBeenCalled();
        expect(onUpdate.mock.calls[0]?.[0]).toBe(text);
    });

    it('emits update:ref after mount', () => {
        const onUpdateRef = vi.fn();
        renderFieldText({ 'onUpdate:ref': onUpdateRef });
        expect(onUpdateRef).toHaveBeenCalled();
    });
});
