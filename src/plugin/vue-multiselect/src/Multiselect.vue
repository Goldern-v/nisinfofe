<template>
  <div
    :tabindex="searchable ? -1 : tabindex"
    :class="{ 'multiselect--active': isOpen, 'multiselect--disabled': disabled, 'multiselect--above': isAbove }"
    @focus="activate()"
    @blur="searchable ? false : deactivate()"
    @keydown.self.down.prevent="pointerForward()"
    @keydown.self.up.prevent="pointerBackward()"
    @keydown.enter.tab.stop.self="addPointerElement($event)"
    @keyup.esc="deactivate()"
    class="multiselect">
      <slot name="caret" :toggle="toggle">
        <div @mousedown.prevent.stop="toggle()" class="multiselect__select"></div>
      </slot>
      <slot name="clear" :search="search"></slot>
      <div ref="tags" class="multiselect__tags">
        <div class="multiselect__tags-wrap" v-show="visibleValue.length > 0">
          <template v-for="option of visibleValue" @mousedown.prevent>
            <slot name="tag" :option="option" :search="search" :remove="removeElement">
              <span class="multiselect__tag">
                <span v-text="getOptionLabel(option)"></span>
                <i aria-hidden="true" tabindex="1" @keydown.enter.prevent="removeElement(option)"  @mousedown.prevent="removeElement(option)" class="multiselect__tag-icon"></i>
              </span>
            </slot>
          </template>
        </div>
        <template v-if="internalValue && internalValue.length > limit">
          <strong class="multiselect__strong" v-text="limitText(internalValue.length - limit)"></strong>
        </template>
        <transition name="multiselect__loading">
          <slot name="loading"><div v-show="loading" class="multiselect__spinner"></div></slot>
        </transition>
        <input
          ref="search"
          :name="name"
          :id="id"
          type="text"
          autocomplete="off"
          :placeholder="placeholder"
          v-if="searchable"
          :style="inputStyle"
          :value="isOpen ? search : currentOptionLabel"
          :disabled="disabled"
          :tabindex="tabindex"
          @input="updateSearch($event.target.value)"
          @focus.prevent="activate()"
          @blur.prevent="deactivate()"
          @keyup.esc="deactivate()"
          @keydown.down.prevent="pointerForward()"
          @keydown.up.prevent="pointerBackward()"
          @keydown.enter.prevent.stop.self="addPointerElement($event)"
          @keydown.delete.stop="removeLastElement()"
          class="multiselect__input"/>
        <span
          v-if="!searchable"
          class="multiselect__single"
          @mousedown.prevent="toggle"
          v-text="currentOptionLabel">
        </span>
      </div>
      <transition name="multiselect">
        <div
          class="multiselect__content-wrapper"
          v-show="isOpen"
          @focus="activate"
          @mousedown.prevent
          :style="{ maxHeight: optimizedHeight + 'px' }"
          ref="list">
          <ul class="multiselect__content" :style="contentStyle">
            <slot name="beforeList"></slot>
            <li v-if="multiple && max === internalValue.length">
              <span class="multiselect__option">
                <slot name="maxElements">Maximum of {{ max }} options selected. First remove a selected option to select another.</slot>
              </span>
            </li>
            <template v-if="!max || internalValue.length < max">
              <li class="multiselect__element" v-for="(option, index) of filteredOptions" :key="index">
                <span
                  v-if="!(option && (option.$isLabel || option.$isDisabled))"
                  :class="optionHighlight(index, option)"
                  @click.stop="select(option)"
                  @mouseenter.self="pointerSet(index)"
                  :data-select="option && option.isTag ? tagPlaceholder : selectLabelText"
                  :data-selected="selectedLabelText"
                  :data-deselect="deselectLabelText"
                  class="multiselect__option">
                    <slot name="option" :option="option" :search="search">
                      <span>{{ getOptionLabel(option) }}</span>
                    </slot>
                </span>
                <span
                  v-if="option && (option.$isLabel || option.$isDisabled)"
                  :class="optionHighlight(index, option)"
                  class="multiselect__option multiselect__option--disabled">
                    <slot name="option" :option="option" :search="search">
                      <span>{{ getOptionLabel(option) }}</span>
                    </slot>
                </span>
              </li>
            </template>
            <li v-show="showNoResults && (filteredOptions.length === 0 && search && !loading)">
              <span class="multiselect__option">
                <slot name="noResult">没有相关科室</slot>
              </span>
            </li>
            <slot name="afterList"></slot>
          </ul>
        </div>
      </transition>
  </div>
</template>

<script>
  import multiselectMixin from './multiselectMixin'
  import pointerMixin from './pointerMixin'

  export default {
    name: 'vue-multiselect',
    mixins: [multiselectMixin, pointerMixin],
    props: {

      /**
       * name attribute to match optional label element
       * @default ''
       * @type {String}
       */
      name: {
        type: String,
        default: ''
      },
      /**
       * String to show when pointing to an option
       * @default 'Press enter to select'
       * @type {String}
       */
      selectLabel: {
        type: String,
        default: ''
      },
      /**
       * String to show next to selected option
       * @default 'Selected'
       * @type {String}
      */
      selectedLabel: {
        type: String,
        default: '已选择'
      },
      /**
       * String to show when pointing to an alredy selected option
       * @default '再次点击删除'
       * @default 'Press enter to remove'
       * @type {String}
      */
      deselectLabel: {
        type: String,
        default: '再次点击删除'
      },
      /**
       * Decide whether to show pointer labels
       * @default true
       * @type {Boolean}
      */
      showLabels: {
        type: Boolean,
        default: true
      },
      /**
       * Limit the display of selected options. The rest will be hidden within the limitText string.
       * @default 99999
       * @type {Integer}
       */
      limit: {
        type: Number,
        default: 99999
      },
      /**
       * Sets maxHeight style value of the dropdown
       * @default 300
       * @type {Integer}
       */
      maxHeight: {
        type: Number,
        default: 300
      },
      /**
       * Function that process the message shown when selected
       * elements pass the defined limit.
       * @default 'and * more'
       * @param {Int} count Number of elements more than limit
       * @type {Function}
       */
      limitText: {
        type: Function,
        default: count => `and ${count} more`
      },
      /**
       * Set true to trigger the loading spinner.
       * @default False
       * @type {Boolean}
      */
      loading: {
        type: Boolean,
        default: false
      },
      /**
       * Disables the multiselect if true.
       * @default false
       * @type {Boolean}
      */
      disabled: {
        type: Boolean,
        default: false
      },
      /**
       * Fixed opening direction
       * @default ''
       * @type {String}
      */
      openDirection: {
        type: String,
        default: ''
      },
      showNoResults: {
        type: Boolean,
        default: true
      },
      tabindex: {
        type: Number,
        default: 0
      }
    },
    computed: {
      visibleValue () {
        return this.multiple
          ? this.internalValue.slice(0, this.limit)
          : []
      },
      deselectLabelText () {
        return this.showLabels
          ? this.deselectLabel
          : ''
      },
      selectLabelText () {
        return this.showLabels
          ? this.selectLabel
          : ''
      },
      selectedLabelText () {
        return this.showLabels
          ? this.selectedLabel
          : ''
      },
      inputStyle () {
        if (this.multiple && this.value && this.value.length) {
          // Hide input by setting the width to 0 allowing it to receive focus
          return this.isOpen ? { 'width': 'auto' } : { 'width': '0', 'position': 'absolute' }
        }
      },
      contentStyle () {
        return this.options.length
          ? { 'display': 'inline-block' }
          : { 'display': 'block' }
      },
      isAbove () {
        if (this.openDirection === 'above' || this.openDirection === 'top') {
          return true
        } else if (this.openDirection === 'below' || this.openDirection === 'bottom') {
          return false
        } else {
          return this.prefferedOpenDirection === 'above'
        }
      }
    }
  }
</script>

<style>
fieldset[disabled] .multiselect {
	pointer-events: none
}
.multiselect{
	/* padding: 0; */
}
.multiselect__spinner {
	position: absolute;
	top: 1px;
	right: 1px;
	display: block;
	width: 3pc;
	height: 35px;
	background: #fff
}

.multiselect__spinner:after,.multiselect__spinner:before {
	position: absolute;
	top: 50%;
	left: 50%;
	margin: -8px 0 0 -8px;
	width: 1pc;
	height: 1pc;
	border-color: #41b883 transparent transparent;
	border-style: solid;
	border-width: 2px;
	border-radius: 100%;
	box-shadow: 0 0 0 1px transparent;
	content: ""
}

.multiselect__spinner:before {
	animation: a 2.4s cubic-bezier(.41,.26,.2,.62);
	animation-iteration-count: infinite
}

.multiselect__spinner:after {
	animation: a 2.4s cubic-bezier(.51,.09,.21,.8);
	animation-iteration-count: infinite
}

.multiselect__loading-enter-active,.multiselect__loading-leave-active {
	opacity: 1;
	transition: opacity .4s ease-in-out
}

.multiselect__loading-enter,.multiselect__loading-leave-active {
	opacity: 0
}

.multiselect,.multiselect__input,.multiselect__single {
	font-size: 14px;
	font-family: inherit;
	-ms-touch-action: manipulation;
	touch-action: manipulation
}

.multiselect {
	position: relative;
	display: block;
	box-sizing: content-box;
	width: 387px;
	min-height: 40px;
	color: #35495e;
	text-align: left
}

.multiselect * {
	box-sizing: border-box
}

.multiselect:focus {
	outline: 0
}

.multiselect--disabled {
	opacity: .6
}

.multiselect--active {
	z-index: 1
}

.multiselect--active:not(.multiselect--above) .multiselect__current,.multiselect--active:not(.multiselect--above) .multiselect__input,.multiselect--active:not(.multiselect--above) .multiselect__tags {
	border-bottom-right-radius: 0;
	border-bottom-left-radius: 0
}

.multiselect--active .multiselect__select {
	transform: rotate(180deg)
}

.multiselect--above.multiselect--active .multiselect__current,.multiselect--above.multiselect--active .multiselect__input,.multiselect--above.multiselect--active .multiselect__tags {
	border-top-right-radius: 0;
	border-top-left-radius: 0
}

.multiselect__input,.multiselect__single {
	position: relative;
	display: inline-block;
	box-sizing: border-box;
	margin-bottom: 8px;
	padding: 0 0 0 5px;
	width: 100%;
	min-height: 20px;
	border: none;
	border-radius: 5px;
	background: #fff;
	vertical-align: top;
	line-height: 20px;
	transition: border .1s ease
}

.multiselect__tag~.multiselect__input,.multiselect__tag~.multiselect__single {
	width: auto
}

.multiselect__input:hover,.multiselect__single:hover {
	border-color: #cfcfcf
}

.multiselect__input:focus,.multiselect__single:focus {
	outline: 0;
	border-color: #a8a8a8
}

.multiselect__single {
	margin-bottom: 8px;
	padding-left: 6px
}

.multiselect__tags-wrap {
	display: inline
}

.multiselect__tags {
	display: block;
	padding: 8px 40px 0 8px;
	min-height: 40px;
	border: 1px solid #c2cbd2;
	border-radius: 5px;
	background: #fff
}

.multiselect__tag {
	position: relative;
	display: inline-block;
	overflow: hidden;
	margin-right: 10px;
	padding: 4px 26px 4px 10px;
	max-width: 100%;
	border-radius: 5px;
	background: #41b883;
	color: #fff;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 9pt;
	line-height: 1
}

.multiselect__tag-icon {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	margin-left: 7px;
	width: 22px;
	text-align: center;
	font-weight: 700;
	font-style: normal;
	line-height: 19px;
	cursor: pointer;
	transition: all .2s ease
}

.multiselect__tag-icon:after {
	color: #fff;
	content: "\D7";
	font-size: 14px
}

 .multiselect__tag-icon:focus,.multiselect__tag-icon:hover {
	/* background: #369a6e */
	/* background: #F45D3F; */
} 

.multiselect__tag-icon:focus:after,.multiselect__tag-icon:hover:after {
	color: #fff
}

.multiselect__current {
	overflow: hidden;
	padding: 8px 9pt 0;
	padding-right: 30px;
	min-height: 40px;
	border: 1px solid #e8e8e8;
	border-radius: 5px;
	white-space: nowrap
}

.multiselect__current,.multiselect__select {
	display: block;
	box-sizing: border-box;
	margin: 0;
	text-decoration: none;
	line-height: 1pc;
	cursor: pointer
}

.multiselect__select {
	position: absolute;
	top: 1px;
	right: 1px;
	padding: 4px 8px;
	width: 40px;
	height: 28px;
	text-align: center;
	transition: transform .2s ease
}

.multiselect__select:before {
	position: relative;
	top: 65%;
	right: 0;
	margin-top: 4px;
	border-color: #999 transparent transparent;
	border-style: solid;
	border-width: 5px 5px 0;
	color: #999;
	content: ""
}

.multiselect__placeholder {
	display: inline-block;
	margin-bottom: 10px;
	padding-top: 2px;
	color: #adadad
}

.multiselect--active .multiselect__placeholder {
	display: none
}

.multiselect__content-wrapper {
	position: absolute;
	z-index: 1;
	display: block;
	overflow: auto;
	width: 100%;
	max-height: 15pc;
	border: 1px solid #e8e8e8;
	border-top: none;
	border-bottom-right-radius: 5px;
	border-bottom-left-radius: 5px;
	background: #fff;
	-webkit-overflow-scrolling: touch
}

.multiselect__content {
	display: inline-block;
	margin: 0;
	padding: 0;
	min-width: 100%;
	list-style: none;
	vertical-align: top
}

.multiselect--above .multiselect__content-wrapper {
	bottom: 100%;
	border-top: 1px solid #e8e8e8;
	border-bottom: none;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 0;
	border-bottom-left-radius: 0;
	border-top-left-radius: 5px
}

.multiselect__content::webkit-scrollbar {
	display: none
}

.multiselect__element {
	display: block
}

.multiselect__option {
	position: relative;
	display: block;
	padding: 9pt;
	min-height: 40px;
	vertical-align: middle;
	text-decoration: none;
	text-transform: none;
	white-space: nowrap;
	line-height: 1pc;
	cursor: pointer
}

.multiselect__option:after {
	position: absolute;
	top: 0;
	right: 0;
	padding-right: 9pt;
	padding-left: 20px;
	line-height: 40px
}

.multiselect__option--highlight {
	outline: 0;
	background: #41b883;
	color: #fff
}

.multiselect__option--highlight:after {
	/* background: #41b883; */
	color: #fff;
	content: attr(data-select)
}

.multiselect__option--selected {
	background: #f3f3f3;
	color: #35495e;
	font-weight: 700
}

.multiselect__option--selected:after {
	color: silver;
	content: attr(data-selected)
}

.multiselect__option--selected.multiselect__option--highlight {
	/* cursor: not-allowed; */
	/* pointer-events: none */
}

.multiselect__option--selected.multiselect__option--highlight:after {
	content: attr(data-deselect) !important;
  /* cursor: not-allowed */
  color: #666;
  /* content: '点击取消' !important */
}

.multiselect--disabled {
	background: #ededed;
	/* pointer-events: none */
}

.multiselect--disabled .multiselect__current,.multiselect--disabled .multiselect__select,.multiselect__option--disabled {
	background: #ededed;
	color: #a6a6a6
}

.multiselect__option--disabled {
	cursor: text;
	/* pointer-events: none */
}

.multiselect__option--disabled.multiselect__option--highlight {
	background: #dedede!important
}

.multiselect-enter-active,.multiselect-leave-active {
	transition: all .15s ease
}

.multiselect-enter,.multiselect-leave-active {
	opacity: 0
}

.multiselect__strong {
	display: inline-block;
	margin-bottom: 8px;
	vertical-align: top;
	line-height: 20px
}
[dir=rtl] .multiselect {
	text-align: right
}
[dir=rtl] .multiselect__select {
	right: auto;
	left: 1px
}
[dir=rtl] .multiselect__tags {
	padding: 8px 8px 0 40px
}
[dir=rtl] .multiselect__content {
	text-align: right
}
[dir=rtl] .multiselect__option:after {
	right: auto;
	left: 0
}
[dir=rtl] .multiselect__clear {
	right: auto;
	left: 9pt
}
[dir=rtl] .multiselect__spinner {
	right: auto;
	left: 1px
}

@keyframes a {
	0% {
		transform: rotate(0)
	}

	to {
		transform: rotate(2turn)
	}
}

</style>
