import Vue from 'vue';

// 表格滚动加载
Vue.directive('loadMore', {
  bind(el, binding) {
    const selectWrap = el.querySelector('.el-table__body-wrapper');
    selectWrap.addEventListener('scroll', function() {
      let sign = 100;
      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight;
      if (scrollDistance <= sign) {
        binding.value()
      }
    })
  }
});

//表格滚动条定位
Vue.directive('reScroll', {
  bind(el, binding) {
    const selectWrap = el.querySelector('.el-table__body-wrapper');
    selectWrap.addEventListener('scroll', function() {
      binding.value(selectWrap.scrollTop, selectWrap.scrollLeft)
    })
  },
  update(el, binding,) {
    const selectWrap = el.querySelector('.el-table__body-wrapper');
    selectWrap.scrollTop = binding.value().scrollTop;
    selectWrap.scrollLeft = binding.value().scrollLeft;
  },
});
