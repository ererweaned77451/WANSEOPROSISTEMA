/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area 
} from 'recharts';
import { 
  Download, ExternalLink, TrendingUp, TrendingDown, 
  Target, Link2, Globe, ShieldCheck, Zap, Star, Award, ArrowUpRight, Search, Rocket
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utils ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Data ---
const TIER_1_LINKS = [
  { title: "Tecnologia e Lucratividade", url: "https://www.dm.com.br/brasil/como-a-tecnologia-pode-transformar-a-lucratividade-de-uma-distribuidora-de-bebidas/" },
  { title: "Engenharia da Eficiência", url: "https://mercadohoje.uai.com.br/2026/03/03/a-engenharia-da-eficiencia-por-que-distribuidoras-de-bebidas-de-alto-padrao-nao-sobrevivem-sem-automacao/" },
  { title: "O Fim da Era do Papel", url: "https://revistacentral.com.br/o-fim-da-era-do-papel-por-que-distribuidoras-de-bebidas-estao-migrando-para-o-digital/" },
  { title: "Guia para Escalar Distribuidora", url: "https://itamarajunoticias.com.br/editorial/cotidiano/o-guia-definitivo-para-escalar-sua-distribuidora-de-bebidas-eficiencia-e-lucratividade/#google_vignette" },
  { title: "Sistema de Gestão Lojas", url: "https://tonafama.ig.com.br/o-guia-definitivo-como-um-sistema-de-gestao-transforma-sua-loja-de-celulares-e-assistencia-tecnica/" }
];

const TIER_2_LINKS = [
  { 
    title: "5 Recursos Indispensáveis", 
    url: "https://www.hardmob.com.br/entries/1517-5-Recursos-indispensaveis-em-um-software-para-distribuidoras-de-bebidas",
    target: "mercadohoje.uai.com.br"
  }
];

const KEYWORD_DATA = [
  { date: 'Jan', pos: 35 }, { date: 'Fev', pos: 22 }, { date: 'Mar', pos: 11 }, { date: 'Hoje', pos: 8.5 }
];

const SITE_DATA = [
  { date: 'Jan', pos: 15 }, { date: 'Fev', pos: 8 }, { date: 'Mar', pos: 2.5 }
];

// --- Components ---
const StatCard = ({ title, value, sub, icon: Icon, trend, color }: any) => (
  <div className="bg-white p-5 rounded-2xl border border-[#ffedd5]">
    <div className="flex justify-between mb-3">
      <div className={cn("p-2 rounded-lg text-white", color)}><Icon size={20} /></div>
      {trend && (
        <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[#ecfdf5] text-[#059669] flex items-center">
          <TrendingUp size={10} className="mr-1" /> {trend}%
        </span>
      )}
    </div>
    <p className="text-[#64748b] text-xs font-bold uppercase tracking-wider">{title}</p>
    <div className="flex items-baseline gap-2 mt-1">
      <span className="text-xl font-black text-[#0f172a]">{value}</span>
      <span className="text-[10px] text-[#94a3b8] font-medium">{sub}</span>
    </div>
  </div>
);

export default function App() {
  const reportRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const pdf = new jsPDF('p', 'pt', 'a4');
      const orange = [234, 88, 12]; // #ea580c
      const slate = [15, 23, 42]; // #0f172a
      const lightOrange = [255, 247, 237]; // #fff7ed

      // --- Header ---
      pdf.setFillColor(slate[0], slate[1], slate[2]);
      pdf.rect(0, 0, 595, 120, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text('WAN SEO PRO', 40, 60);
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text('RELATÓRIO DE PERFORMANCE E AUTORIDADE SEO', 40, 80);
      
      pdf.setFillColor(orange[0], orange[1], orange[2]);
      pdf.rect(450, 40, 100, 40, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(10);
      pdf.text('DATA', 460, 55);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text(new Date().toLocaleDateString('pt-BR'), 460, 72);

      // --- Section: Evolução de Rankings ---
      pdf.setTextColor(slate[0], slate[1], slate[2]);
      pdf.setFontSize(16);
      pdf.text('1. Evolução de Rankings (De -> Para)', 40, 160);
      
      // Table Header
      pdf.setFillColor(245, 245, 245);
      pdf.rect(40, 180, 515, 25, 'F');
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text('MÉTRICA', 50, 197);
      pdf.text('INÍCIO (JAN)', 200, 197);
      pdf.text('ATUAL (MAR)', 350, 197);
      pdf.text('MELHORIA', 480, 197);

      // Row 1: Keyword
      pdf.setFont('helvetica', 'normal');
      pdf.text('Posicionamento Keyword', 50, 220);
      pdf.text('Pos 35', 200, 220);
      pdf.setTextColor(orange[0], orange[1], orange[2]);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Pos 8.5', 350, 220);
      pdf.setTextColor(0, 150, 0);
      pdf.text('+74%', 480, 220);
      pdf.line(40, 230, 555, 230);

      // Row 2: Site Visibility
      pdf.setTextColor(slate[0], slate[1], slate[2]);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Visibilidade do Site', 50, 250);
      pdf.text('Pos 15', 200, 250);
      pdf.setTextColor(orange[0], orange[1], orange[2]);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Pos 2.5', 350, 250);
      pdf.setTextColor(0, 150, 0);
      pdf.text('+80%', 480, 250);
      pdf.line(40, 260, 555, 260);

      // --- Section: Backlinks Tier 1 ---
      pdf.setTextColor(slate[0], slate[1], slate[2]);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('2. Estratégia de Backlinks Tier 1', 40, 300);
      
      pdf.setFontSize(9);
      let yPos = 325;
      TIER_1_LINKS.forEach((link, index) => {
        pdf.setFillColor(lightOrange[0], lightOrange[1], lightOrange[2]);
        pdf.rect(40, yPos - 15, 515, 35, 'F');
        
        pdf.setTextColor(slate[0], slate[1], slate[2]);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${index + 1}. ${link.title}`, 50, yPos);
        
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(orange[0], orange[1], orange[2]);
        const shortUrl = link.url.length > 65 ? link.url.substring(0, 62) + '...' : link.url;
        pdf.text(shortUrl, 50, yPos + 12);
        
        // Add clickable link
        pdf.link(50, yPos + 2, 450, 12, { url: link.url });
        
        yPos += 45;
      });

      // --- Section: Estratégia Ninja Tier 2 ---
      pdf.setTextColor(slate[0], slate[1], slate[2]);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('3. Estratégia Ninja Tier 2', 40, 560);
      
      pdf.setFillColor(slate[0], slate[1], slate[2]);
      pdf.rect(40, 580, 515, 80, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(11);
      pdf.text('Link Tier 2 Ativo:', 55, 605);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(TIER_2_LINKS[0].title, 55, 625);
      
      pdf.setTextColor(orange[0], orange[1], orange[2]);
      const shortTier2 = TIER_2_LINKS[0].url.length > 70 ? TIER_2_LINKS[0].url.substring(0, 67) + '...' : TIER_2_LINKS[0].url;
      pdf.text(shortTier2, 55, 640);
      pdf.link(55, 630, 450, 15, { url: TIER_2_LINKS[0].url });

      // --- Footer ---
      pdf.setTextColor(150, 150, 150);
      pdf.setFontSize(10);
      pdf.text('WAN SEO PRO - Especialista em Autoridade e Link Building', 40, 780);
      pdf.text('Relatório Gerado Automaticamente - Rocket Mode ON', 40, 795);
      pdf.line(40, 770, 555, 770);

      pdf.save('RELATORIO-WAN-SEO-PRO.pdf');
    } catch (err) {
      console.error("PDF Generation Error:", err);
      alert("Erro ao gerar PDF profissional. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff7ed] font-sans text-[#0f172a] pb-12">
      <nav className="sticky top-0 z-50 bg-white border-b border-[#ffedd5] px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-[#ea580c] p-1.5 rounded-lg" style={{ boxShadow: '0 10px 15px -3px rgba(234, 88, 12, 0.3)' }}><Zap size={18} className="text-white fill-current" /></div>
          <span className="font-black text-xl tracking-tighter">WAN <span className="text-[#ea580c]">SEO PRO</span></span>
        </div>
        <button onClick={handleDownload} disabled={loading} className="bg-[#ea580c] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#c2410c] transition-all flex items-center gap-2 disabled:opacity-50" style={{ boxShadow: '0 10px 15px -3px rgba(234, 88, 12, 0.3)' }}>
          <Download size={14} /> {loading ? 'Gerando...' : 'Baixar PDF'}
        </button>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10" ref={reportRef}>
        <header className="bg-white p-8 rounded-[2.5rem] border border-[#ffedd5] mb-10 flex flex-col md:flex-row items-center gap-8" style={{ boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)' }}>
          <div className="relative">
            <div className="w-28 h-28 rounded-full border-4 border-[#ffedd5] flex items-center justify-center bg-[#0f172a]">
              <Rocket size={48} className="text-[#f97316] animate-bounce" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#ea580c] p-2 rounded-full border-2 border-white"><Star size={12} className="text-white fill-current" /></div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="bg-[#ffedd5] text-[#c2410c] text-[10px] font-black px-2 py-0.5 rounded border border-[#fed7aa]">ROCKET SPEED</span>
              <span className="bg-[#0f172a] text-white text-[10px] font-black px-2 py-0.5 rounded">SEO MASTER</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Relatório <span className="text-[#ea580c]">WAN SEO PRO</span></h1>
            <p className="text-[#64748b] font-medium text-sm">Estratégia avançada de link building e autoridade para o nicho de bebidas.</p>
          </div>
          <div className="bg-[#fff7ed] px-5 py-3 rounded-2xl border border-[#ffedd5] text-center">
            <p className="text-[10px] font-black text-[#ea580c] uppercase tracking-widest">Atualizado</p>
            <p className="text-lg font-black">{new Date().toLocaleDateString('pt-BR')}</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Keyword" value="Pos 8-9" sub="vs 35" icon={Search} trend={74} color="bg-[#ea580c]" />
          <StatCard title="Site Ranking" value="Pos 1-3" sub="vs 15" icon={Globe} trend={80} color="bg-[#f59e0b]" />
          <StatCard title="Links Tier 1" value="05" sub="Indexados" icon={ShieldCheck} color="bg-[#0f172a]" />
          <StatCard title="Tier 2 Boost" value="01" sub="Ativo" icon={Link2} color="bg-[#f97316]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="bg-white p-6 rounded-[2rem] border border-[#ffedd5]" style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)' }}>
            <h3 className="font-black text-lg mb-6 flex items-center gap-2"><Target className="text-[#ea580c]" size={20} /> Keyword Progress</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <AreaChart data={KEYWORD_DATA}>
                  <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ea580c" stopOpacity={0.2}/><stop offset="95%" stopColor="#ea580c" stopOpacity={0}/></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fff7ed" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                  <YAxis reversed domain={[0, 40]} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="pos" stroke="#ea580c" strokeWidth={3} fill="url(#g1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-[#ffedd5]" style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)' }}>
            <h3 className="font-black text-lg mb-6 flex items-center gap-2"><TrendingUp className="text-[#f59e0b]" size={20} /> Site Visibility</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <LineChart data={SITE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fff7ed" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                  <YAxis reversed domain={[0, 20]} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                  <Line type="monotone" dataKey="pos" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#f59e0b' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-[#ffedd5] overflow-hidden mb-10" style={{ boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)' }}>
          <div className="p-6 bg-[#fff7ed] border-b border-[#ffedd5] flex justify-between items-center">
            <h3 className="font-black text-xl flex items-center gap-2"><ShieldCheck className="text-[#ea580c]" /> Backlinks Tier 1</h3>
            <Award size={20} className="text-[#ea580c]" />
          </div>
          <div className="divide-y divide-[#fff7ed]">
            {TIER_1_LINKS.map((l, i) => (
              <a key={i} href={l.url} target="_blank" rel="noreferrer" className="p-5 flex items-center justify-between hover:bg-[#fff7ed] transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-xl bg-[#0f172a] text-white flex items-center justify-center text-xs font-black">{i+1}</div>
                  <div>
                    <h4 className="font-bold text-sm group-hover:text-[#ea580c] transition-colors">{l.title}</h4>
                    <p className="text-[10px] text-[#94a3b8] truncate max-w-[200px] md:max-w-md">{l.url}</p>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-[#cbd5e1] group-hover:text-[#ea580c]" />
              </a>
            ))}
          </div>
        </div>

        <div className="bg-[#0f172a] rounded-[2.5rem] p-8 text-white relative overflow-hidden" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#ea580c] p-2 rounded-xl"><Link2 size={20} /></div>
                <h3 className="font-black text-xl">Estratégia Ninja Tier 2</h3>
              </div>
              <p className="text-[#94a3b8] text-sm leading-relaxed mb-6">Fortalecemos os links Tier 1 com uma camada secundária de autoridade, criando um efeito cascata de relevância.</p>
              <a href={TIER_2_LINKS[0].url} target="_blank" rel="noreferrer" className="block p-5 bg-[#ffffff10] border border-[#ffffff20] rounded-2xl hover:bg-[#ffffff20] transition-all">
                <span className="text-[10px] font-black text-[#fb923c] tracking-widest uppercase">Origem Tier 2</span>
                <h4 className="font-bold mt-1">{TIER_2_LINKS[0].title}</h4>
                <div className="flex items-center justify-between mt-2 text-[10px] text-[#64748b]">
                  <span>{TIER_2_LINKS[0].url.substring(0, 40)}...</span>
                  <ExternalLink size={12} />
                </div>
              </a>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="text-[10px] font-black text-[#fb923c] uppercase tracking-[0.3em]">Flow de Autoridade</div>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#ffffff30] to-transparent" />
              <div className="w-full p-5 bg-[#ea580c20] border border-[#ea580c40] rounded-2xl">
                <span className="text-[10px] font-black text-[#fb923c] tracking-widest uppercase">Alvo Tier 1</span>
                <h4 className="font-bold mt-1">Engenharia da Eficiência...</h4>
                <p className="text-[10px] text-[#fdba74] mt-1">mercadohoje.uai.com.br/...</p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ea580c15] -mr-32 -mt-32 rounded-full" />
        </div>

        <footer className="mt-16 pt-10 border-t border-[#ffedd5] flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#0f172a] rounded-full border-2 border-white flex items-center justify-center" style={{ boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
              <Rocket size={24} className="text-[#f97316]" />
            </div>
            <div>
              <p className="text-[10px] font-black text-[#ea580c] uppercase tracking-widest">Especialista SEO</p>
              <p className="text-xl font-black">WAN <span className="text-[#ea580c]">SEO PRO</span></p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <div className="flex gap-1 justify-center md:justify-end mb-2">
              {[1,2,3,4,5].map(i => <Star key={i} size={12} className="text-[#f59e0b] fill-current" />)}
            </div>
            <p className="text-xs font-bold text-[#94a3b8] uppercase tracking-widest">© {new Date().getFullYear()} WAN SEO PRO • ROCKET MODE ON</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
