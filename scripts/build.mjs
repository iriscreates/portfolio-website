process.env.NODE_ENV = 'production';
const { createBuilder } = await import('vite');
const { runPrerender } = await import('vinext/internal/build/run-prerender');
// Let Node finish naturally instead of the CLI's forced exit on Windows.
await (await createBuilder()).buildApp();
await runPrerender({root:process.cwd()});
const { readFile, access } = await import('node:fs/promises');
for (const [path,text] of [['index.html','Iris Yu'],['onedeck/index.html','Design goals']]) {
 const html=await readFile('dist/client/'+path,'utf8');
 if(!html.includes(text)||html.includes('Internal Server Error'))throw new Error('Static export failed: '+path);
 for(const match of html.matchAll(/(?:src|href)="(\/[^"?#]+)[^"]*"/g)){const asset=match[1];if(asset.endsWith('/'))continue;await access('dist/client'+asset);}
}
await access('dist/client/.nojekyll');
if((await readFile('dist/client/CNAME','utf8')).trim()!=='irisyu.design')throw new Error('Invalid domain');
console.log('Both portfolio pages and local assets verified in dist/client.');
