<template>
  <!--
		        SweetModal for Vue.js
		        Sweet, easy and powerful modals and dialogs
		        Copyright (c) 2017 Adepto.as AS · Oslo, Norway
		        Dual licensed under the MIT and GPL licenses.
		        See LICENSE-MIT.txt and LICENSE-GPL.txt
  -->
  <div
    :class="[overlay_classes,size, {infull: infull}]"
    v-show="is_open"
    v-on:click="_onOverlayClick"
  >
    <div
      :class="modal_classes"
      :style="modalWidth && {width: modalWidth + 'px', minWidth: modalWidth + 'px'}"
      ref="dragBox"
    >
      <div class="sweet-box-actions">
        <!-- Custom Actions -->
        <slot name="box-action"></slot>
        <!-- Close Button -->
        <div
          class="sweet-action-close"
          v-on:click="infull = true; $emit('isfull', true)"
          v-show="fullBtn && infull == false"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1018"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <defs />
            <path
              d="M161.568 188.352l0 0.16 0 202.912c0 15.52 12.608 28.096 28.096 28.096s28.096-12.608 28.096-28.096l0-130.88 162.656 178.944c10.432 11.52 28.096 12.288 39.616 1.856 11.52-10.432 12.288-28.096 1.856-39.616L252.48 215.552l140.704 0c15.52 0 28.096-12.608 28.096-28.096s-12.608-28.096-28.096-28.096L190.272 159.36c-6.912 0-13.376 2.464-18.112 6.752C171.712 166.4 171.232 166.848 170.784 167.328 164.64 172.864 161.568 180.672 161.568 188.352L161.568 188.352 161.568 188.352z"
              p-id="1019"
              fill="#222C38"
            />
            <path
              d="M862.432 188.352l0 0.16 0 202.912c0 15.52-12.608 28.096-28.096 28.096-15.52 0-28.096-12.608-28.096-28.096l0-130.88-162.656 179.104c-10.432 11.52-28.096 12.288-39.616 1.856-11.52-10.432-12.288-28.096-1.856-39.616l169.408-186.304-140.704 0c-15.52 0-28.096-12.608-28.096-28.096s12.608-28.096 28.096-28.096l202.912 0c6.912 0 13.376 2.464 18.112 6.752 0.448 0.32 0.928 0.768 1.376 1.216C859.36 172.864 862.432 180.672 862.432 188.352L862.432 188.352 862.432 188.352z"
              p-id="1020"
              fill="#222C38"
            />
            <path
              d="M161.568 835.488l0-0.16 0-202.912c0-15.52 12.608-28.096 28.096-28.096s28.096 12.608 28.096 28.096l0 130.88 162.656-178.944c10.432-11.52 28.096-12.288 39.616-1.856 11.52 10.432 12.288 28.096 1.856 39.616L252.48 808.288l140.704 0c15.52 0 28.096 12.608 28.096 28.096s-12.608 28.096-28.096 28.096L190.272 864.48c-6.912 0-13.376-2.464-18.112-6.752-0.448-0.32-0.928-0.768-1.376-1.216C164.64 851.008 161.568 843.328 161.568 835.488L161.568 835.488 161.568 835.488z"
              p-id="1021"
              fill="#222C38"
            />
            <path
              d="M862.432 835.488l0-0.16 0-202.912c0-15.52-12.608-28.096-28.096-28.096-15.52 0-28.096 12.608-28.096 28.096l0 130.88-162.656-178.944c-10.432-11.52-28.096-12.288-39.616-1.856-11.52 10.432-12.288 28.096-1.856 39.616l169.408 186.304-140.704 0c-15.52 0-28.096 12.608-28.096 28.096s12.608 28.096 28.096 28.096l202.912 0c6.912 0 13.376-2.464 18.112-6.752 0.448-0.32 0.928-0.768 1.376-1.216C859.36 851.008 862.432 843.328 862.432 835.488L862.432 835.488 862.432 835.488z"
              p-id="1022"
              fill="#222C38"
            />
          </svg>
        </div>
        <div
          class="sweet-action-close"
          v-on:click="infull = false; $emit('isfull', false)"
          v-show="fullBtn && infull == true"
        >
          <svg
            style="width: 17px"
            width="24"
            height="24"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1018"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <defs />
            <path
              d="M392.475097 376.828509c0-0.108684 0.006587-0.219015 0.006587-0.327699V83.950084c0-22.334543-18.107397-40.44194-40.44194-40.44194-22.332896 0-40.44688 18.107397-40.44688 40.44194v188.645619L76.894909 14.420378C61.868536-2.104516 36.293237-3.326386 19.761756 11.699987 3.236862 26.72636 2.014991 52.308246 17.041365 68.83314l244.32636 268.763772H58.486161c-22.34113 0-40.448527 18.107397-40.448527 40.440294 0 22.34113 18.107397 40.448527 40.448527 40.448527h292.54414a40.310202 40.310202 0 0 0 26.245516-9.681102c0.661984-0.533539 1.323968-1.086839 1.967838-1.673073 8.882439-8.065663 13.335186-19.181063 13.231442-30.303049M631.365615 376.828509c0-0.108684-0.006587-0.219015-0.006587-0.327699V83.950084c0-22.334543 18.107397-40.44194 40.448527-40.44194 22.334543 0 40.440293 18.107397 40.440294 40.44194v188.645619L946.945803 14.420378c15.026373-16.524894 40.608259-17.746764 57.133153-2.720391 16.531481 15.026373 17.746764 40.608259 2.720391 57.133153L762.472987 337.596912H965.362785c22.334543 0 40.44194 18.107397 40.44194 40.440294 0 22.34113-18.107397 40.448527-40.44194 40.448527H672.810411a40.292088 40.292088 0 0 1-26.238929-9.681102c-0.668571-0.533539-1.332201-1.086839-1.974424-1.673073-8.875852-8.065663-13.326952-19.181063-13.231443-30.303049M392.475097 646.776277c0 0.108684 0.006587 0.219015 0.006587 0.327698V939.654702c0 22.334543-18.107397 40.44194-40.44194 40.44194-22.332896 0-40.44688-18.107397-40.44688-40.44194V751.009083L76.894909 1009.177821c-15.026373 16.531481-40.601672 17.746764-57.133153 2.720391-16.524894-15.026373-17.746764-40.601672-2.720391-57.126567l244.32636-268.763772H58.486161c-22.34113 0-40.448527-18.107397-40.448527-40.448527 0-22.332896 18.107397-40.440293 40.448527-40.440293h292.54414a40.275621 40.275621 0 0 1 26.245516 9.681101c0.661984 0.533539 1.323968 1.080252 1.967838 1.66484 8.882439 8.073897 13.335186 19.189296 13.231442 30.311283M631.365615 646.776277c0 0.108684-0.006587 0.219015-0.006587 0.327698V939.654702c0 22.334543 18.107397 40.44194 40.448527 40.44194 22.334543 0 40.440293-18.107397 40.440294-40.44194V751.009083l234.697954 258.168738c15.026373 16.531481 40.608259 17.746764 57.133153 2.720391 16.531481-15.026373 17.746764-40.601672 2.720391-57.126567L762.472987 686.007873H965.362785c22.334543 0 40.44194-18.107397 40.44194-40.448527 0-22.332896-18.107397-40.440293-40.44194-40.440293H672.810411a40.257507 40.257507 0 0 0-26.238929 9.681101c-0.668571 0.533539-1.332201 1.080252-1.974424 1.66484-8.875852 8.073897-13.326952 19.189296-13.231443 30.311283"
              p-id="2836"
            />
          </svg>
        </div>
        <div class="sweet-action-close" v-on:click="close" v-if="!hideCloseButton">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              fill="#292c34"
            />
          </svg>
        </div>
      </div>
      <!-- Title: Housing the title and tabs, if no title is present -->
      <div class="sweet-title" v-if="has_title || has_tabs">
        <!-- Tabs but no title -->
        <template v-if="has_tabs && !has_title">
          <ul class="sweet-modal-tabs">
            <li v-for="tab in tabs" :class="_getClassesForTab(tab)" :key="tab.id">
              <a href="#" v-on:click.prevent="_changeTab(tab)">
                <div class="sweet-modal-valign">
                  <span v-if="tab.icon" v-html="tab.icon" class="sweet-modal-tab-icon" />
                  <span class="sweet-modal-tab-title">{{ tab.title }}</span>
                </div>
              </a>
            </li>
          </ul>
        </template>

        <!-- Title -->
        <template v-if="has_title">
          <h2 v-if="title" ref="dragTitle" style="width:100%">
            <span v-if="titleIcon">
              <img :src="titleIcon" width="22" height="auto" style="vertical-align: middle;" />
            </span>
            <span v-html="title"></span>
            <slot name="title-bar"></slot>
          </h2>
          <slot name="title"></slot>
        </template>
      </div>

      <!-- Tabs: If title AND tabs are present -->
      <ul class="sweet-modal-tabs" v-if="has_title && has_tabs">
        <li v-for="tab in tabs" :class="_getClassesForTab(tab)">
          <a href="#" v-on:click.prevent="_changeTab(tab)">
            <div class="sweet-modal-valign">
              <span v-if="tab.icon" v-html="tab.icon" class="sweet-modal-tab-icon" />
              <span class="sweet-modal-tab-title">{{ tab.title }}</span>
            </div>
          </a>
        </li>
      </ul>

      <!-- Content: Wrapper -->
      <div class="sweet-content" ref="content">
        <!-- Icon: Error -->
        <div class="sweet-modal-icon sweet-modal-error" v-if="icon == 'error'" ref="icon_error">
          <span class="sweet-modal-x-mark">
            <span class="sweet-modal-line sweet-modal-left"></span>
            <span class="sweet-modal-line sweet-modal-right"></span>
          </span>
        </div>

        <!-- Icon: Warning -->
        <div
          class="sweet-modal-icon sweet-modal-warning"
          v-if="icon == 'warning'"
          ref="icon_warning"
        >
          <span class="sweet-modal-body"></span>
          <span class="sweet-modal-dot"></span>
        </div>

        <!-- Icon: Info -->
        <div class="sweet-modal-icon sweet-modal-info" v-if="icon == 'info'" ref="icon_info"></div>

        <!-- Icon: Success -->
        <div
          class="sweet-modal-icon sweet-modal-success"
          v-if="icon == 'success'"
          ref="icon_success"
        >
          <span class="sweet-modal-line sweet-modal-tip"></span>
          <span class="sweet-modal-line sweet-modal-long"></span>
          <div class="sweet-modal-placeholder"></div>
          <div class="sweet-modal-fix"></div>
        </div>

        <!-- Icon: loading lzj -->
        <div class v-if="icon == 'loading'" ref="icon_loading">
          <div class="loading-container">
            <div class="loading"></div>
            <div id="loading-text">请稍后</div>
          </div>
          <a id="link">正在保存，请不要关闭本页面...</a>
        </div>

        <!-- Actual Content -->
        <div class="sweet-content-content" v-if="$slots.default">
          <slot></slot>
        </div>
      </div>

      <!-- Buttons -->
      <div class="sweet-buttons djw" v-if="$slots.button">
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import drag from "@/plugin/tool/drag.js";
export default {
  name: "SweetModal",
  props: {
    titleIcon: {
      type: String,
      required: false,
      default: ""
    },
    title: {
      type: String,
      required: false,
      default: ""
    },
    overlayTheme: {
      type: String,
      required: false,
      default: "light"
    },
    modalTheme: {
      type: String,
      required: false,
      default: "light"
    },
    blocking: {
      type: Boolean,
      required: false,
      default: false
    },
    pulseOnBlock: {
      type: Boolean,
      required: false,
      default: true
    },
    icon: {
      type: String,
      required: false,
      default: ""
    },
    hideCloseButton: {
      type: Boolean,
      required: false,
      default: false
    },
    size: {
      type: String,
      required: false,
      default: ""
    },
    fullBtn: {
      type: Boolean,
      required: false,
      default: false
    },
    modalWidth: {
      type: Number
    }
  },
  mounted() {
    this.tabs = this.$children.filter(c => c.cmpName && c.cmpName == "tab");
    if (this.has_tabs) {
      this.currentTab = this._changeTab(this.tabs[0]);
    }
    document.addEventListener("keyup", this._onDocumentKeyup);
    let Modalelement = this.$refs.dragBox;
    let titleElement = this.$refs.dragTitle;
    if (Modalelement && titleElement) {
      new drag(titleElement, {
        parentMove: Modalelement,
        backToPosition: true,
        cursorCancel: true
      });
    }
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this._onDocumentKeyup);
  },
  data() {
    return {
      visible: false,
      is_open: false,
      is_bouncing: false,
      closeCallback: null,
      tabs: [],
      backups: {
        body: {
          height: null,
          overflow: null
        }
      },
      infull: false,
      ifNoguan:true
    };
  },
  updated() {
    this._animateIcon();
  },
  computed: {
    has_title() {
      return this.title || this.$slots.title;
    },
    has_tabs() {
      return this.tabs.length > 0;
    },
    has_content() {
      return this.$slots.default;
    },
    current_tab() {
      return this.tabs.filter(t => t.active === true)[0];
    },
    overlay_classes() {
      return [
        "sweet-modal-overlay",
        "theme-" + this.overlayTheme,
        "sweet-modal-clickable",
        {
          "is-visible": this.visible,
          blocking: this.blocking
        }
      ];
    },
    modal_classes() {
      return [
        "sweet-modal",
        "theme-" + this.modalTheme,
        {
          "has-title": this.has_title,
          "has-tabs": this.has_tabs,
          "has-content": this.has_content,
          "has-icon": this.icon,
          "is-visible": this.visible,
          "sweet-alert":
            (this.icon && !this.has_tabs) ||
            (!this.icon && !this.title && !this.$slots.title),
          bounce: this.is_bouncing
        }
      ];
    }
  },
  methods: {
    /**
     * Open the dialog
     * Emits an event 'open'
     *
     * @param tabId string     Optional id or index of initial tab element.
     */
    open(tabId = null,ifNoguan =true) {
      if (tabId && this.has_tabs) {
        // Find tab with wanted id.
        let openingTabs = this.tabs.filter(tab => {
          return tab.id === tabId;
        });
        if (openingTabs.length > 0) {
          // Set current tab to first match.
          this.currentTab = this._changeTab(openingTabs[0]);
        } else {
          // Try opening index instead of id as an alternative.
          let openingTab = this.tabs[tabId];
          if (openingTab) {
            this.currentTab = this._changeTab(openingTab);
          }
        }
      }
      this.infull = false;
      this.is_open = true;
      this._lockBody();
      this._animateIcon();
      this.$refs.dragBox.style.left = "50%";
      this.$refs.dragBox.style.top = "50%";
      setTimeout(() => (this.visible = true), 30);
      this.$emit("open");
      console.log(this.ifNoguan,ifNoguan,"this.ifNoguan111")
      if(ifNoguan===false) this.ifNoguan = false
      // this.ifNoguan = !ifNoguan && ifNoguan
      console.log(this.ifNoguan,ifNoguan,"this.ifNoguan222")
    },
    /**
     * Close the dialog
     * Emits an event 'close'
     */
    close(fuyouIfclose) {
      console.log(this.ifNoguan,fuyouIfclose,JSON.parse(localStorage.user).empNo,"fuyouIfclose")
      if(this.HOSPITAL_ID=="fuyou"){
        if(this.ifNoguan){
          if (this.closeCallback) {
              this.closeCallback();
            }
            this.visible = false;
            this._unlockBody();
            setTimeout(() => (this.is_open = false), 300);
            this.$emit("close");
        }
      }else{
         if (this.closeCallback) {
              this.closeCallback();
            }
            this.visible = false;
            this._unlockBody();
            setTimeout(() => (this.is_open = false), 300);
            this.$emit("close");
      }
      // if(((JSON.parse(localStorage.user).empNo!="admin" || fuyouIfclose===true) && this.HOSPITAL_ID=="fuyou") || this.HOSPITAL_ID!="fuyou"){
      //   if (this.closeCallback) {
      //     this.closeCallback();
      //   }
      //   this.visible = false;
      //   this._unlockBody();
      //   setTimeout(() => (this.is_open = false), 300);
      //   this.$emit("close");
      // }
    },
    /**
     * Close the dialog width callback func.
     */
    setCloseCallback(closeCallback) {
      this.closeCallback = closeCallback;
    },
    /**
     * Bounce the modal.
     */
    bounce() {
      this.is_bouncing = true;
      setTimeout(() => (this.is_bouncing = false), 330);
    },
    /**********************
			 INTERNAL METHODS
			 **********************/
    _lockBody() {
      this.backups.body.height = document.body.style.height;
      this.backups.body.overflow = document.body.style.overflow;
      document.body.style.height = "100%";
      document.body.style.overflow = "hidden";
    },
    _unlockBody() {
      document.body.style.height = this.backups.body.height;
      document.body.style.overflow = this.backups.body.overflow;
    },
    _onOverlayClick(event) {
      if (
        !event.target.classList ||
        event.target.classList.contains("sweet-modal-clickable")
      ) {
        if (this.blocking) {
          if (this.pulseOnBlock) this.bounce();
        } else {
          // 不能点击弹窗外的区域来关闭，只通过关闭、取消、保存按钮关闭。 
          // 医院名单
          const blackList=['guizhou','foshanrenyi','wujing','fsxt']
          if(!blackList.includes(this.HOSPITAL_ID)){
            this.close();
          }
        }
      }
    },
    _onDocumentKeyup(event) {
      if (event.keyCode == 27) {
        if (this.blocking) {
          if (this.pulseOnBlock) this.bounce();
        } else {
          this.close();
        }
      }
    },
    _changeTab(tab) {
      this.tabs.map(t => (t.active = t == tab));
      this.currentTab = tab;
    },
    _getClassesForTab(tab) {
      return [
        "sweet-modal-tab",
        {
          active: tab.active,
          disabled: tab.disabled
        }
      ];
    },
    _animateIcon() {
      if (!this.icon) return;
      switch (this.icon) {
        case "success":
          setTimeout(() => {
            this._applyClasses(this.$refs.icon_success, {
              "": ["animate"],
              ".sweet-modal-tip": ["animateSuccessTip"],
              ".sweet-modal-long": ["animateSuccessLong"]
            });
          }, 80);
          break;
        case "warning":
          this._applyClasses(this.$refs.icon_warning, {
            "": ["pulseWarning"],
            ".sweet-modal-body": ["pulseWarningIns"],
            ".sweet-modal-dot": ["pulseWarningIns"]
          });
          break;
        case "error":
          setTimeout(() => {
            this._applyClasses(this.$refs.icon_error, {
              "": ["animateErrorIcon"],
              ".sweet-modal-x-mark": ["animateXMark"]
            });
          }, 80);
          break;
      }
    },
    /**
     * Apply classes from the classMap to $ref or children of $ref, a native
     * DOMElement.
     *
     * ClassMap:
     * {
     *     'selector': [ 'class1', 'class2', ... ]
     * }
     *
     * Empty Selector selects $ref.
     *
     * @param DOMNode $ref     Element to apply classes to or children of that element
     * @param Object  classMap Class Map which elements get which classes (see doc)
     */
    _applyClasses($ref, classMap) {
      for (let cl in classMap) {
        let classes = classMap[cl];
        let $el;
        if (cl == "") {
          $el = $ref;
        } else {
          $el = $ref.querySelector(cl);
        }
        $el.classList.remove(...classes);
        $el.classList.add(...classes);
      }
    }
  }
};
</script>

<style scoped>
/* .loading */
#link {
  color: #666;
  display: block;
  font: 12px "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-align: center;
  text-decoration: none;
}
#link:hover {
  color: #333;
}
#link,
#link:hover {
  -webkit-transition: color 0.5s ease-out;
  -moz-transition: color 0.5s ease-out;
  -ms-transition: color 0.5s ease-out;
  -o-transition: color 0.5s ease-out;
  transition: color 0.5s ease-out;
}
/** BEGIN CSS **/
@keyframes rotate-loading {
  0% {
    transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
  }
}
@-moz-keyframes rotate-loading {
  0% {
    transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
  }
}
@-webkit-keyframes rotate-loading {
  0% {
    transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
  }
}
@-o-keyframes rotate-loading {
  0% {
    transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
  }
}
@keyframes rotate-loading {
  0% {
    transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
  }
}
@-moz-keyframes rotate-loading {
  0% {
    transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
  }
}
@-webkit-keyframes rotate-loading {
  0% {
    transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
  }
}
@-o-keyframes rotate-loading {
  0% {
    transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
  }
}
@keyframes loading-text-opacity {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-moz-keyframes loading-text-opacity {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-webkit-keyframes loading-text-opacity {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-o-keyframes loading-text-opacity {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.loading-container,
.loading {
  height: 88px;
  position: relative;
  width: 88px;
  border-radius: 100%;
}
.loading-container {
  margin: 20px auto;
}
.loading {
  border: 2px solid transparent;
  border-color: transparent #4bb08d transparent #4bb08d;
  -moz-animation: rotate-loading 1.5s linear 0s infinite normal;
  -moz-transform-origin: 50% 50%;
  -o-animation: rotate-loading 1.5s linear 0s infinite normal;
  -o-transform-origin: 50% 50%;
  -webkit-animation: rotate-loading 1.5s linear 0s infinite normal;
  -webkit-transform-origin: 50% 50%;
  animation: rotate-loading 1.5s linear 0s infinite normal;
  transform-origin: 50% 50%;
}
.loading-container:hover .loading {
  border-color: transparent #5cc6a1 transparent #5cc6a1;
}
.loading-container:hover .loading,
.loading-container .loading {
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
}
#loading-text {
  -moz-animation: loading-text-opacity 2s linear 0s infinite normal;
  -o-animation: loading-text-opacity 2s linear 0s infinite normal;
  -webkit-animation: loading-text-opacity 2s linear 0s infinite normal;
  animation: loading-text-opacity 2s linear 0s infinite normal;
  color: #5cc6a1;
  font-family: "Helvetica Neue, " Helvetica ", " "arial";
  font-size: 10px;
  font-weight: bold;
  margin-top: 39px;
  opacity: 0;
  position: absolute;
  text-align: center;
  text-transform: uppercase;
  top: 0;
  width: 88px;
}
</style>

<style lang="scss" type="text/scss">
@import "../styles/mixins";
@import "../styles/colors";
@import "../styles/animations";
@import "../styles/icons";
.sweet-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10001;
  font-size: 14px;
  -webkit-font-smoothing: antialiased; // Theming
  background: rgba(#000, 0.5);
  &.theme-dark {
    $color: color(
      dark-overlay
    ); // background: radial-gradient(ellipse at center, rgba($color, 0.9) 0%, rgba($color, 0.96) 100%);
    background: rgba($color, 0.94);
  }
  // Animation
  opacity: 0;
  transition: opacity 0.3s;
  transform: translate3d(0, 0, 0);
  -webkit-perspective: 500px;
  &.is-visible {
    opacity: 1;
  }
}
.small .sweet-modal {
  width: 430px;
}
.big .sweet-modal {
  width: 750px;
}
.sheet .sweet-modal {
  width: 810px;
  .sweet-content {
    padding: 20px;
    max-height: 100vh !important;
  }
}
.big-550 .sweet-modal {
  width: 650px;
  .sweet-content {
    padding: 0 20px 0px;
    max-height: 100vh !important;
  }
}
.big-650 .sweet-modal {
  width: 850px;
  .sweet-buttons {
    display: none;
  }
}
.big-650 .sweet-content {
  padding: 0 20px 20px !important;
}
.big-880 .sweet-modal {
  width: 880px;
  background: #f7fafa;
  .sweet-title {
    border: 0;
  }
  .sweet-buttons {
    display: none;
  }
}
.big-880 .sweet-content {
  padding: 0 20px 20px !important;
}
.record {
  .sweet-modal {
    width: 80%;
    height: 80vh;
    min-width: 1000px;
  }
  .sweet-content {
    height: calc(100% - 100px) !important;
    /* max-height: calc(100vh - 100px) !important; */
    max-height: 100vh !important;
    padding: 0px !important;
  }
  .sweet-content-content {
    height: 100%;
  }
  .sweet-buttons {
    padding-bottom: 12px !important;
  }
}
.record-clean {
  .sweet-modal {
    width: 65%;
    height: 85vh;
    min-width: 750px;
  }
  .sweet-content {
    height: calc(100% - 100px) !important;
    padding: 0px !important;
  }
  .sweet-content-content {
    height: 100%;
  }
  .sweet-buttons {
    padding-bottom: 12px !important;
  }
}
.padding-0 {
  .sweet-content {
    padding: 0 !important;
  }
}
.body-modal {
  .sweet-modal {
    width: 700px;
  }
  .sweet-content {
    padding: 20px !important;
    max-height: 100vh !important;
  }
}
.infull {
  .sweet-modal {
    width: 100% !important;
    max-width: 100% !important;
    height: 100vh !important;
    max-height: 100vh !important;
  }
  .sweet-content {
    height: calc(100% - 130px) !important;
    /* max-height: 100% !important; */
    max-height: 100vh !important;
    .sweet-content-content {
      height: 100% !important;
    }
  }
}
// 超小
.so-small {
  .sweet-modal {
    width: 330px;
  }
  .sweet-content {
    padding: 20px 20px 10px !important;
  }
}
.sweet-modal {
  @include border-box;
  background: #fff;
  box-shadow: 0px 8px 46px rgba(#000, 0.08), 0px 2px 6px rgba(#000, 0.03);
  position: absolute;
  top: 50%;
  left: 50%; // transform: translate(-50%, -50%); // Done by the animation later
  width: 80%;
  max-width: 90%;
  max-height: 100vh;
  overflow-y: auto;
  border-radius: 2px;
  .sweet-box-actions {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 1;
    .sweet-action-close {
      display: inline-block;
      cursor: pointer;
      color: color(dark);
      text-align: center;
      width: 28px;
      height: 28px;
      line-height: 28px;
      border-radius: 50%;
      svg {
        width: 24px;
        height: 24px;
        vertical-align: middle;
        margin-top: -1px;
        @include svg-path(true) {
          fill: currentColor;
        }
      }
      &:hover {
        background: #edf2f3;
      }
    }
  }
  .sweet-title {
    @include ellipsis;
    height: 44px;
    line-height: 44px;
    background: #f7fafa;
    border-bottom: 1px solid #eaeef1;
    position: relative;
    cursor: move;
    padding: {
      left: 12px;
      right: 12px;
    }
    > h2 {
      @include ellipsis;
      padding: 0;
      font-weight: 600;
      font-size: 13px;
      color: #333333;
      text-align: left;
    }
  }
  ul.sweet-modal-tabs {
    @include ulreset;
    display: flex;
    align-items: center;
    width: calc(100% + 32px);
    height: 100%;
    margin-left: -32px;
    overflow-x: auto;
    li.sweet-modal-tab {
      display: block;
      height: 100%;
      a {
        @include ellipsis;
        display: flex;
        align-items: center;
        padding: {
          left: 20px;
          right: 20px;
        }
        color: color(dark);
        text-decoration: none;
        text-align: center;
        height: 100%;
        span.sweet-modal-tab-title {
          display: block;
        }
        span.sweet-modal-tab-icon {
          display: block;
          line-height: 1;
          svg,
          img {
            width: 16px;
            height: 16px;
            @include svg-path(true) {
              fill: currentColor;
            }
          }
        }
        span.sweet-modal-tab-icon + span.sweet-modal-tab-title {
          line-height: 1;
          margin-top: 8px;
        }
      }
      &:first-child a {
        padding-left: 32px;
      }
      &.active a {
        font-weight: 600;
        color: color(green);
      }
      &.disabled a {
        @include unclickable;
        color: color(light-grey);
      }
    }
  }
  &.has-tabs:not(.has-title) {
    .sweet-title {
      height: 84px;
      line-height: 84px;
    }
  }
  &.has-tabs.has-title {
    ul.sweet-modal-tabs {
      width: 100%;
      height: 48px;
      margin: 0;
      border-bottom: 1px solid color(border);
      li.sweet-modal-tab a {
        margin-top: -4px;
        span.sweet-modal-tab-icon {
          display: inline-block;
          svg,
          img {
            vertical-align: middle;
            margin: {
              top: -2px;
              right: 8px;
            }
          }
        }
        span.sweet-modal-tab-title {
          display: inline-block;
        }
      }
    }
  }
  .sweet-content {
    min-height: 60px;
    // display: flex; // align-items: center;
    padding: {
      left: 20px;
      right: 20px;
      top: 20px;
      bottom: 10px;
    }
    max-height: calc(100vh - 220px);
    overflow: auto;
    line-height: 1.5;
    .sweet-content-content {
      flex-grow: 1;
    }
    .sweet-modal-tab:not(.active) {
      display: none;
    }
    .sweet-modal-icon {
      position: absolute;
      left: 20px;
    }
  }
  .sweet-buttons {
    text-align: center;
    background: #f7fafa;
    border-top: 1px solid #eaeef1;
    padding: {
      left: 20px;
      right: 20px;
      top: 10px;
      bottom: 10px;
    }
  }
  .sweet-content + .sweet-buttons {
  }
  // Special Styles
  &.sweet-alert {
    .sweet-content {
      display: block;
      text-align: center;
      font-size: 16px;
      padding: {
        top: 24px;
        bottom: 24px;
      }
    }
  }
  &.has-tabs.has-icon .sweet-content {
    padding: {
      top: 32px;
      bottom: 32px;
    }
    .sweet-content-content {
      padding-left: 32px;
    }
    .sweet-modal-icon {
      margin-bottom: 0;
    }
  }
  &:not(.has-content) {
    .sweet-modal-icon {
      margin-bottom: 0;
    }
  }
  // Theming
  &.theme-dark {
    $color: color(dark-modal);
    background: $color;
    color: #fff;
    .sweet-box-actions {
      .sweet-action-close {
        color: #fff;
      }
    }
    .sweet-title {
      border-bottom-color: darken($color, 8%);
      box-shadow: 0px 1px 0px lighten($color, 8%);
    }
    ul.sweet-modal-tabs li {
      a {
        color: #fff;
      }
      &.active a {
        color: color(green);
      }
      &.disabled a {
        color: lighten($color, 20%);
      }
    }
    &.has-tabs.has-title {
      ul.sweet-modal-tabs {
        border-bottom-color: darken($color, 8%);
        box-shadow: 0px 1px 0px lighten($color, 8%);
      }
    }
    .sweet-content + .sweet-buttons {
      border-top-color: lighten($color, 8%);
      box-shadow: 0px -1px 0px darken($color, 8%);
    }
  }
  // Animation
  transform: scale(1) translate(calc(-50%), -50%);
  opacity: 0;
  transition: {
    property: transform, opacity;
    duration: 0.3s;
    delay: 0.05s;
    timing-function: cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }
  .sweet-buttons,
  .sweet-content {
    opacity: 0;
    transition: {
      property: transform, opacity;
      duration: 0.3s;
      delay: 0.09s;
      timing-function: cubic-bezier(0.52, 0.02, 0.19, 1.02);
    }
  }
  .sweet-content {
    /* transform: translateY(-8px); */
    min-height: 150px;
  }
  .sweet-buttons {
    /* transform: translateY(16px); */
  }

  &.is-visible {
    transform: translate(-50%, -50%);
    opacity: 1;
    .sweet-buttons,
    .sweet-content {
      transform: none;
      opacity: 1;
    }
  }
  &.bounce {
    animation-name: bounce;
    animation-duration: 0.3s;
    animation-iteration-count: 2;
    animation-direction: alternate;
  }
  // Responsiveness
  @include media(desktop) {
    // Bouncing animation
    @keyframes bounce {
      0% {
        transform: scale(1) translate(-50%, -50%);
      }
      50% {
        transform: scale(1.02) translate(calc(-50% + 8px), -50%);
      }
      100% {
        transform: scale(1) translate(-50%, -50%);
      }
    }
  }
  @include media(mobile) {
    & {
      width: 100%;
      height: 100vh;
      left: 0;
      top: 0;
      transform: scale(1);
      &.is-visible {
        transform: none;
      }
    }
    .sweet-buttons {
      @include border-box;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }
}
// 无背景
.theme-no-bg {
  background: rgba(0, 0, 0, 0) !important;
}
</style>
