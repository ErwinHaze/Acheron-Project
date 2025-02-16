const fs = require('fs');
const path = require('path');

const OLD_COMPONENTS_DIR = path.join(__dirname, 'src/components');
const NEW_COMPONENTS_DIR = path.join(__dirname, 'src2/components');
const BACKUP_DIR = path.join(__dirname, 'src/components_backup');

const mappings = [
  { old: 'model-card', new: 'organisms/ModelCard' },
  { old: 'model-demo', new: 'features/model-playground/DemoViewer' },
  { old: 'model-list', new: 'organisms/TrendingModels' },
  { old: 'stats', new: 'organisms/StatsBlock' },
  { old: 'playaround/model-selector', new: 'features/model-playground/Selector' },
  { old: 'playaround-options', new: 'features/model-playground/PresetSystem' },
  { old: 'category-section', new: 'molecules/FilterDropdowns' }
];

function copyDirSync(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  fs.readdirSync(src).forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    if (fs.lstatSync(srcPath).isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

function moveComponent(oldPath, newPath) {
  const src = path.join(OLD_COMPONENTS_DIR, oldPath);
  const dest = path.join(NEW_COMPONENTS_DIR, newPath);
  if (!fs.existsSync(src)) return console.log(`Skipping ${oldPath}, not found.`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.renameSync(src, dest);
  console.log(`Moved ${oldPath} -> ${newPath}`);
}

function updateImports(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      updateImports(filePath);
    } else if (file.endsWith('.tsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      mappings.forEach(({ old, new: newPath }) => {
        const oldImport = new RegExp(`['"]../components/${old}`, 'g');
        content = content.replace(oldImport, `"../components/${newPath}`);
      });
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated imports in ${filePath}`);
    }
  });
}

// Backup old components
console.log('Backing up old components...');
copyDirSync(OLD_COMPONENTS_DIR, BACKUP_DIR);

// Move components
console.log('Moving components...');
mappings.forEach(({ old, new: newPath }) => moveComponent(old, newPath));

// Update import paths
console.log('Updating import paths...');
updateImports(path.join(__dirname, 'src'));

console.log('Migration complete! 🎉');
