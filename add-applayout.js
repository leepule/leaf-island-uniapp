const fs = require('fs');
const path = require('path');

const files = [
  'src/pages/demo/demo.vue',
  'src/pages/demos/button.vue',
  'src/pages/demos/card.vue',
  'src/pages/demos/checkbox.vue',
  'src/pages/demos/codeblock.vue',
  'src/pages/demos/collapse.vue',
  'src/pages/demos/cursor.vue',
  'src/pages/demos/divider.vue',
  'src/pages/demos/footer.vue',
  'src/pages/demos/icon.vue',
  'src/pages/demos/input.vue',
  'src/pages/demos/loading.vue',
  'src/pages/demos/modal.vue',
  'src/pages/demos/phone.vue',
  'src/pages/demos/radio.vue',
  'src/pages/demos/select.vue',
  'src/pages/demos/switch.vue',
  'src/pages/demos/table.vue',
  'src/pages/demos/tabs.vue',
  'src/pages/demos/time.vue',
  'src/pages/demos/title.vue',
  'src/pages/demos/tooltip.vue',
  'src/pages/demos/typewriter.vue',
];

const base = 'F:/animal-island-uniapp/animal-island-uniapp';

for (const f of files) {
  const fp = path.join(base, f);
  let content = fs.readFileSync(fp, 'utf-8');
  
  // Check if already has AppLayout (should not after previous script)
  if (content.includes('<AppLayout>')) {
    console.log('SKIP (already has AppLayout):', f);
    continue;
  }
  
  // Find the <template> tag and wrap content with AppLayout conditionally
  // Pattern: <template>\n  <view class="demo-page"> -> <template>\n  <!-- #ifdef H5 -->\n  <view class="demo-page">
  // And before closing </template>: add <!-- #endif --> and <!-- #ifndef H5 --> <AppLayout>... </AppLayout> <!-- #endif -->
  
  // Simple approach: add AppLayout wrapper for non-H5 only
  // Since H5 App.vue already wraps with AppLayout, we only need AppLayout for non-H5
  
  // Find the first <view class="demo-page" or <view class="home"> after <template>
  const templateMatch = content.match(/(<template>\n)(  <view)/);
  if (!templateMatch) {
    console.log('SKIP (no match):', f);
    continue;
  }
  
  // Insert conditional comments
  content = content.replace(
    /<template>\n/,
    '<template>\n  <!-- #ifndef H5 -->\n  <AppLayout>\n  <!-- #endif -->\n'
  );
  
  content = content.replace(
    /\n<\/template>/,
    '\n  <!-- #ifndef H5 -->\n  </AppLayout>\n  <!-- #endif -->\n</template>'
  );
  
  fs.writeFileSync(fp, content);
  console.log('Processed:', f);
}

console.log('Done!');
