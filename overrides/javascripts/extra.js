/* ==========================================
   Zensical-Wcowin 自定义脚本
   ========================================== */

// 即时导航兼容
document$.subscribe(function() {
  console.log('Zensical-Wcowin loaded');

  document.querySelectorAll('.md-code__button[data-md-type="select"]').forEach(b => b.title = "选择行");
  
  // 在这里添加你的自定义 JavaScript
});
