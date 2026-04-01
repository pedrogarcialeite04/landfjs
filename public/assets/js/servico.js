(function () {
  'use strict';
  var hasGsap = typeof window.gsap !== 'undefined';
  var hasScrollTrigger = typeof window.ScrollTrigger !== 'undefined';
  var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  var saveData = !!(connection && connection.saveData);
  var lowCpu = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4;
  var lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory > 0 && navigator.deviceMemory <= 4;

  var SERVICOS = {
    'levantamento-topografico': {
      title: 'Levantamento Topográfico',
      lead: 'Medições e representação fiel do terreno para projetos civis, agrícolas e regularização fundiária.',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      detail:
        '<h2>O que é o <span class="highlight">Levantamento Topográfico</span>?</h2>' +
        '<p>O <strong>Levantamento Topográfico Planialtimétrico Cadastral</strong> é um levantamento topográfico realizado por um agrimensor ou topógrafo que busca representar com a <strong>maior precisão possível a porção de terra urbana ou rural em um Modelo Digital do Terreno (MDT)</strong>, ou seja, é a representação plana das 3 dimensões do terreno com todos os elementos encontrados na propriedade como <strong>altura de estradas e seus taludes de corte ou aterro, níveis de açude, desníveis das pastagens, plantações, cercas, currais, matas, brejos entre outros diversos itens</strong> que pode-se encontrar em uma propriedade</strong>. Em um lote calcula-se o desnível de todo o terreno para otimização da construção colocando assim todos os detalhes do terreno que possa interferir na realização do projeto. Realizando o levantamento com <strong>profissional qualificado e habilitado</strong>.</p>' +
        '<p>Este serviço é essencial para qualquer projeto de engenharia, arquitetura ou regularização fundiária, servindo como base técnica para todas as etapas posteriores da obra.</p>' +
        '<h2>Aplicações</h2>' +
        '<ul class="servico-features">' +
          '<li><strong>Projetos civis</strong> — base para fundações, arruamentos e drenagem</li>' +
          '<li><strong>Regularização fundiária</strong> — atendimento às exigências de cartórios e prefeituras</li>' +
          '<li><strong>Loteamentos</strong> — subdivisão precisa de glebas em lotes regulares</li>' +
          '<li><strong>Agricultura</strong> — planejamento de irrigação e sistematização de terrenos</li>' +
          '<li><strong>Licenciamento ambiental</strong> — mapeamento de áreas de preservação</li>' +
        '</ul>',
      photos: [
        './assets/images/levantamento-topografico/1315-1.jpg',
        './assets/images/levantamento-topografico/53422916-1638900588336.jpg',
        './assets/images/levantamento-topografico/53422916-1639079420685.jpg',
        './assets/images/levantamento-topografico/53422916-1641304294357.jpg',
        './assets/images/levantamento-topografico/levantamento-2.jpg',
        './assets/images/levantamento-topografico/levantamento-5.jpg',
        './assets/images/levantamento-topografico/obra-balsamo.jpg',
        './assets/images/levantamento-topografico/terreno.jpg',
        './assets/images/levantamento-topografico/WhatsApp-Image-2022-01-04-at-16.47.55-4.jpg',
        './assets/images/levantamento-topografico/WhatsApp-Image-2022-01-04-at-16.47.55-7.jpg'
      ]
    },
    'nivelamento': {
      title: 'Nivelamento',
      lead: 'Determinação de diferenças de altitude e referência de nível para obras e infraestrutura.',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 14h16M4 18h10M4 10h16M4 6h8" stroke-width="1.5" stroke-linecap="round"/></svg>',
      detail:
        '<h2>O que é o <span class="highlight">Nivelamento</span>?</h2>' +
        '<p>A construção de uma casa é um feito da engenharia e embora seja possível construir em qualquer lugar e sob qualquer tipo de terreno é comum <strong>realizar o nivelamento do lote antes da construção</strong>. As construções antigas não levavam em conta esta etapa e o que percebemos em muitas casas são os famosos porões ou construções que de alguma forma obedece ao desnível do terreno, <strong>mas atualmente esta prática não é muito recomendada</strong>, sendo mais comum nivelar o terreno e assim ter condições de elevar a construção em terreno plano.</p>' +
        '<p><strong>Nivelamento consiste da seguinte forma</strong> toda vez que a gente faz um levantamento da área e vê o divisível do terreno é apresentado ao engenheiro ou arquiteto pra que ele elabore o projeto a partir desse projeto ele <strong>define os nives que o terreno vai ficar acima da guia ou abaixo da guia, um corte ou aterro que sera necessário ser feito ou não</strong>. Após isto ser definido pelo engenheiro civil ou arquiteto, o engenheiro agrimensor vai colocar isto tudo em pratica fazendo a locação da obra, ou seja ele vai e marca onde terá que fazer os cortes para que se nivele o terreno ou os locais onde sera feito o aterro, considerando assim os limites de saia e crista de cada barranco tonando assim possível a construção conforme o projeto elaborado pelos engenheiros e arquitetos, <strong>dando uma nova aparência ao terreno onde sera feito a construção</strong>.</p>' +
        '<h2>Aplicações</h2>' +
        '<ul class="servico-features">' +
          '<li><strong>Controle de obra</strong> — verificação de cotas durante a construção</li>' +
          '<li><strong>Pavimentação</strong> — greides e perfis longitudinais de vias</li>' +
          '<li><strong>Drenagem</strong> — dimensionamento de caimento e escoamento</li>' +
          '<li><strong>Terraplanagem</strong> — controle de corte e aterro</li>' +
          '<li><strong>Fundações</strong> — verificação da cota de apoio de sapatas e estacas</li>' +
        '</ul>',
      photos: [
        './assets/images/nivelamento/ft.jpg',
        './assets/images/nivelamento/lote.jpg',
        './assets/images/nivelamento/terreno-1.jpg',
        './assets/images/nivelamento/terreno5.jpg',
        './assets/images/nivelamento/terreno6.jpg'
        
      ]
    },
    'demarcacao': {
      title: 'Demarcação',
      lead: 'Marcos, confrontações e delimitação de limites com rigor técnico para segurança jurídica.',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke-width="1.5"/><circle cx="12" cy="10" r="3" stroke-width="1.5"/></svg>',
      detail:
        '<h2>O que é a <span class="highlight">Demarcação</span>?</h2>' +
        '<p>A <strong>demarcação de obra</strong> consiste em implantar no terreno ou no local onde será executado a obra todos os detalhes dela. Iniciamos com a parte de <strong>marcação de fundação</strong>, a demarcação nada mais é do que fazer a marcação do local correto respeitando todos os recuos obrigatórios estabelecido por lei e pelo projeto no local onde será construído, então nos fazemos a marcação com os <strong>piquetes de madeira ou de ferro</strong> no lugar onde será perfurado as estacas e tubulões na parte de fundação da construção.</p>' +
        '<p>Esta e a segunda etapa de uma obra quando já passamos pela etapa de <strong>levantamento planialtimétrico</strong>. Após fazermos a marcação da fundação depois fazemos a marcação das paredes existente e da viga baldrame no <strong>gabarito que é elaborado pelo mestre de obra</strong>, deixamos toda essa marcação para que a casa ou construção que esta sendo executada respeite os recuos obrigatórios e o <strong>esquadro perfeito</strong> para que ela não seja construída de forma errada.</p>' +
        '<h2>Aplicações</h2>' +
        '<ul class="servico-features">' +
          '<li><strong>Divisas de imóveis</strong> — materialização de confrontações em campo</li>' +
          '<li><strong>Inventários e partilhas</strong> — delimitação precisa para divisão patrimonial</li>' +
          '<li><strong>Retificação de área</strong> — correção de medidas junto ao cartório</li>' +
          '<li><strong>Usucapião</strong> — levantamento perimetral para processos judiciais</li>' +
          '<li><strong>Loteamentos</strong> — demarcação de quadras e lotes individuais</li>' +
        '</ul>',
      photos: [
        './assets/images/demarcacao/53422916-1639073869563.jpg',
        './assets/images/demarcacao/aparelho.jpg',
        './assets/images/demarcacao/estaca-2.jpg',
        './assets/images/demarcacao/estaca.jpg',
        './assets/images/demarcacao/loca-estaca.jpg',
        './assets/images/demarcacao/terreno-4.jpg',
        './assets/images/demarcacao/WhatsApp-Image-2022-01-04-at-16.47.17.jpg',
        './assets/images/demarcacao/WhatsApp-Image-2022-01-04-at-16.47.55-1-1.jpg',
        './assets/images/demarcacao/WhatsApp-Image-2022-01-04-at-16.47.55-3.jpg',
        './assets/images/demarcacao/WhatsApp-Image-2022-01-04-at-16.47.55-5.jpg'
      ]
    },
    'locacao-de-obra': {
      title: 'Locação de Obra',
      lead: 'Transferência do projeto ao campo — fundações, eixos, cotas e alinhamentos com precisão.',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      detail:
        '<h2>O que é a <span class="highlight">Locação de Obra</span>?</h2>' +
        '<p>A <strong>locação de obra vertical</strong> consiste em demarcar os eixos principais do prédio a cada laje concretada para execução das paredes, tendo assim uma <strong>maior precisão na construção do empreendimento</strong>.</p>' +
        '<p>A FJS Topografia garante que cada eixo, pilar e fundação seja posicionado exatamente conforme o projeto, evitando retrabalho e desperdício de materiais.</p>' +
        '<h2>Aplicações</h2>' +
        '<ul class="servico-features">' +
          '<li><strong>Edificações</strong> — locação de eixos de pilares, sapatas e blocos</li>' +
          '<li><strong>Arruamentos</strong> — alinhamento de meio-fio e greide de ruas</li>' +
          '<li><strong>Galpões industriais</strong> — posicionamento de estrutura metálica</li>' +
          '<li><strong>Piscinas e áreas de lazer</strong> — gabarito preciso no terreno</li>' +
          '<li><strong>Obras de infraestrutura</strong> — pontes, viadutos e galerias</li>' +
        '</ul>',
      photos: ['./assets/images/locacao-de-obra/Laje-predio.jpg',
         './assets/images/locacao-de-obra/predio-3torre.jpg',
          './assets/images/locacao-de-obra/Predio.jpg', 
          './assets/images/locacao-de-obra/img5.jpg',
           './assets/images/locacao-de-obra/WhatsApp-Image-2022-01-04-at-16.47.55.jpeg']
    },
    'calculo-de-volumetria': {
      title: 'Cálculo de Volumetria',
      lead: 'Quantificação precisa de volumes de corte, aterro e estoque com base em levantamento topográfico.',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3v18M8 10h11l-3 4 3 4H8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      detail:
        '<h2>O que é o <span class="highlight">Cálculo de Volumetria</span>?</h2>' +
        '<p>Realizamos <strong>cálculo de volumetria para controle de saída de material, corte, aterro e reaterro</strong> para os mais variados tipos de projetos, como dragagem, estradas, loteamentos, terraplanagem e mineradoras, a partir de dados de levantamento topográfico.</p>' +
        '<p>A partir de dados levantados em campo em conjunto com <strong>cálculos e estudos realizados em escritório</strong>, conseguimos calcular o volume entre duas superfícies.O cálculo de volumetria para terraplenagem consiste na contratação do <strong>Levantamento Topográfico com o Projeto de Terraplenagem</strong>, onde normalmente se indicam as cotas altimétricas e dimensões dos platôs.</p>' +
        '<h2>Aplicações</h2>' +
        '<ul class="servico-features">' +
          '<li><strong>Terraplanagem</strong> — cálculo de corte e aterro para plataformas</li>' +
          '<li><strong>Mineração</strong> — controle de volume extraído e pilhas de estoque</li>' +
          '<li><strong>Aterros sanitários</strong> — monitoramento de capacidade remanescente</li>' +
          '<li><strong>Barragens e reservatórios</strong> — cálculo de volume de contenção</li>' +
          '<li><strong>Orçamento de obras</strong> — estimativa de custo de movimentação de terra</li>' +
        '</ul>',
      photos: ['./assets/images/calculo-de-volumetria/Caixa-agua.jpg',
        './assets/images/calculo-de-volumetria/caixa-contensao.jpg',
        './assets/images/calculo-de-volumetria/calculo-de-volumetria.jpg',
        './assets/images/calculo-de-volumetria/abc.jpg',
        './assets/images/calculo-de-volumetria/represa-e1641389988290.jpg',
        './assets/images/calculo-de-volumetria/volumetria-2.jpg'
        ]
    },
    'georreferenciamento': {
      title: 'Georreferenciamento',
      lead: 'Amarração de imóveis rurais e coordenadas aos sistemas oficiais, com GPS de alta precisão.',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="1.5"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z" stroke-width="1.5"/></svg>',
      detail:
        '<h2>O que é o <span class="highlight">Georreferenciamento</span>?</h2>' +
        '<p><strong>Georreferenciamento </strong> é o processo pelo qual se executa um levantamento topográfico materializando as divisas com <strong> utilização de marcos onde os mesmos recebem coordenadas geográficas</strong> (latitude e longitude) reais e corrigidas com nível de precisão menor que 50cm, processo este que só pode ser executado por <strong>profissionais devidamente qualificados e credenciados pelo INCRA utilizando equipamentos modernos e de grande precisão</strong>.</p>' +
        '<p></p>' +
        '<h2>Aplicações</h2>' +
        '<ul class="servico-features">' +
          '<li><strong>Imóveis rurais</strong> — certificação junto ao INCRA (SIGEF)</li>' +
          '<li><strong>Retificação de matrícula</strong> — atualização de registros junto ao cartório</li>' +
          '<li><strong>CAR</strong> — Cadastro Ambiental Rural</li>' +
          '<li><strong>Licenciamento ambiental</strong> — delimitação de APP e reserva legal</li>' +
          '<li><strong>Financiamentos</strong> — exigência de bancos para crédito rural</li>' +
        '</ul>',
      photos: ['./assets/images/geo/gps34.jpg',
        './assets/images/geo/GPS-1.jpg',
        './assets/images/geo/GPS-4-1.jpg',
        './assets/images/geo/gps-33.jpg',
        './assets/images/geo/GPS-AREA-1.jpg'
      ]
    },
    'analise-por-drone': {
      title: 'Análise de Terreno por Drone',
      lead: 'Mapeamento aéreo e levantamentos em áreas amplas ou de difícil acesso terrestre.',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 19V5M5 12l7-7 7 7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      detail:
        '<h2>O que é a <span class="highlight">Análise por Drone</span>?</h2>' +
        '<p> O <strong>levantamento topográfico planialtimétrico realizado com drone</strong> permite que as áreas e feições levantadas fossem confrontadas com imagens reais do terreno em alta definição. Dando uma <strong>visão diferenciada ao levantamento de grandes áreas como sítios, fazendas, chácaras, loteamentos</strong> entre outros.</p>' +
        '<p></p>' +
        '<h2>Aplicações</h2>' +
        '<ul class="servico-features">' +
          '<li><strong>Mapeamento de grandes áreas</strong> — fazendas, loteamentos, obras lineares</li>' +
          '<li><strong>Acompanhamento de obras</strong> — registro periódico do avanço físico</li>' +
          '<li><strong>Inspeção de taludes</strong> — análise de erosão e estabilidade</li>' +
          '<li><strong>Cálculo de volume</strong> — aterros, pilhas de estoque e cavas</li>' +
          '<li><strong>Planejamento urbano</strong> — modelo 3D para estudos de impacto</li>' +
        '</ul>',
      photos: ['./assets/images/drone/asudb.jpg',
        './assets/images/drone/DJI_0006-1.jpg',
        './assets/images/drone/DJI_0006.jpg',
        './assets/images/drone/DJI_0007.jpg',
        './assets/images/drone/DJI_0011.jpg',
        './assets/images/drone/DJI_0012-1.jpg',
        './assets/images/drone/DJI_0012.jpg',
        './assets/images/drone/DJI_0013.jpg',
        './assets/images/drone/DJI_0014.jpg',
        './assets/images/drone/DJI_0016.jpg'
        ]
    },
    'obra-damha-fit': {
      title: 'Obra Damha Fit',
      lead: 'Acompanhamento técnico da obra com topografia aplicada para garantir precisão, prazos e segurança de execução.',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 20h16M6 20V9l6-4 6 4v11M9 14h6M9 17h6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      detail:
        
        '<ul class="servico-features">' +
          '<li><strong>Serviço de Drone</strong> </li>' +
          '<li><strong>Locação de Estaca</strong>  </li>' +
          '<li><strong>Marcação da Fundação Primária</strong>  </li>' +
          '<li><strong>Marcação de Eixo do Gabarito</strong>  </li>' +
          '<li><strong>Estação Total</strong> </li>' +
        '</ul>',
      photos: [
        './assets/images/nv-trab/img-3.jpeg',
        './assets/images/nv-trab/img-5.jpeg',
        './assets/images/nv-trab/img-6.jpeg',
        './assets/images/nv-trab/img-7.jpeg',
        './assets/images/nv-trab/img-8.jpeg',
        './assets/images/nv-trab/WhatsApp Image 2026-03-28 at 08.42.03.jpeg',
        './assets/images/nv-trab/WhatsApp Image 2026-03-28 at 08.42.04.jpeg',
        './assets/images/nv-trab/WhatsApp Image 2026-03-28 at 08.42.05.jpeg'        
      ]
    },
    'predio-lupema-construtora': {
      title: 'Predio Lupema Construtora',
      lead: 'Acompanhamento topográfico de obra para garantir alinhamento, nível e execução conforme o projeto.',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 20h16M7 20V8l5-3 5 3v12M10 12h4M10 15h4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      detail:
        '<h2></h2>' +
        '<h2>Aplicações</h2>' +
        '<ul class="servico-features">' +
          '<li><strong>Marcação de Fundação</strong> </li>' +
          '<li><strong>Marcação de Terra Planagem</strong> </li>' +
          '<li><strong>Locação de Estacas de Cortina</strong> </li>' +
          '<li><strong>Estacas do Predio</strong> </li>' +
        '</ul>',
      photos: [
        './assets/images/lupema/img1.jpeg',
        './assets/images/lupema/img2.jpeg',
        './assets/images/lupema/img3.jpeg',
        './assets/images/lupema/img4.jpeg',
        './assets/images/lupema/img5.jpeg',
        './assets/images/lupema/img6.jpeg',
        './assets/images/lupema/img7.jpeg'
        
      ]
    }
  };

  var slug = new URLSearchParams(window.location.search).get('s');
  var servico = slug ? SERVICOS[slug] : null;

  if (!servico) {
    window.location.href = './index.html#servicos';
    return;
  }

  document.title = servico.title + ' — FJS Topografia';
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', servico.lead + ' FJS Topografia, São José do Rio Preto.');

  document.getElementById('servico-icon').innerHTML = servico.icon;
  document.getElementById('servico-title').textContent = servico.title;
  document.getElementById('servico-lead').textContent = servico.lead;
  var heroImageEl = document.querySelector('.servico-hero__img');
  var heroVideoEl = document.querySelector('.servico-hero__video');
  function disableHeroVideo() {
    if (!heroVideoEl) return;
    heroVideoEl.pause();
    heroVideoEl.style.display = 'none';
    heroVideoEl.removeAttribute('src');
    while (heroVideoEl.firstChild) {
      heroVideoEl.removeChild(heroVideoEl.firstChild);
    }
    var emptySource = document.createElement('source');
    emptySource.src = '';
    emptySource.type = 'video/mp4';
    heroVideoEl.appendChild(emptySource);
    heroVideoEl.load();
  }
  function enableHeroVideo(src) {
    if (!heroVideoEl || !heroImageEl) return;
    while (heroVideoEl.firstChild) {
      heroVideoEl.removeChild(heroVideoEl.firstChild);
    }
    var source = document.createElement('source');
    source.src = src;
    source.type = 'video/mp4';
    heroVideoEl.appendChild(source);
    heroVideoEl.muted = true;
    heroVideoEl.defaultMuted = true;
    heroVideoEl.loop = true;
    heroVideoEl.autoplay = true;
    heroVideoEl.setAttribute('muted', '');
    heroVideoEl.setAttribute('loop', '');
    heroVideoEl.setAttribute('autoplay', '');
    heroVideoEl.setAttribute('playsinline', '');
    heroVideoEl.style.display = 'block';
    heroImageEl.style.display = 'none';
    heroVideoEl.load();
    var playPromise = heroVideoEl.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(function () { /* sem impacto crítico */ });
    }
    heroVideoEl.addEventListener('error', function () {
      heroVideoEl.style.display = 'none';
      heroImageEl.style.display = '';
    }, { once: true });
  }
  disableHeroVideo();
  if (heroImageEl && slug === 'levantamento-topografico') {
    heroImageEl.src = './assets/images/levantamento-topografico/53422916-1639079420685.jpg';
  }
  if (heroImageEl && slug === 'demarcacao') {
    heroImageEl.src = './assets/images/demarcacao/terreno-4.jpg';
  }
  if (heroImageEl && slug === 'nivelamento') {
    heroImageEl.src = './assets/images/nivelamento/terreno-1.jpg';
  }
  if (heroImageEl && slug === 'locacao-de-obra') {
    heroImageEl.src = './assets/images/locacao-de-obra/Laje-predio.jpg';
  }
  if (heroImageEl && slug === 'calculo-de-volumetria') {
    heroImageEl.src = './assets/images/calculo-de-volumetria/represa-e1641389988290.jpg';
  }
  if (heroImageEl && slug === 'georreferenciamento') {
    heroImageEl.src = './assets/images/geo/GPS-AREA-1.jpg';
    heroImageEl.style.objectPosition = 'center 8%';
  }
  if (heroImageEl && slug === 'analise-por-drone') {
    heroImageEl.src = './assets/images/drone/DJI_0012-1.jpg';
  }
  if (heroImageEl && slug === 'obra-damha-fit') {
    heroImageEl.src = './assets/images/aee.jpg';
    enableHeroVideo('./assets/images/nv-trab/vd.mp4');
  }
  if (heroImageEl && slug === 'predio-lupema-construtora') {
    heroImageEl.src = './assets/images/lupema/img7.jpeg';
  }
  var whatsappBtn = document.querySelector('.servico-cta-card .btn-secondary');
  var whatsappMessages = {
    'levantamento-topografico': 'Ola! Vi o servico de Levantamento Topografico no site e tenho interesse em solicitar um orcamento.',
    'nivelamento': 'Ola! Vi o servico de Nivelamento no site e tenho interesse em solicitar um orcamento.',
    'demarcacao': 'Ola! Vi o servico de Demarcacao no site e tenho interesse em solicitar um orcamento.',
    'locacao-de-obra': 'Ola! Vi o servico de Locacao de Obra no site e tenho interesse em solicitar um orcamento.',
    'calculo-de-volumetria': 'Ola! Vi o servico de Calculo de Volumetria no site e tenho interesse em solicitar um orcamento.',
    'georreferenciamento': 'Ola! Vi o servico de Georreferenciamento no site e tenho interesse em solicitar um orcamento.',
    'analise-por-drone': 'Ola! Vi o servico de Analise de Terreno por Drone no site e tenho interesse em solicitar um orcamento.',
    'obra-damha-fit': 'Ola! Vi o servico prestado para a Damha Fit no site e gostaria de saber mais sobre como funciona esse trabalho.',
    'predio-lupema-construtora': 'Ola! Vi o servico prestado para a Lupema Construtora no site e gostaria de saber mais sobre como funciona esse trabalho.'
  };
  if (whatsappBtn) {
    var baseWhatsapp = 'https://wa.me/5517997712838';
    var message = whatsappMessages[slug] || ('Ola! Tenho interesse no servico de ' + servico.title + ' e gostaria de um orcamento.');
    whatsappBtn.href = baseWhatsapp + '?text=' + encodeURIComponent(message);
    whatsappBtn.classList.add('is-whatsapp-cta');
  }
  var detailEl = document.getElementById('servico-detail');
  detailEl.innerHTML = servico.detail;

  function renderCarousel(photos, opts) {
    opts = opts || {};
    var title = opts.title || 'Fotos do serviço';
    var subtitle = opts.subtitle || ((slug === 'obra-damha-fit' || slug === 'predio-lupema-construtora')
      ? 'Acompanhamento visual profissional da execução da obra.'
      : 'Registros reais de campo e execução.');
    var carouselKey = opts.carouselKey || slug;

    var section = document.createElement('section');
    section.className = 'servico-gallery';
    if (slug === 'obra-damha-fit' || slug === 'predio-lupema-construtora') {
      section.classList.add('servico-gallery--damha-fit');
      section.setAttribute('data-gallery-badge', slug === 'predio-lupema-construtora' ? 'Lupema' : 'Damha Fit');
    }
    section.innerHTML =
      '<div class="servico-gallery__head">' +
        '<h2>' + title + '</h2>' +
        '<p>' + subtitle + '</p>' +
      '</div>';

    if (!photos || !photos.length) {
      if (slug === 'predio-lupema-construtora') {
        section.innerHTML +=
          '<div class="servico-gallery__placeholders" aria-hidden="true">' +
            '<span class="servico-gallery__slot"></span>' +
            '<span class="servico-gallery__slot"></span>' +
            '<span class="servico-gallery__slot"></span>' +
            '<span class="servico-gallery__slot"></span>' +
          '</div>' +
          '<p class="servico-gallery__empty">Espaços reservados para as imagens deste serviço.</p>';
        detailEl.appendChild(section);
        return null;
      }
      section.innerHTML += '<p class="servico-gallery__empty">Em breve adicionaremos fotos deste serviço.</p>';
      detailEl.appendChild(section);
      return null;
    }

    var carouselId = 'carousel-' + carouselKey;
    section.innerHTML +=
      '<div class="servico-carousel" data-carousel-root>' +
        '<button class="servico-carousel__btn servico-carousel__btn--prev" type="button" aria-label="Foto anterior" data-carousel-prev>' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M15 18l-6-6 6-6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '</button>' +
        '<div class="servico-carousel__viewport" id="' + carouselId + '" tabindex="0" aria-label="Galeria de fotos do serviço">' +
          '<div class="servico-carousel__track" data-carousel-track></div>' +
        '</div>' +
        '<button class="servico-carousel__btn servico-carousel__btn--next" type="button" aria-label="Próxima foto" data-carousel-next>' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '</button>' +
      '</div>' +
      '<div class="servico-carousel__meta">' +
        '<p class="servico-carousel__counter" data-carousel-counter>Imagem 1 de ' + photos.length + '</p>' +
        '<div class="servico-carousel__progress" aria-hidden="true">' +
          '<span class="servico-carousel__progress-fill" data-carousel-progress></span>' +
        '</div>' +
      '</div>';
    detailEl.appendChild(section);

    var track = section.querySelector('[data-carousel-track]');
    photos.forEach(function (src, idx) {
      var resolvedSrc = resolveImageUrl(src);
      var figure = document.createElement('figure');
      figure.className = 'servico-carousel__slide';
      figure.innerHTML =
        '<button class="servico-carousel__zoom" type="button" data-carousel-zoom data-src="' + resolvedSrc + '" data-index="' + idx + '" aria-label="Abrir foto ' + (idx + 1) + ' em tela ampliada">' +
          '<img src="' + resolvedSrc + '" alt="Foto ' + (idx + 1) + ' de ' + servico.title + '" loading="lazy" decoding="async">' +
        '</button>';
      track.appendChild(figure);
    });

    return section;
  }

  function bindCarouselInteractions(gallerySection, totalSlides) {
    if (!gallerySection) return;
    var viewport = gallerySection.querySelector('.servico-carousel__viewport');
    var prevBtn = gallerySection.querySelector('[data-carousel-prev]');
    var nextBtn = gallerySection.querySelector('[data-carousel-next]');
    var counterEl = gallerySection.querySelector('[data-carousel-counter]');
    var progressEl = gallerySection.querySelector('[data-carousel-progress]');
    var isAnimating = false;
    var zoomButtons = gallerySection.querySelectorAll('[data-carousel-zoom]');
    function getStep() {
      return Math.round(viewport.clientWidth * 0.9);
    }

    function getMaxScroll() {
      return Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    }

    function updateButtons() {
      var maxScroll = getMaxScroll();
      prevBtn.disabled = viewport.scrollLeft <= 8;
      nextBtn.disabled = viewport.scrollLeft >= maxScroll - 8;
    }

    function getCurrentSlideIndex() {
      var slides = viewport.querySelectorAll('.servico-carousel__slide');
      if (!slides.length) return 0;
      var currentIdx = 0;
      var smallestDelta = Number.POSITIVE_INFINITY;
      var viewLeft = viewport.scrollLeft;
      slides.forEach(function (slide, idx) {
        var delta = Math.abs(slide.offsetLeft - viewLeft);
        if (delta < smallestDelta) {
          smallestDelta = delta;
          currentIdx = idx;
        }
      });
      return currentIdx;
    }

    function updateCounter() {
      if (!counterEl || !progressEl || !totalSlides) return;
      var current = getCurrentSlideIndex() + 1;
      counterEl.textContent = 'Imagem ' + current + ' de ' + totalSlides;
      var percent = (current / totalSlides) * 100;
      progressEl.style.width = percent + '%';
    }

    function animateTo(targetLeft) {
      if (isAnimating) return;
      isAnimating = true;
      if (hasGsap) {
        gsap.to(viewport, {
          scrollLeft: targetLeft,
          duration: 0.65,
          ease: 'power2.inOut',
          overwrite: true,
          onUpdate: updateButtons,
          onComplete: function () {
            isAnimating = false;
            updateButtons();
            updateCounter();
          }
        });
        return;
      }
      viewport.scrollTo({ left: targetLeft, behavior: 'smooth' });
      setTimeout(function () {
        isAnimating = false;
        updateButtons();
        updateCounter();
      }, 300);
    }

    function scrollByStep(direction) {
      var maxScroll = getMaxScroll();
      var nextLeft = viewport.scrollLeft + (direction * getStep());
      nextLeft = Math.max(0, Math.min(maxScroll, nextLeft));
      animateTo(nextLeft);
    }

    prevBtn.addEventListener('click', function () { scrollByStep(-1); });
    nextBtn.addEventListener('click', function () { scrollByStep(1); });
    viewport.addEventListener('scroll', function () {
      updateButtons();
      updateCounter();
    }, { passive: true });
    window.addEventListener('resize', function () {
      updateButtons();
      updateCounter();
    });

    viewport.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollByStep(-1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollByStep(1);
      }
    });

    var touchStartX = 0;
    viewport.addEventListener('touchstart', function (event) {
      touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });
    viewport.addEventListener('touchend', function (event) {
      var deltaX = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(deltaX) > 40) {
        scrollByStep(deltaX > 0 ? -1 : 1);
      }
    }, { passive: true });

    var lightbox = document.createElement('div');
    lightbox.className = 'servico-lightbox';
    lightbox.setAttribute('data-lightbox', '');
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.innerHTML =
      '<div class="servico-lightbox__backdrop" data-lightbox-close></div>' +
      '<div class="servico-lightbox__dialog" role="dialog" aria-modal="true" aria-label="Visualização ampliada da imagem">' +
        '<button class="servico-lightbox__close" type="button" data-lightbox-close aria-label="Fechar imagem ampliada">&times;</button>' +
        '<img class="servico-lightbox__img" alt="" data-lightbox-img>' +
      '</div>';
    document.body.appendChild(lightbox);

    var lightboxImg = lightbox.querySelector('[data-lightbox-img]');

    function openLightbox(src, alt) {
      lightboxImg.src = src;
      lightboxImg.alt = alt || 'Imagem ampliada';
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImg.removeAttribute('src');
      document.body.style.overflow = '';
    }

    zoomButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var img = button.querySelector('img');
        openLightbox(button.getAttribute('data-src'), img ? img.alt : '');
      });
    });

    lightbox.addEventListener('click', function (event) {
      if (event.target.hasAttribute('data-lightbox-close')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
        closeLightbox();
      }
    });

    updateButtons();
    updateCounter();
  }

  var galleryPhotos = (servico.photos || []).slice();
  var gallerySection = renderCarousel(galleryPhotos, { carouselKey: slug + '-base' });
  bindCarouselInteractions(gallerySection, galleryPhotos.length);

  function getApiBase() {
    var custom = (window.__FJS_API_BASE__ || '').replace(/\/+$/, '');
    if (custom) return custom;
    var host = window.location.hostname;
    var port = window.location.port;
    var apiPort = String(window.__FJS_API_PORT__ || '3001');
    var isLocal = host === 'localhost' || host === '127.0.0.1';
    if (isLocal && port && port !== apiPort) {
      return window.location.protocol + '//' + host + ':' + apiPort + '/api';
    }
    return '/api';
  }

  function resolveImageUrl(url) {
    if (!url) return '';
    if (/^https?:\/\//.test(url)) return url;
    var base = getApiBase();
    if (url.startsWith('/api/')) {
      return base.replace(/\/api\/?$/, '') + url;
    }
    return url;
  }

  async function renderAdminAddedPhotos() {
    try {
      var apiBase = getApiBase();
      var res = await fetch(apiBase + '/service-images');
      if (!res.ok) return;
      var json = await res.json();
      var all = json && json.data ? json.data : {};
      var extraPhotos = Array.isArray(all[slug]) ? all[slug] : [];
      if (!extraPhotos.length) return;
      var section = renderCarousel(extraPhotos, {
        title: 'Novas fotos adicionadas',
        subtitle: '',
        carouselKey: slug + '-admin'
      });
      bindCarouselInteractions(section, extraPhotos.length);
    } catch (_err) {
      // Sem impacto no fluxo principal do front-end.
    }
  }
  renderAdminAddedPhotos();

  var outrosContainer = document.getElementById('servico-outros');
  var list = document.createElement('ul');
  list.className = 'servico-outros__list';
  Object.keys(SERVICOS).forEach(function (key) {
    var s = SERVICOS[key];
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = './servico.html?s=' + key;
    a.className = 'servico-outros__link' + (key === slug ? ' is-active' : '');
    a.innerHTML = s.icon.replace(/width="[^"]*"/, '').replace(/height="[^"]*"/, '') + '<span>' + s.title + '</span>';
    li.appendChild(a);
    list.appendChild(li);
  });
  outrosContainer.appendChild(list);

  // ═══════════════════════════════════════════════════
  // GSAP Animations
  // ═══════════════════════════════════════════════════
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches || saveData;
  var lowPowerMode = reduceMotion || lowCpu || lowMemory || window.matchMedia('(hover: none)').matches;

  if (!hasGsap || !hasScrollTrigger) {
    var heroFallback = document.querySelector('.servico-hero');
    if (heroFallback) heroFallback.style.opacity = '1';
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  var heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .to('.servico-hero', { opacity: 1, duration: 0.6, ease: 'power2.inOut' }, 0)
    .from('.servico-hero__img', {
      scale: 1.1,
      filter: 'saturate(0.4) brightness(0.55) contrast(1.1)',
      duration: 2,
      ease: 'power2.out'
    }, 0)
    .from('.servico-breadcrumb', { opacity: 0, x: -16, duration: 0.5 }, 0.3)
    .from('.servico-hero__icon', { opacity: 0, scale: 0.7, duration: 0.5 }, 0.4)
    .from('.servico-hero__title', { opacity: 0, y: 30, duration: 0.8 }, 0.5)
    .from('.servico-hero__lead', { opacity: 0, y: 20, duration: 0.6 }, 0.7)
    .from('.navbar-inner', { opacity: 0, duration: 0.6 }, 0.15);

  if (!lowPowerMode) {
    if (whatsappBtn) {
      gsap.to(whatsappBtn, {
        y: -2,
        boxShadow: '0 0 0 1px rgba(37, 211, 102, 0.35), 0 0 26px rgba(37, 211, 102, 0.35)',
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    function getReusableScrollTrigger(trigger, start) {
      return {
        trigger: trigger,
        start: start,
        toggleActions: 'play none none reverse',
        once: false
      };
    }

    gsap.from('.servico-detail', {
      autoAlpha: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: getReusableScrollTrigger('.servico-body', 'top 80%')
    });

    gsap.from('.servico-sidebar', {
      autoAlpha: 0,
      y: 30,
      duration: 0.7,
      delay: 0.15,
      ease: 'power3.out',
      scrollTrigger: getReusableScrollTrigger('.servico-body', 'top 80%')
    });

    gsap.utils.toArray('.servico-features li').forEach(function (li, i) {
      gsap.from(li, {
        autoAlpha: 0,
        x: -20,
        duration: 0.45,
        delay: i * 0.06,
        ease: 'power2.out',
        scrollTrigger: getReusableScrollTrigger(li, 'top 88%')
      });
    });

    if (gallerySection) {
      gsap.from('.servico-gallery', {
        autoAlpha: 0,
        y: 28,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: getReusableScrollTrigger('.servico-gallery', 'top 88%')
      });
    }
  }

  // Hamburger
  var hamburger = document.querySelector('.hamburger');
  var navMenu = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
    document.querySelectorAll('.nav-item, .nav-cta--mobile').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();
