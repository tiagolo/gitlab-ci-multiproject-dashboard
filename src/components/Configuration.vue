<template>
    <v-dialog v-model="settings" max-width="500px">
        <v-card>
            <v-card-title>
                Dialog 2
            </v-card-title>
            <v-card-text>
                <v-select
                        :items="select"
                        label="A Select List"
                        item-value="text"
                ></v-select>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" flat @click.stop="settings=false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
    export default {
        name: 'Configuration',
        props: {
            settings: {}
        }
    };
</script>
