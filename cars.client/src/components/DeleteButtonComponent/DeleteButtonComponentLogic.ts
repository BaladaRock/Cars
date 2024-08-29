import { defineComponent } from 'vue';

export default defineComponent({
    name: 'DeleteButton',
    props: {
        serialNumber: {
            type: String,
            required: true,
        },
    },
    emits: ['delete-car'],
    methods: {
        handleDelete() {
            this.$emit('delete-car', this.serialNumber);
        },
    },
});