#!/usr/bin/env node
// Adaptation site-specific de l'agent site-design-review de Bloc-notes numériques.
import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const routes = ['/', '/galerie.html', '/caricature-acteurs.html', '/caricature-chanteurs.html', '/caricature-ecrivains.html', '/caricature-sportifs.html', '/caricature-personnalites.html', '/caricature-artiste.html', '/portrait-dessine.html', '/dessin-humoristique.html', '/commandes.html', '/boutique.html', '/expositions.html', '/a-propos.html', '/contact.html', '/rejoindre-caricart.html', '/mentions-legales.html'];
const viewports = [{name:'desktop',width:1440,height:1000},{name:'tablette',width:768,height:1024},{name:'mobile',width:390,height:844}];
const out = path.resolve(process.env.VISUAL_OUTPUT || '.artifacts/design-review/caricart');
await mkdir(out,{recursive:true});
let server, browser;
const base = (process.env.VISUAL_BASE_URL || 'http://127.0.0.1:4173').replace(/\/$/,'');
if (!process.env.VISUAL_BASE_URL) {
  server = spawn('python3',['-m','http.server','4173','--bind','127.0.0.1'],{stdio:'ignore'});
  let ready=false;
  for(let i=0;i<50;i++){ try { if((await fetch(base)).ok){ready=true;break;} } catch {} await new Promise(r=>setTimeout(r,100)); }
  if(!ready){server.kill();throw new Error('Serveur local indisponible');}
}
const report={createdAt:new Date().toISOString(),base,routes,viewports,pages:[]};
try {
 const executablePath=process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
 browser=await chromium.launch({headless:true,...(executablePath ? {executablePath,args:['--no-sandbox','--disable-dev-shm-usage']} : {})});
 for(const v of viewports){
  const context=await browser.newContext({viewport:{width:v.width,height:v.height},reducedMotion:'reduce'});
  for(const route of routes){
   const page=await context.newPage(), errors=[], failures=[];
   page.on('pageerror',e=>errors.push(e.message));
   page.on('console',m=>{if(m.type()==='error') errors.push(m.text());});
   page.on('response',r=>{if(r.status()>=400) failures.push({url:r.url(),status:r.status()});});
   const response=await page.goto(base+route,{waitUntil:'domcontentloaded',timeout:45000});
   await page.evaluate(async()=>{await document.fonts.ready; for(const img of document.images){img.loading='eager';} await Promise.all([...document.images].map(img=>img.decode().catch(()=>{})));});
   const metrics=await page.evaluate(()=>({title:document.title,h1:[...document.querySelectorAll('h1')].map(x=>x.textContent.trim()),overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.currentSrc),images:document.images.length}));
   const slug=route==='/'?'accueil':route.slice(1).replace(/\.html$/,'');
   const dir=path.join(out,v.name);await mkdir(dir,{recursive:true});
   const shot=path.join(dir,slug+'.png');await page.screenshot({path:shot,fullPage:true,animations:'disabled'});
   const interactions={};
   if(v.name==='mobile' && (route==='/' || route==='/rejoindre-caricart.html')){
    const burger=page.locator('.burger');interactions.menuPresent=await burger.count()>0;
    if(interactions.menuPresent){await burger.click();interactions.menuVisible=await page.locator('.main-nav').isVisible();await page.screenshot({path:path.join(dir,slug+'--menu.png'),animations:'disabled'});}
   }
   if(route==='/galerie.html'){
    const filters=page.locator('[data-filters] button');interactions.filterCount=await filters.count();
    if(interactions.filterCount>1){const before=await page.locator('[data-gallery] .work-card').count();await filters.nth(1).click();interactions.filter={before,after:await page.locator('[data-gallery] .work-card').count(),active:await filters.nth(1).evaluate(e=>e.classList.contains('active'))};}
    const work=page.locator('[data-gallery] .work-card').first();if(await work.count()){await work.click();interactions.lightbox=await page.locator('.lightbox').isVisible();}
   }
   report.pages.push({route,viewport:v.name,status:response?.status(),screenshot:path.relative(out,shot),errors,failures,interactions,...metrics});
   await page.close();
  }
  await context.close();
 }
} finally {if(browser) await browser.close();if(server) server.kill();await writeFile(path.join(out,'report.json'),JSON.stringify(report,null,2)+'\n');}
console.log(`${report.pages.length} pages capturées dans ${out} ; inspection visuelle requise.`);
