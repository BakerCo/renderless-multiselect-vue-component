(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.VMselect = {}));
}(this, (function (exports) { 'use strict';

	var parseKey = function (item) {
			return item.key ? item.key : item;
		};

		var parseValue = function (item) {
			return item.value ? item.value : item;	
		};

		var script = {
			name: "VMselect",
			model: {
				prop: 'selectedTags',
				event: 'update'
			},
			props: {
				// selectedTags are always an array of the option.key or a single string value from options
				'selectedTags': {
					type: Array,
					default: function () { return []; }
				},
				// options can be a single array of strings 
				// or an array of objects formatted {key: 'some_key', value: 'Some Value'}
				'options': { 
					type: Array,
					default: function () { return []; }	
				}
			},
			computed: {
				// availableOptions are all options minus selected tags
				availableOptions: function availableOptions() {
					var this$1 = this;

					return this.options.filter(
						function (option) {
							return this$1.selectedTags.indexOf(parseKey(option)) === -1;
						}
					)
				},
				// visibleTags are all selectedTags mapped as single string or option.value
				visibleTags: function visibleTags() {
					var this$1 = this;

					return this.options.filter(
						function (option) {
							return this$1.selectedTags.indexOf(parseKey(option)) > -1;
						}
					).map(function (tag) { return parseValue(tag); });
				}
			},
			methods: {
				addOption: function addOption(e) {
					this.$emit('update', ( this.selectedTags ).concat( [e.target.value]));
	                e.target.selectedIndex = 0;			
				},
				removeTag: function removeTag(tag) {
					this.$emit('update', this.excludeTag(tag));
				},
				excludeTag: function excludeTag(tag) {
					var this$1 = this;

					return this.selectedTags.filter(function (currentTag) {
						return this$1.findMatchingOptionByTag(tag) !== currentTag;
					});
				},
				findMatchingOptionByTag: function findMatchingOptionByTag(tag) {
					var option = this.options.filter(
						function (option) {
							return (option.value && tag === option.value) || (tag === option);
						}
					)[0] || false;

					return option.key || option;
				}
			},
			render: function render() {
				return this.$scopedSlots.default(
					{
						'tags': this.visibleTags,
						'options': this.availableOptions,
						'addOption': this.addOption,
						'removeTag': this.removeTag
					}
				);
			}
		};

	function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
	    if (typeof shadowMode !== 'boolean') {
	        createInjectorSSR = createInjector;
	        createInjector = shadowMode;
	        shadowMode = false;
	    }
	    // Vue.extend constructor export interop.
	    var options = typeof script === 'function' ? script.options : script;
	    // render functions
	    if (template && template.render) {
	        options.render = template.render;
	        options.staticRenderFns = template.staticRenderFns;
	        options._compiled = true;
	        // functional template
	        if (isFunctionalTemplate) {
	            options.functional = true;
	        }
	    }
	    // scopedId
	    if (scopeId) {
	        options._scopeId = scopeId;
	    }
	    var hook;
	    if (moduleIdentifier) {
	        // server build
	        hook = function (context) {
	            // 2.3 injection
	            context =
	                context || // cached call
	                    (this.$vnode && this.$vnode.ssrContext) || // stateful
	                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
	            // 2.2 with runInNewContext: true
	            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
	                context = __VUE_SSR_CONTEXT__;
	            }
	            // inject component styles
	            if (style) {
	                style.call(this, createInjectorSSR(context));
	            }
	            // register component module identifier for async chunk inference
	            if (context && context._registeredComponents) {
	                context._registeredComponents.add(moduleIdentifier);
	            }
	        };
	        // used by ssr in case component is cached and beforeCreate
	        // never gets called
	        options._ssrRegister = hook;
	    }
	    else if (style) {
	        hook = shadowMode
	            ? function (context) {
	                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
	            }
	            : function (context) {
	                style.call(this, createInjector(context));
	            };
	    }
	    if (hook) {
	        if (options.functional) {
	            // register for functional component in vue file
	            var originalRender = options.render;
	            options.render = function renderWithStyleInjection(h, context) {
	                hook.call(context);
	                return originalRender(h, context);
	            };
	        }
	        else {
	            // inject component registration as beforeCreate hook
	            var existing = options.beforeCreate;
	            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
	        }
	    }
	    return script;
	}

	/* script */
	var __vue_script__ = script;

	/* template */

	  /* style */
	  var __vue_inject_styles__ = undefined;
	  /* scoped */
	  var __vue_scope_id__ = undefined;
	  /* module identifier */
	  var __vue_module_identifier__ = undefined;
	  /* functional template */
	  var __vue_is_functional_template__ = undefined;
	  /* style inject */
	  
	  /* style inject SSR */
	  
	  /* style inject shadow dom */
	  

	  
	  var __vue_component__ = /*#__PURE__*/normalizeComponent(
	    {},
	    __vue_inject_styles__,
	    __vue_script__,
	    __vue_scope_id__,
	    __vue_is_functional_template__,
	    __vue_module_identifier__,
	    false,
	    undefined,
	    undefined,
	    undefined
	  );

	// Import vue component

	// Declare install function executed by Vue.use()
	function install(Vue) {
		if (install.installed) { return; }
		install.installed = true;
		Vue.component('VMselect', __vue_component__);
	}

	// Create module definition for Vue.use()
	var plugin = {
		install: install,
	};

	// Auto-install when vue is found (eg. in browser via <script> tag)
	var GlobalVue = null;
	if (typeof window !== 'undefined') {
		GlobalVue = window.Vue;
	} else if (typeof global !== 'undefined') {
		GlobalVue = global.Vue;
	}
	if (GlobalVue) {
		GlobalVue.use(plugin);
	}

	exports.default = __vue_component__;
	exports.install = install;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
