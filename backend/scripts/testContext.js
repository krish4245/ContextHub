const path = require('path');
const { generateContext } = require('../services/contextGenerator');

async function run() {
  const projectRoot = path.resolve(__dirname, '..');
  try {
    const result = await generateContext(projectRoot);
    const markdown = typeof result === 'string' ? result : result.markdown;
    const prompts = result.prompts || [];
    // print a truncated preview so terminal output stays readable
    console.log(markdown.slice(0, 20000));
    console.log('\n---\nSuggested prompts:');
    console.log(prompts.join('\n- '));
    console.log('\n[Output truncated]');
  } catch (err) {
    console.error('ERROR generating context:', err.message);
    console.error(err);
  }
}

run();
