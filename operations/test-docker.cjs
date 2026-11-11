// Validate the built images only against the disposable local sandbox database.
const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process'),{randomBytes}=require('node:crypto');
const root=path.resolve(__dirname,'..'),work=path.join(root,'.local/payments-sandbox');
const state=JSON.parse(fs.readFileSync(path.join(work,'state.private.json'),'utf8'));
const db=new URL(state.databaseUrl);
if(db.hostname!=='127.0.0.1'||db.pathname!=='/observatorio_local_sandbox'||!/^obs-national-local-\d+$/.test(state.container))throw Error('Se requiere el sandbox descartable');
const version=require('../package.json').version,secret=randomBytes(32).toString('hex');
const names=[],file=path.join(work,'docker-smoke.private.env');
function run(args){const r=spawnSync('docker',args,{cwd:root,encoding:'utf8',windowsHide:true});if(r.status!==0)throw Error('Falló docker '+args[0]);return r.stdout.trim();}
db.hostname='127.0.0.1';db.port='5432';
fs.writeFileSync(file,[`DATABASE_URL=${db}`,`ADMIN_SECRET=${secret}`,`JWT_ACCESS_SECRET=${secret}`,'OBS_LOCAL_SANDBOX=true','MP_SITE_URL=https://127.0.0.1:9','BILLING_ENABLED=false','AUTH_ENABLED=true','ADMIN_BYPASS_LOCAL=false','AUTH_COOKIE_SECURE=false','ADMIN_PASSWORD=synthetic-image-only','SUPABASE_URL=http://127.0.0.1:9','SUPABASE_SERVICE_KEY=synthetic-image-only','INTERNAL_API_URL=http://127.0.0.1:4790/api'].join('\n'),{mode:0o600});
(async()=>{try{
 for(const [service,port,url] of [['backend',4790,'/api/live'],['frontend',4791,'/ingresar']]){
  const image=`observatorio-de-leyes-${service}:${version}`;
  const info=JSON.parse(run(['image','inspect',image]))[0];
  if(info.Config.Labels['org.opencontainers.image.version']!==version)throw Error('Etiqueta de versión incorrecta');
  const name=`obs-national-smoke-${service}-${process.pid}`;names.push(name);
  run(['run','-d','--name',name,'--network','container:'+state.container,'--env-file',file,'-e','PORT='+port,'-e','HOST=127.0.0.1','-e','HOSTNAME=127.0.0.1',image]);
  let ready=false;
  for(let i=0;i<60;i++){
   const check=spawnSync('docker',['exec',name,'node','-e',`fetch('http://127.0.0.1:${port}${url}').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))`],{stdio:'ignore',windowsHide:true});
   if(check.status===0){ready=true;break;} await new Promise(r=>setTimeout(r,1000));
  }
  if(!ready)throw Error('La imagen no respondió: '+service);
  console.log(service+' '+version+': etiqueta y arranque HTTP correctos');
 }
}finally{for(const name of names)spawnSync('docker',['rm','--force',name],{stdio:'ignore',windowsHide:true});fs.rmSync(file,{force:true});}})().catch(e=>{console.error(e.message);process.exitCode=1;});
