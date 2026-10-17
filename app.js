// MyOS 15 Puzzle
const root = document.getElementById('PuzzleApp');
if (root) {
  const boardEl=document.getElementById('pz-board'); let tiles=[], moves=0, t0=0, timer=null, running=false;
  function solvedArr(){ return [...Array(15)].map((_,i)=>i+1).concat(0); }
  function draw(){
    boardEl.innerHTML='';
    tiles.forEach((v,i)=>{ const d=document.createElement('div'); d.className='pz-tile'+(v===0?' empty':''); d.textContent=v||''; if(v) d.onclick=()=>move(i); boardEl.appendChild(d); });
  }
  function move(i){ const e=tiles.indexOf(0); const [ir,ic]=[Math.floor(i/4),i%4],[er,ec]=[Math.floor(e/4),e%4];
    if(Math.abs(ir-er)+Math.abs(ic-ec)!==1) return;
    tiles[e]=tiles[i]; tiles[i]=0; moves++; document.getElementById('pz-mv').textContent=moves;
    if(!running){ running=true; t0=Date.now(); timer=setInterval(tick,1000); }
    draw(); if(tiles.join()===solvedArr().join()){ running=false; clearInterval(timer); document.getElementById('pz-msg').textContent='Solved in '+moves+' moves!'; }
  }
  function tick(){ const s=Math.floor((Date.now()-t0)/1000); document.getElementById('pz-time').textContent=Math.floor(s/60)+':'+String(s%60).padStart(2,'0'); }
  function shuffle(){
    tiles=solvedArr();
    // make random legal moves so it's always solvable
    let e=15; for(let n=0;n<300;n++){ const er=Math.floor(e/4),ec=e%4,opt=[];
      if(er>0)opt.push(e-4); if(er<3)opt.push(e+4); if(ec>0)opt.push(e-1); if(ec<3)opt.push(e+1);
      const t=opt[Math.floor(Math.random()*opt.length)]; tiles[e]=tiles[t]; tiles[t]=0; e=t; }
    moves=0; running=false; clearInterval(timer); document.getElementById('pz-mv').textContent=0; document.getElementById('pz-time').textContent='0:00'; document.getElementById('pz-msg').textContent=''; draw();
  }
  document.getElementById('pz-shuf').onclick=shuffle;
  shuffle();
}
