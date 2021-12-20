<template>
	<div id="show-text-entries" v-if="countAll > 0">
		Hiển thị <span class="number-total">{{currentTotal}}</span> trong số <span class="number-total">{{countAll}}</span> mục
	</div>
</template>
<script>
    export default {
        name: "showTextEntries",
        props: [
            'currentTotal',
            'countAll'
        ]
    }
</script>

<style>
	#show-text-entries {
		color: rgb(180, 180, 180);
		padding-top: 10px;
		font-size: 13px;
		font-style: italic;
	}

	.number-total {
		font-weight: bold;
	}
</style>