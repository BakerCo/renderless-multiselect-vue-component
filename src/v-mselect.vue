<script>
	const parseKey = (item) => {
		return item.key ? item.key : item;
	};

	const parseValue = (item) => {
		return item.value ? item.value : item;	
	};

	export default {
		name: "VMselect",
		model: {
			prop: 'selectedTags',
			event: 'update'
		},
		props: {
			// selectedTags are always an array of the option.key or a single string value from options
			'selectedTags': {
				type: Array,
				default: () => []
			},
			// options can be a single array of strings 
			// or an array of objects formatted {key: 'some_key', value: 'Some Value'}
			'options': { 
				type: Array,
				default: () => []	
			}
		},
		computed: {
			// availableOptions are all options minus selected tags
			availableOptions() {
				return this.options.filter(
					option => {
						return this.selectedTags.indexOf(parseKey(option)) === -1;
					}
				)
			},
			// visibleTags are all selectedTags mapped as single string or option.value
			visibleTags() {
				return this.options.filter(
					option => {
						return this.selectedTags.indexOf(parseKey(option)) > -1;
					}
				).map(tag => parseValue(tag));
			}
		},
		methods: {
			addOption(e) {
				this.$emit('update', [...this.selectedTags, e.target.value]);
                e.target.selectedIndex = 0;			
			},
			removeTag(tag) {
				this.$emit('update', this.excludeTag(tag));
			},
			excludeTag(tag) {
				return this.selectedTags.filter((currentTag) =>  {
					return this.findMatchingOptionByTag(tag) !== currentTag;
				});
			},
			findMatchingOptionByTag(tag) {
				let option = this.options.filter(
					option => {
						return (option.value && tag === option.value) || (tag === option);
					}
				)[0] || false;

				return option.key || option;
			}
		},
		render() {
			return this.$scopedSlots.default(
				{
					'tags': this.visibleTags,
					'options': this.availableOptions,
					'addOption': this.addOption,
					'removeTag': this.removeTag
				}
			);
		}
	}
</script>